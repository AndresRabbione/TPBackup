import Operador from "./operador";
import Duenio from "./duenio";
import ReactorNuclear from "./reactorNuclear";

export default class PlantaNuclear {
  private _reactor: ReactorNuclear;
  private _operadores: Operador[];
  private _duenio: Duenio;

  constructor(reactor: ReactorNuclear, operadores: Operador[], duenio: Duenio) {
    this._duenio = duenio;
    this._operadores = operadores;
    this._reactor = reactor;
  }
}
