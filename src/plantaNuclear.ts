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

  public iniciarSimulacion(horasReporte: number, limite?: number): number {
    if (limite === undefined) {
      limite = horasLimite;
    }
    console.log(`Hora: ${this._horasOperadas + 1}`);
    console.log("Minuto: 0");
    this._reactor.getSensor().actualizarTemperatura(this._reactor);
    let ultimoTiempo: number = 0;
    for (let i: number = 5; i <= 60; i += 5) {
      console.log(`Minuto: ${i}`);
      this._reactor.cambiarTemperatura(i - ultimoTiempo);
      console.log(this._reactor.getEstado().getCapacidad());
      // setTimeout(() => {
      //   this._reactor.cambiarTemperatura(i);
      // }, 750);
      ultimoTiempo = i;
    }

    this._horasOperadas++;

    if (this._horasOperadas == horasReporte) {
      this._reactor.getReportador().recibirReporteTotal(horasReporte);
    }

    if (this._horasOperadas < limite) {
      this.iniciarSimulacion(horasReporte, limite);
      return 1;
    } else {
      this.finalizarSimulacion();
      return 0;
    }

    return -1;
  }

  public finalizarSimulacion() {
    this._duenio.recibirAlerta(this._reactor.apagarReactor(), true);
    this._reactor.getReportador().recibirReporteTotal(this._horasOperadas);
  }
}
