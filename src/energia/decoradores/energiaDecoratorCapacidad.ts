import EnergiaBase from "../energiaBase";
import EnergiaDecorator from "./energiaDecorator";

export default class EnergiaCapacidadDecorator extends EnergiaDecorator {
    private _capacidad: number;

    constructor(energia: EnergiaBase, capacidad: number) {
        super(energia);
        this._capacidad = capacidad;
    }

    public calcularEnergiaNeta(temperatura: number): number {
       return this._energia.calcularEnergiaNeta(temperatura) * this._capacidad;
    }
}