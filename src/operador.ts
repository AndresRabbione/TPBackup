import { TemperaturaReactor } from "./temperaturaReactor";

export default class Operador {
  private _nombre: String;

  constructor(nombre: String) {
    this._nombre = nombre;
  }

  public get nombre(): String {
    return this._nombre;
  }

  public set nombre(nombre: String) {
    this._nombre = nombre;
  }

  public insertarBarra(
    reactor: ReactorNuclear,
    cantidad: number
  ): BarraDeControl[] {
    if (reactor.barrasDeControl.length == 0) {
      return [];
    }
    let barrasFinales: BarraDeControl[] = [];
    for (let i: number = 0; i < cantidad; i++) {
      // Elige una posicion random dentro del array de barras para elegir una y la pasa
      // Este criterio puede ser cambiado si necesario pero funciona por ahora
      let n: number = Math.random() * (reactor.barrasDeControl.length - 0);
      barrasFinales.push(reactor.barrasDeControl[n]);
    }

    return barrasFinales;
  }

  public recibirAlerta(notificacion: TemperaturaReactor) {
    if (notificacion == TemperaturaReactor.MODERADO) {
      this.activarProtocolo();
    }
  }

  public activarProtocolo() {}
}
