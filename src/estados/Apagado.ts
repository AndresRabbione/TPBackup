import BarraDeControl from "../barraDeControl";
import {
  cambioTemperaturaPorMinuto,
  minTemperatuta,
  temperaturaAlerta,
  temperaturaOptima,
} from "../constantes";
import Operador from "../operador";
import ReactorNuclear from "../reactor_nuclear/reactorNuclear";
import EstadoReactor from "./EstadoReactor";
import Normal from "./Normal";
import Frio from "./frio";

export default class Apagado implements EstadoReactor {
  private reactor: ReactorNuclear;
  private clave: String;

  constructor(reactor?: ReactorNuclear) {
    this.reactor = reactor!;
    this.clave = "apagado";
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
    if (this.reactor.getTemperatura() <= temperaturaOptima) {
      if (this.reactor.getTemperatura() >= minTemperatuta) {
        let estado: EstadoReactor = new Normal(this.reactor);
        this.reactor.encenderReactor(estado);
        this.reactor.getReportador().recibirReporteEstado("normal");
        return;
      } else {
        let estado: EstadoReactor = new Frio(this.reactor);
        this.reactor.encenderReactor(estado);
        return;
      }
    }
  }

  public manejarSituacion(operador: Operador): number {
    if (this.reactor.getTemperatura() >= temperaturaAlerta) {
      operador.insertarBarras(this.reactor);
    }

    this.reactor
      .getReportador()
      .recibirReporteRegular(
        this.reactor.getTemperatura(),
        this.reactor.energiaProducida()
      );

    return 0;
  }

  public cambioTemperatura(): number {
    return cambioTemperaturaPorMinuto * -1;
  }
}
