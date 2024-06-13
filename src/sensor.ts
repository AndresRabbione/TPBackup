import Observer from "./observer.interface";
import ISensor from "./sensor.interface";

export default class Sensor implements ISensor{

    private _temperatura: number = 0;
  
    private observers: Observer[] = [];
    
    public get temperatura(): number {
        return this._temperatura;
    }
    
    public set temperatura(value: number) {
        this._temperatura = value;
    }

    notificar(): void {
        for (const observer of this.observers) {
            observer.actualizar(this);
        }
    }

    subscribir(observer: Observer): void {
        const isExist = this.observers.includes(observer);
        
        if (isExist) {
            return;
        }
        this.observers.push(observer);
    }

    desuscribir(observer: Observer): void {
        const observerIndex = this.observers.indexOf(observer);
        
        if (observerIndex === -1) {
            return;
        }
        
        this.observers.splice(observerIndex, 1);
    }

    actualizarTemperatura(temperatura: number): void {
        this._temperatura = temperatura;
        this.notificar();
    }

}