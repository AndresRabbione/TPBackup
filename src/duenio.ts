import EstadoReactor from "./estados/EstadoReactor";
import { Notificable } from "./notificable";
import Operador from "./operador";

export default class Duenio implements Notificable {
  private _operadores: Operador[];

  constructor(operadores: Operador[]) {
    this._operadores = operadores;
  }

  public recibirAlerta(estado: EstadoReactor, manejado?: boolean) {
    return 1;
  }
}
