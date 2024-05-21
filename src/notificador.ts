import {
  maxTemperatura,
  minTemperatuta,
  temperaturaAlerta,
} from "./constantes";
import { TemperaturaReactor } from "./temperaturaReactor";

export default class Notificador {
  public enviarNotificacion(temp: number): TemperaturaReactor {
    if (temp >= minTemperatuta && temp < temperaturaAlerta) {
      return TemperaturaReactor.NORMAL;
    }
    if (temp >= temperaturaAlerta && temp < maxTemperatura) {
      return TemperaturaReactor.MODERADO;
    }
    if (temp >= maxTemperatura) {
      return TemperaturaReactor.CRITICO;
    }
    return TemperaturaReactor.FRIO;
  }
}
