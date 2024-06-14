import Observer from "./observer.interface";

export default interface ISensor {
    notificar(): void;
    suscribir(observer: Observer): void;
    desuscribir(observer: Observer): void;
}