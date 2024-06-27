import {
  cambioTemperaturaPorMinuto,
  maxTemperatura,
  minTemperatuta,
  temperaturaAlerta,
} from "../constantes";
import Operador from "../operador";
import ReactorNuclear from "../reactor_nuclear/reactorNuclear";
import Critico from "./Critico";
import EstadoReactor from "./EstadoReactor";
import Normal from "./Normal";
import Frio from "./frio";

export default class Moderado implements EstadoReactor {
  private reactor: ReactorNuclear;

  constructor(reactor?: ReactorNuclear) {
    this.reactor = reactor!;
  }

  public actualizarEstadoReactor(reactor: ReactorNuclear): void {
    this.reactor = reactor;
  }

  public getCapacidad(): number {
    return 0.2;
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
    } else if (this.reactor.getTemperatura() >= maxTemperatura) {
      let estado: EstadoReactor = new Critico(this.reactor);
      this.reactor.cambiarEstado(estado);
      this.reactor.getReportador().recibirReporteEstado("critico");
      return;
    }
  }

  public manejarSituacion(operador: Operador): number {
    operador.insertarBarras(this.reactor);

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
