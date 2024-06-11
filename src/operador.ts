import BarraDeControl from "./barraDeControl";
import {
  energiaGeneradaPorHora,
  maxTemperatura,
  temperaturaAlerta,
} from "./constantes";
import { Notificable } from "./notificable";

export default class Operador implements Notificable {
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

  public insertarBarra(): BarraDeControl[] {
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
    let tempActual: number = reactor.temp;
    let decrementoActual: number = 0;
    let barrasFinales: BarraDeControl[] = [];

    for (let i: number = barrasOrdenadas.length - 1; i >= 0; i--) {
      if (
        tempActual * barrasOrdenadas[i].calcularPorcentaje() <=
        energiaGeneradaPorHora - decrementoActual
      ) {
        decrementoActual +=
          tempActual * barrasOrdenadas[i].calcularPorcentaje();
        tempActual -= tempActual * barrasOrdenadas[i].calcularPorcentaje();
        barrasFinales.push(barrasOrdenadas[i]);
      }
      if (decrementoActual == energiaGeneradaPorHora) break;
    }

    return barrasFinales;
  }

  public recibirAlerta() {
    if (reactor.sensor.verificarTemperatura() >= temperaturaAlerta) {
      this.insertarBarra();
    } else if (reactor.sensor.verificarTemperatura() >= maxTemperatura) {
      reactor.pararReactor();
    }
  }
}
