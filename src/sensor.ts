import EstadoReactor from "./estados/EstadoReactor";
import GestorDeOperadores from "./gestorDeOperadores";
import { Notificable } from "./notificable";
import ReactorNuclear from "./reactor_nuclear/ReactorNuclear";

export default class Sensor {
  private observer: GestorDeOperadores | undefined;

  constructor() {
    this.observer = undefined;
  }

  notificar(estado: EstadoReactor): void {
    this.observer!.notificarOperadores(estado);
  }

  suscribir(observer: GestorDeOperadores): void {
    this.observer = observer;
  }

  // desuscribir(observer: Notificable): void {
  //   this.observers.splice(observerIndex, 1);
  // }

  public actualizarTemperatura(reactor: ReactorNuclear): void {
    reactor.getEstado().checkEstado();
    this.notificar(reactor.getEstado());
  }
}
