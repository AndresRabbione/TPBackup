import {
  cambioTemperaturaPorMinuto,
  maxTemperatura,
  minTemperatuta,
  temperaturaAlerta,
} from "../constantes";
import Operador from "../operador";
import ReactorNuclear from "../reactor_nuclear/ReactorNuclear";
import ReporteEstados from "../reportes/reporteEstados";
import ReporteRegular from "../reportes/reporteRegular";
import Critico from "./Critico";
import EstadoReactor from "./EstadoReactor";
import Moderado from "./Moderado";
import Normal from "./Normal";

export default class Frio implements EstadoReactor {
  private reactor: ReactorNuclear;

  constructor(reactor?: ReactorNuclear) {
    this.reactor = reactor!;
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
    if (
      this.reactor.getTemperatura() >= minTemperatuta &&
      this.reactor.getTemperatura() < temperaturaAlerta
    ) {
      let estado: EstadoReactor = new Normal(this.reactor);
      this.reactor.cambiarEstado(estado);
      this.reactor.getReportador().recibirReporteEstado("normal");
      this.reactor
        .getReportador()
        .enviarReporte(
          new ReporteEstados(
            this.reactor.getReportador().getAcumuladorEstados()
          )
        );
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
      this.reactor
        .getReportador()
        .enviarReporte(
          new ReporteEstados(
            this.reactor.getReportador().getAcumuladorEstados()
          )
        );
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

    this.reactor
      .getReportador()
      .enviarReporte(
        new ReporteRegular(
          this.reactor.getTemperatura(),
          this.reactor.energiaProducida()
        )
      );

    return 0;
  }

  public cambioTemperatura(): number {
    return cambioTemperaturaPorMinuto;
  }
}
