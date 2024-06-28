import BarraDeControl from "../barraDeControl";
import Duenio from "../duenio";
import Apagado from "../estados/Apagado";
import EstadoReactor from "../estados/EstadoReactor";
import GestorDeOperadores from "../gestorDeOperadores";
import { Notificable } from "../notificable";
import Reportador from "../reportador";
import Sensor from "../sensor";
import TablaEnergia from "../tablaEnergia";

export default class ReactorNuclear {
  private estadoActual: EstadoReactor;
  private tablaDeEnergia: TablaEnergia;
  private temperatura: number;
  private _barrasDeControl: BarraDeControl[];
  private reportador: Reportador;
  private sensor: Sensor;

  constructor(
    estadoInicial: EstadoReactor,
    temperatura: number,
    barras: BarraDeControl[],
    duenio: Duenio
  ) {
    this.estadoActual = estadoInicial;
    this.tablaDeEnergia = new TablaEnergia();
    this.temperatura = temperatura;
    this._barrasDeControl = barras;
    this.reportador = new Reportador(duenio);
    this.sensor = new Sensor();
    this._barrasDeControl.sort((a: BarraDeControl, b: BarraDeControl) =>
      a.tiempoDeVidaUtil < b.tiempoDeVidaUtil ? -1 : 1
    );
  }

  public encenderReactor(estado: EstadoReactor) {
    this.cambiarEstado(estado);
  }

  public apagarReactor(): EstadoReactor {
    let estado: EstadoReactor = new Apagado(this);
    this.cambiarEstado(estado);
    return estado;
  }

  public cambiarEstado(nuevoEstado: EstadoReactor): void {
    this.estadoActual = nuevoEstado;
    nuevoEstado.actualizarEstadoReactor(this);
  }

  public getSensor(): Sensor {
    return this.sensor;
  }

  public getEstado(): EstadoReactor {
    return this.estadoActual;
  }

  public getTemperatura(): number {
    return this.temperatura;
  }

  public setTemperatura(temperatura: number): void {
    this.temperatura = temperatura;
  }

  public getReportador(): Reportador {
    return this.reportador;
  }

  public getBarras(): BarraDeControl[] {
    return this._barrasDeControl;
  }

  public setBarras(barras: BarraDeControl[]) {
    this._barrasDeControl = barras;
    this._barrasDeControl.sort((a: BarraDeControl, b: BarraDeControl) =>
      a.tiempoDeVidaUtil < b.tiempoDeVidaUtil ? -1 : 1
    );
  }

  private energiaNetaProducida(): number {
    return this.tablaDeEnergia.energiaNeta(this.getTemperatura());
  }

  public energiaProducida(): number {
    return this.estadoActual.calcularEnergia(this.energiaNetaProducida());
  }

  public cambiarTemperatura(tiempo: number): void {
    this.temperatura += this.estadoActual.cambioTemperatura() * tiempo;
    this.sensor.actualizarTemperatura(this);
  }
}
