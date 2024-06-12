import Observer from "./observer.interface";

export default interface ISensor {
    informarTemperatura(): void;
    subscribir(observer: Observer): void;
    desuscribir(observer: Observer): void;
}