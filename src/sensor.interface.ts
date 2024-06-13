import Observer from "./observer.interface";

export default interface ISensor {
    notificar(): void;
    informarTemperatura(): void;
    subscribir(observer: Observer): void;
    desuscribir(observer: Observer): void;
}