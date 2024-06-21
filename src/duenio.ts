import EstadoReactor from "./estados/EstadoReactor";
import { Notificable } from "./notificable";

export default class Duenio implements Notificable {
  public recibirAlerta(sensor: EstadoReactor, manejado?: boolean) {}
}
