import EstadoReactor from "./estados/EstadoReactor";

export interface Notificable {
  recibirAlerta(estadoReactor: EstadoReactor, manejado: boolean): number;
}
