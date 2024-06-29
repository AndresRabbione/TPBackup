import Operador from "./operador";
import Duenio from "./duenio";
import { horasLimite } from "./constantes";
import ReactorNuclear from "./reactor_nuclear/ReactorNuclear";
import GestorDeOperadores from "./gestorDeOperadores";
import ReporteTotal from "./reportes/reporteTotal";

export default class PlantaNuclear {
  private _reactor: ReactorNuclear;
  private _operadores: Operador[];
  private _duenio: Duenio;
  private _gestorDeOperadores: GestorDeOperadores;
  private static _horasOperadas: number = 0;
  private static _minutosOperados: number = 0;

  constructor(reactor: ReactorNuclear, operadores: Operador[], duenio: Duenio) {
    this._duenio = duenio;
    this._operadores = operadores;
    this._reactor = reactor;
    this._gestorDeOperadores = new GestorDeOperadores(operadores);
    this._reactor.getSensor().suscribir(this._gestorDeOperadores);
  }

  public iniciarSimulacion(horasReporte: number, limite?: number): number {
    if (limite === undefined) {
      limite = horasLimite;
    }
    console.log(`Hora: ${PlantaNuclear._horasOperadas + 1}`);
    console.log("Minuto: 0");
    this._reactor.getSensor().actualizarTemperatura(this._reactor);
    let ultimoTiempo: number = 0;

    for (let i: number = 1; i <= 60; i++) {
      console.log(`Minuto: ${i}`);
      PlantaNuclear._minutosOperados = i - ultimoTiempo;
      this._reactor.cambiarTemperatura(PlantaNuclear._minutosOperados);
      // setTimeout(() => {
      //   PlantaNuclear._minutosOperados = i - ultimoTiempo;
      //   this._reactor.cambiarTemperatura(PlantaNuclear._minutosOperados);
      // }, 750);
      ultimoTiempo = i;
    }

    PlantaNuclear._horasOperadas++;

    if (PlantaNuclear._horasOperadas == horasReporte) {
      this._reactor
        .getReportador()
        .enviarReporte(
          new ReporteTotal(
            this._reactor.getReportador().getEnergiaTotal(),
            horasReporte
          )
        );
    }

    if (PlantaNuclear._horasOperadas < limite) {
      this.iniciarSimulacion(horasReporte, limite);
      return 1;
    } else {
      this.finalizarSimulacion();
      return 0;
    }
  }

  public finalizarSimulacion() {
    this._duenio.recibirAlerta(this._reactor.apagarReactor(), true);
    this._reactor
      .getReportador()
      .enviarReporte(
        new ReporteTotal(
          this._reactor.getReportador().getEnergiaTotal(),
          PlantaNuclear._horasOperadas
        )
      );
  }

  public getGestor(): GestorDeOperadores {
    return this._gestorDeOperadores;
  }

  public static getHorasOperadas(): number {
    return this._horasOperadas;
  }

  public static getMinutosOperados(): number {
    if (this._minutosOperados == 0) {
      return 1;
    }
    return this._minutosOperados;
  }
}
