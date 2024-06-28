import EstadoReactor from "./estados/EstadoReactor";
import GestorDeOperadores from "./gestorDeOperadores";
import ReactorNuclear from "./reactor_nuclear/ReactorNuclear";

export default class Sensor {
  private observer: GestorDeOperadores | undefined;

  constructor() {
    this.observer = undefined;
  }

  public notificar(estado: EstadoReactor): void {
    this.observer!.notificarOperadores(estado);
  }

  public suscribir(observer: GestorDeOperadores): void {
    this.observer = observer;
  }

  public actualizarTemperatura(reactor: ReactorNuclear): void {
    reactor.getEstado().checkEstado();
    this.notificar(reactor.getEstado());
  }

  public getGestor(): GestorDeOperadores {
    return this.observer!;
  }
}
