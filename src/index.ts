import BarraDeControl from "./barraDeControl";
import Duenio from "./duenio";
import EstadoReactor from "./estados/EstadoReactor";
import Normal from "./estados/Normal";
import Operador from "./operador";
import PlantaNuclear from "./plantaNuclear";
import ReactorNuclear from "./reactor_nuclear/ReactorNuclear";

let barras: BarraDeControl[] = [
  new BarraDeControl(200),
  new BarraDeControl(190),
];
let duenio: Duenio = new Duenio("nombre");
let operadores: Operador[] = [
  new Operador("Homero", duenio),
  new Operador("Bart", duenio),
  new Operador("Lisa", duenio),
];
let estadoInicial: EstadoReactor = new Normal();
let reactor: ReactorNuclear = new ReactorNuclear(
  estadoInicial,
  290,
  barras,
  duenio
);
reactor.cambiarEstado(estadoInicial);
let plantaNuclear: PlantaNuclear = new PlantaNuclear(
  reactor,
  operadores,
  duenio
);

plantaNuclear.iniciarSimulacion(3, 6);
