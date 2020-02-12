import Observer from "./Observer";
import container from "../dependents";
import Layer from "../Components/Layer";
import Graphical from "../Components/Graphical";
import Material from "../Components/Material";
import Food from "./Food";

export default class PublicMap extends Observer {

  private canvas: HTMLCanvasElement;

  private layer: Layer;

  private context: CanvasRenderingContext2D;

  private mapCanvas: HTMLCanvasElement;
  
  private interfaceSize: number[];

  static mapSize: number = 1200;

  public constructor(
    private food: Food
  ) {
    super();
    this.layer = container.get<Layer>('Layer');
    this.canvas = this.layer.push();
    const graphical = container.make<Graphical>('Graphical', this.canvas);
    const material = container.get<Material>('Material');
    this.mapCanvas = material.getMap(PublicMap.mapSize);
    this.context = graphical.getContext();

    this.interfaceSize = container.get('interfaceSize');

    this.setStates({
      x: 0,
      y: 0
    });
  }

  public update(timestamp: number): void {
    // pass
  }

  public render() {
    const [ width, height ] = this.interfaceSize;
    const { x, y } = this.getStates();
    this.context.clearRect(0, 0, width, height);
    this.context.drawImage(this.mapCanvas, x, y, width, height, 0, 0, width, height);
  }

  public updateMaxPosition(x: number, y: number) {
    this.setStates({x, y});
    this.food.setStates({x, y});
  }

  public terminate() {
    const element = this.layer.getElement();
    element.removeChild(this.canvas);
  } 
}
