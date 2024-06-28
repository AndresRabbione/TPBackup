import EnergiaCapacidadDecorator from "../energia/decoradores/energiaDecoratorCapacidad";
import EnergiaDecoratorTiempo from "../energia/decoradores/energiaDecoratorTiempo";
import EnergiaBase from "../energia/energiaBase";
import EnergiaBaseConcreta from "../energia/energiaBaseConcreta";
import BarraDeControl from "../barraDeControl";
import Duenio from "../duenio";
import Apagado from "../estados/Apagado";
import EstadoReactor from "../estados/EstadoReactor";
import PlantaNuclear from "../plantaNuclear";
import Reportador from "../reportador";
import Sensor from "../sensor";

export default class ReactorNuclear {
  private estadoActual: EstadoReactor;
  private _energiaBase: EnergiaBase;
  private _energiaTotalProducida: number;
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
    this.temperatura = temperatura;
    this._barrasDeControl = barras;
    this.reportador = new Reportador(duenio);
    this.sensor = new Sensor();
    this._barrasDeControl.sort((a: BarraDeControl, b: BarraDeControl) =>
      a.tiempoDeVidaUtil < b.tiempoDeVidaUtil ? -1 : 1
    );
    this._energiaBase = new EnergiaBaseConcreta();
    this._energiaTotalProducida = 0;
  }

  public getSensor(): Sensor {
    return this.sensor;
  }

  public getReportador(): Reportador {
    return this.reportador;
  }

  public getEstado(): EstadoReactor {
    return this.estadoActual;
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

  public getCapacidad(): number {
    return this.estadoActual.getCapacidad();
  }

  public getTemperatura(): number {
    return this.temperatura;
  }

  public setTemperatura(temperatura: number): void {
    this.temperatura = temperatura;
  }

  public getBarras(): BarraDeControl[] {
    return this._barrasDeControl;
  }

  public setBarras(barras: BarraDeControl[]) {
    this._barrasDeControl = barras;
  }

  public energiaProducida(): number {
    const tiempoOperado = PlantaNuclear.getHorasOperadas();
    const decoradorTiempo: EnergiaDecoratorTiempo = new EnergiaDecoratorTiempo(
      this._energiaBase
    );
    const decoradorCapacidad: EnergiaCapacidadDecorator =
      new EnergiaCapacidadDecorator(decoradorTiempo, this.getCapacidad());

    const energia = decoradorCapacidad.calcularEnergiaNeta(
      this.getTemperatura()
    );

    return energia;
  }

  public cambiarTemperatura(tiempo: number) {
    this.temperatura += this.estadoActual.cambioTemperatura() * tiempo;
    this.sensor.actualizarTemperatura(this);
  }

  public energiaTotalProducida(): number {
    return this._energiaTotalProducida;
  }
}
