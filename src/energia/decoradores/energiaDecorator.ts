import EnergiaBase from "../energiaBase";

export default abstract class EnergiaDecorator implements EnergiaBase {
    protected _energia: EnergiaBase;

    constructor(energia: EnergiaBase) {
        this._energia = energia;
    }
    
    public abstract calcularEnergiaNeta(temperatura: number): number;
}