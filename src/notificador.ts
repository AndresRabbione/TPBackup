import Operador from "./operador";
import { TemperaturaReactor } from "./temperaturaReactor";

export default class Notificador {
  public enviarNotificacion(temp: number): TemperaturaReactor {
    if (temp >= 280 && temp < 330) {
      return TemperaturaReactor.NORMAL;
    }
    if (temp >= 330 && temp < 400) {
      return TemperaturaReactor.MODERADO;
    }
    if (temp >= 400) {
      return TemperaturaReactor.CRITICO;
    }
    return TemperaturaReactor.FRIO;
  }
}
