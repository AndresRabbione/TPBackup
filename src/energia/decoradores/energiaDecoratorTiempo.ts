import EnergiaBase from "../energiaBase";
import EnergiaDecorator from "./energiaDecorator";

export default class EnergiaDecoratorTiempo extends EnergiaDecorator {
    private _tiempo: number;

    constructor(energia: EnergiaBase, tiempo: number) {
        super(energia);
        this._tiempo = tiempo;
    }

    private convertirTiempoAMinutos(): number {
        return this._tiempo * 60;
    }

    public calcularEnergiaNeta(temperatura: number): number {
        const energiaPorHora = this._energia.calcularEnergiaNeta(temperatura);
        const energiaPorMinuto = energiaPorHora / 60;
        return energiaPorMinuto * this.convertirTiempoAMinutos();
    }
}