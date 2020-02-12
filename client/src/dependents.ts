import Container from "./Container";
import { getInterfaceSize } from './compatibles';
import Subject from "./Subject";
import Action from "./Action";
import Graphical from './Components/Graphical';
import Layer from "./Components/Layer";
import Material from "./Components/Material";

const elementApp = document.getElementById('app');

const { clientWidth, clientHeight } = document.body;
const interfaceSize = getInterfaceSize(clientWidth, clientHeight);

const subject = new Subject();
const action = new Action(subject);

const container = new Container({
  action, subject, interfaceSize
}, {
  Graphical: function(canvas: HTMLCanvasElement) {
    return new Graphical(canvas);
  },
  Layer: function() {
    return new Layer(elementApp);
  },
  Material: function() {
    return new Material();
  }
});

export default container;
