import BarraDeControl from "./barraDeControl";
import { temperaturaOptima } from "./constantes";
import EstadoReactor from "./estados/EstadoReactor";
import { Notificable } from "./notificable";
import ReactorNuclear from "./reactor_nuclear/ReactorNuclear";

export default class Operador implements Notificable {
  private _nombre: String;
  private _next: Operador | undefined;

  constructor(nombre: String, next: Operador) {
    this._nombre = nombre;
    this._next = next;
  }

  public get nombre(): String {
    return this._nombre;
  }

  public set nombre(nombre: String) {
    this._nombre = nombre;
  }

  public insertarBarras(reactor: ReactorNuclear): BarraDeControl[] {
    const barras: BarraDeControl[] = this.elegirBarras(reactor);

    this.gastarBarras(reactor, barras);

    return barras;
  }

  private gastarBarras(reactor: ReactorNuclear, barras: BarraDeControl[]) {
    for (let i: number = 0; i < barras.length; i++) {
      let index: number = reactor.barrasDeControl.indexOf(barras[i]);
      reactor.barrasDeControl[index].setTiempoDeVida(
        reactor.barrasDeControl[index].tiempoDeVidaUtil - 50
      );
      if (barras[i].tiempoDeVidaUtil <= 0) {
        reactor.barrasDeControl.splice(index, 1);
      }
    }
  }

  private elegirBarras(reactor: ReactorNuclear): BarraDeControl[] {
    if (reactor.barrasDeControl.length == 0) {
      return [];
    }

    //Este sort ordena las barras de manera ascendente por su tiempo de vida util
    //Esta funcion se hace sobre una copia por si en algun caso futuro preservar el orden -
    //actual del array es importante. Esto puede ser cambiado en futuro si ese no es el caso
    const barrasOrdenadas: BarraDeControl[] = reactor.barrasDeControl.sort(
      (a: BarraDeControl, b: BarraDeControl) =>
        a.tiempoDeVidaUtil < b.tiempoDeVidaUtil ? -1 : 1
    );
    let tempActual: number = reactor.getTemperatura();
    let decrementoActual: number = 0;
    let barrasFinales: BarraDeControl[] = [];
    const objetivo: number = tempActual - temperaturaOptima;

    for (let i: number = barrasOrdenadas.length - 1; i >= 0; i--) {
      if (
        tempActual * barrasOrdenadas[i].calcularPorcentaje() <=
        objetivo - decrementoActual
      ) {
        decrementoActual +=
          tempActual * barrasOrdenadas[i].calcularPorcentaje();
        tempActual -= tempActual * barrasOrdenadas[i].calcularPorcentaje();
        barrasFinales.push(barrasOrdenadas[i]);
      }
      if (decrementoActual == objetivo) break;
    }

    return barrasFinales;
  }

  public quiereManejar(): boolean {
    if (this._next === undefined || Math.random() >= 0.5) return true;
    return false;
  }

  public recibirAlerta(estadoReactor: EstadoReactor, manejado: boolean) {
    if (this.quiereManejar() && !manejado) {
      estadoReactor.manejarSituacion(this);
      this._next?.recibirAlerta(estadoReactor, true);
    } else {
      this._next?.recibirAlerta(estadoReactor, manejado);
    }
  }
}
