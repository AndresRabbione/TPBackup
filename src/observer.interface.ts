import ISensor from "./sensor.interface";

export default interface Observer{
    actualizar(sensor: ISensor): void;
}