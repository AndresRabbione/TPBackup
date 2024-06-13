import Observer from "./observer.interface";

export default interface ISensor {
    notificar(): void;
    subscribir(observer: Observer): void;
    desuscribir(observer: Observer): void;
}