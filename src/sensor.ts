import EstadoReactor from "./estados/EstadoReactor";
import { Notificable } from "./notificable";
import ReactorNuclear from "./reactor_nuclear/ReactorNuclear";

export default class Sensor {
  private observers: Notificable[];

  constructor() {
    this.observers = [];
  }

  notificar(estado: EstadoReactor): void {
    for (const observer of this.observers) {
      observer.recibirAlerta(estado, false);
    }
  }

  suscribir(observer: Notificable): void {
    const isExist = this.observers.includes(observer);

    if (isExist) {
      return;
    }
    this.observers.push(observer);
  }

  desuscribir(observer: Notificable): void {
    const observerIndex = this.observers.indexOf(observer);

    if (observerIndex === -1) {
      return;
    }

    this.observers.splice(observerIndex, 1);
  }

  actualizarTemperatura(reactor: ReactorNuclear): void {
    reactor.getEstado().checkEstado();
    this.notificar(reactor.getEstado());
  }
}
