import BarraDeControl from "./barraDeControl";
import { temperaturaOptima } from "./constantes";
import Duenio from "./duenio";
import EstadoReactor from "./estados/EstadoReactor";
import { Notificable } from "./notificable";
import ReactorNuclear from "./reactor_nuclear/ReactorNuclear";
import ReporteBarras from "./reportes/reporteBarras";

export default class Operador implements Notificable {
  private _nombre: String;
  private _duenio: Duenio;

  constructor(nombre: String, duenio: Duenio) {
    this._nombre = nombre;
    this._duenio = duenio;
  }

  public get nombre(): String {
    return this._nombre;
  }

  public set nombre(nombre: String) {
    this._nombre = nombre;
  }

  public insertarBarras(reactor: ReactorNuclear): BarraDeControl[] {
    const barras: BarraDeControl[] = this.elegirBarras(reactor);
    if (barras.length > 0) {
      let temperaturaReactor: number = reactor.getTemperatura();
      let decremento: number = 0;

      for (let i: number = 0; i < barras.length; i++) {
        decremento += temperaturaReactor * barras[i].calcularPorcentaje();
        temperaturaReactor -=
          temperaturaReactor * barras[i].calcularPorcentaje();
      }

      reactor.setTemperatura(reactor.getTemperatura() - decremento);

      this.gastarBarras(reactor, barras);
    }

    reactor.getReportador().enviarReporte(new ReporteBarras(barras.length));
    //reactor.getReportador().recibirReporteBarras(barras.length);

    return barras;
  }

  private elegirBarras(reactor: ReactorNuclear): BarraDeControl[] {
    if (reactor.getBarras().length == 0) {
      return [];
    }

    const barrasOrdenadas: BarraDeControl[] = reactor.getBarras();

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

  private eliminarBarra(reactor: ReactorNuclear, barra: BarraDeControl) {
    let index: number = reactor.getBarras().indexOf(barra);
    reactor.getBarras().splice(index, 1);
  }

  private gastarBarras(reactor: ReactorNuclear, barras: BarraDeControl[]) {
    for (const barra of barras) {
      let j: number = reactor.getBarras().indexOf(barra);
      reactor.getBarras()[j].bajarTiempoDeVida(50);
      if (reactor.getBarras()[j].tiempoDeVidaUtil <= 0) {
        this.eliminarBarra(reactor, reactor.getBarras()[j]);
      }
    }
  }

  public recibirAlerta(estado: EstadoReactor, manejado: boolean): number {
    if (!manejado) {
      estado.manejarSituacion(this);
    } else {
      return 0;
    }

    return 1;
  }

  public notificarDuenio(estado: EstadoReactor): number {
    return this._duenio.recibirAlerta(estado, true);
  }
}
