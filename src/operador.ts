import BarraDeControl from "./barraDeControl";
import { temperaturaOptima } from "./constantes";
import { Notificable } from "./notificable";

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

  public elegirBarras(temperaturaReactor: number): BarraDeControl[] {
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
    let tempActual: number = temperaturaReactor;
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

  public actualizar(estadoReactor: EstadoReactor) {
    if (this.quiereManejar()) {
      estadoReactor.manejarSituacion(this);
    } else {
      this._next?.actualizar(estadoReactor);
    }
  }
}
