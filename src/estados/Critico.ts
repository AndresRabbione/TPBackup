import {
  cambioTemperaturaPorMinuto,
  maxTemperatura,
  minTemperatuta,
  temperaturaAlerta,
} from "../constantes";
import Operador from "../operador";
import ReactorNuclear from "../reactor_nuclear/ReactorNuclear";
import Apagado from "./Apagado";
import EstadoReactor from "./EstadoReactor";
import Moderado from "./Moderado";
import Normal from "./Normal";
import Frio from "./frio";

export default class Critico implements EstadoReactor {
  private reactor: ReactorNuclear;
  private clave: String;

  constructor(reactor: ReactorNuclear) {
    this.reactor = reactor;
    this.clave = "critico";
  }

  public actualizarEstadoReactor(reactor: ReactorNuclear): void {
    this.reactor = reactor;
  }

  public getCapacidad(): number {
    return 0;
  }

  public calcularEnergia(energiaProducida: number): number {
    return energiaProducida * this.getCapacidad();
  }

  public checkEstado(): void {
    if (this.reactor.getTemperatura() < minTemperatuta) {
      let estado: EstadoReactor = new Frio(this.reactor);
      this.reactor.cambiarEstado(estado);
      return;
    } else if (
      this.reactor.getTemperatura() >= minTemperatuta &&
      this.reactor.getTemperatura() < temperaturaAlerta
    ) {
      let estado: EstadoReactor = new Normal(this.reactor);
      this.reactor.cambiarEstado(estado);
      this.reactor.getReportador().recibirReporteEstado("normal");
      return;
    } else if (
      this.reactor.getTemperatura() >= temperaturaAlerta &&
      this.reactor.getTemperatura() < maxTemperatura
    ) {
      let estado: EstadoReactor = new Moderado(this.reactor);
      this.reactor.cambiarEstado(estado);
      return;
    }
  }

  public manejarSituacion(operador: Operador): number {
    operador.notificarDuenio(this.reactor.apagarReactor());
    this.reactor.getReportador().recibirReporteEstado("apagado");

    this.reactor
      .getReportador()
      .recibirReporteRegular(
        this.reactor.getTemperatura(),
        this.reactor.energiaProducida()
      );

    return 0;
  }

  public cambioTemperatura(): number {
    return cambioTemperaturaPorMinuto;
  }
}
