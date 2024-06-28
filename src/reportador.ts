import Duenio from "./duenio";
import { Reporte } from "./reportes/reporte";

export default class Reportador {
  private _energiaTotal: number;
  private _acumuladorEstados: Map<String, number>;
  private duenio: Duenio;

  constructor(duenio: Duenio) {
    this._energiaTotal = 0;
    this._acumuladorEstados = new Map();
    this.inicializarContadorDeEventos();
    this.duenio = duenio;
  }

  private inicializarContadorDeEventos(): void {
    const estados: String[] = ["apagado", "normal", "critico"];
    estados.forEach((estado) => this._acumuladorEstados.set(estado, 0));
  }

  public recibirReporteRegular(temperatura: number, energia: number) {
    this._energiaTotal += energia;
  }

  public recibirReporteEstado(estado: String) {
    if (this._acumuladorEstados.has(estado)) {
      let contadorActual = this._acumuladorEstados.get(estado) || 0;
      contadorActual++;
      this._acumuladorEstados.set(estado, contadorActual);
    }

    return this._acumuladorEstados.get(estado);
  }

  public enviarReporte(reporte: Reporte) {
    this.duenio.recibirReporte(reporte);
  }

  public getEnergiaTotal(): number {
    return this._energiaTotal;
  }

  public getAcumuladorEstados(): Map<String, number> {
    return this._acumuladorEstados;
  }
}
