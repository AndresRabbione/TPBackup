import Observer from "./observer.interface";
import Sensor from "./sensor";
import ISensor from "./sensor.interface";
import { maxTemperatura, minTemperatura, temperaturaAlerta } from "./constantes";

export default class Notificador implements Observer {
  
  actualizar(sensor: ISensor): number {
    if (sensor instanceof Sensor) {
      if (sensor.temperatura >= minTemperatura && sensor.temperatura < temperaturaAlerta) 
        return sensor.temperatura;

      if (sensor.temperatura >= temperaturaAlerta && sensor.temperatura < maxTemperatura) 
        throw new Error(`La temperatura es de ${sensor.temperatura}, la insercion de barras de control es recomendada.`)

      if (sensor.temperatura >= maxTemperatura) 
        throw new Error('La temperatura es CRITICA y el reactor DEBE apagarse.')

      return sensor.temperatura;
    }

    return -1;
  }
}