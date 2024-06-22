import Operador from "./operador";
import Duenio from "./duenio";
import { horasLimite } from "./constantes";
import ReactorNuclear from "./reactor_nuclear/ReactorNuclear";

export default class PlantaNuclear {
  private _reactor: ReactorNuclear;
  private _operadores: Operador;
  private _duenio: Duenio;
  private _horasOperadas: number;

  constructor(reactor: ReactorNuclear, operadores: Operador, duenio: Duenio) {
    this._duenio = duenio;
    this._operadores = operadores;
    this._reactor = reactor;
    this._horasOperadas = 0;
  }

  public iniciarSimulacion(horasReporte: number, limite?: number): void {
    if (limite === undefined) {
      limite = horasLimite;
    }
    console.log(`Hora: ${this._horasOperadas + 1}`);
    this._reactor.getSensor().actualizarTemperatura(this._reactor);
    for (let i: number = 5; i <= 60; i += 5) {
      console.log(`Minuto: ${i}`);
      setTimeout(() => {
        this._reactor.cambiarTemperatura(i);
      }, 750);
    }

    this._horasOperadas++;

    if (this._horasOperadas == horasReporte) {
      this._reactor.getReportador().recibirReporteTotal(horasReporte);
    }

    if (this._horasOperadas < limite) {
      this.iniciarSimulacion(horasReporte, limite);
    } else {
      this.finalizarSimulacion();
    }
  }

  public finalizarSimulacion() {
    this._duenio.recibirAlerta(this._reactor.apagarReactor(), true);
    this._reactor.getReportador().recibirReporteTotal(this._horasOperadas);
  }
}
