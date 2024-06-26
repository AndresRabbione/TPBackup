import {
  cambioTemperaturaPorMinuto,
  maxTemperatura,
  minTemperatuta,
  temperaturaAlerta,
} from "../constantes";
import Operador from "../operador";
import ReactorNuclear from "../reactor_nuclear/ReactorNuclear";
import Critico from "./Critico";
import EstadoReactor from "./EstadoReactor";
import Moderado from "./Moderado";
import Frio from "./frio";

export default class Normal implements EstadoReactor {
  private reactor: ReactorNuclear;
  private clave: String;

  constructor(reactor?: ReactorNuclear) {
    this.reactor = reactor!;
    this.clave = "normal";
  }

  public actualizarEstadoReactor(reactor: ReactorNuclear): void {
    this.reactor = reactor;
  }

  public getCapacidad(): number {
    return 1;
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
      this.reactor.getTemperatura() >= temperaturaAlerta &&
      this.reactor.getTemperatura() < maxTemperatura
    ) {
      let estado: EstadoReactor = new Moderado(this.reactor);
      this.reactor.cambiarEstado(estado);
      return;
    } else if (this.reactor.getTemperatura() >= maxTemperatura) {
      let estado: EstadoReactor = new Critico(this.reactor);
      this.reactor.cambiarEstado(estado);
      this.reactor.getReportador().recibirReporteEstado("critico");
      return;
    }
  }

  public manejarSituacion(operador: Operador): number {
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
