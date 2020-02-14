import { SnakeSection } from '../Types/BaseTypes';
import container from "../dependents";
import Material, { snakeTheme } from '../Components/Material';
import { SnakeType } from '../Enums/MaterialEnum';

export default class SnakeBody {

  private bodys: SnakeSection[] = [];

  private positions: number[][] = [];

  private sourceCanvas: HTMLCanvasElement;

  private isEnd: boolean = true;

  public constructor(
    private context: CanvasRenderingContext2D,
    theme: SnakeType,
    private size: number
  ) {
    const material = container.get<Material>('Material');
    const [ primaryColor, secondaryColor ] = snakeTheme[theme];
    this.sourceCanvas = material.snakeSectionToCanvas(primaryColor, secondaryColor, size);
  }

  public push(x: number, y: number): void {
    this.positions.push([x, y]);
  }

  public clear(): void {
    for (const section of this.bodys) {
      this.context.clearRect(section.lastX - 5, section.lastY - 5, this.size + 10, this.size + 10);
    }
  }

  public render(fixedX: number, fixedY: number): void {
    if (this.isEnd) {
      this.positions.shift();
    }

    const reverseStore: number[][] = [];

    for (const body of this.bodys) {
      if (0 <= body.waitTime) {
        body.waitTime -= 1;
        break;  // 后面的必等待
      }
      const position = this.positions[body.position];
      if (position) {
        const [ x, y ] = position;
        reverseStore.unshift([x, y]);
        if (body.isLast) {
          this.isEnd = true;
        }
        if (! this.isEnd) {
          body.position++;
        }
        body.lastX = x - fixedX;
        body.lastY = y - fixedY;
      }
    }

    for (const [ x, y ] of reverseStore) {
      this.context.drawImage(this.sourceCanvas, x - fixedX, y - fixedY);
    }
  }

  public add(): void {
    const newWaitTime: number = 4; //Math.round(waitTime / speed);
    const lastSection: SnakeSection = this.bodys[this.bodys.length - 1];
    const [ x, y ] = this.positions[0];
    let lastX = x;
    let lastY = y;
    if (lastSection) {
      lastSection.isLast = false;
      lastX = lastSection.lastX;
      lastY = lastSection.lastY;
    }
    this.bodys.push({
      isLast: true,
      lastX,
      lastY,
      waitTime: newWaitTime,
      position: 0
    });
    this.isEnd = false;
  }
}
