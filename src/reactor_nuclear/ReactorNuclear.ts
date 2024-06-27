import EnergiaCapacidadDecorator from "../energia/decoradores/energiaDecoratorCapacidad";
import EnergiaDecoratorTiempo from "../energia/decoradores/energiaDecoratorTiempo";
import EnergiaBase from "../energia/energiaBase";
import EnergiaBaseConcreta from "../energia/energiaBaseConcreta";
import EstadoReactor from "../estados/EstadoReactor";
import PlantaNuclear from "../plantaNuclear";

export default class ReactorNuclear {
    private _estadoActual: EstadoReactor;
    private _temperatura: number;
    private _energiaBase: EnergiaBase;

    constructor(estadoInicial: EstadoReactor, temperatura: number) {
        this._estadoActual = estadoInicial;
        this._temperatura = temperatura;
        this._energiaBase = new EnergiaBaseConcreta();
    }

    public cambiarEstado(nuevoEstado: EstadoReactor): void {
        this._estadoActual = nuevoEstado;
        nuevoEstado.actualizarEstadoReactor(this);
    }

    public getTemperatura(): number {
        return this._temperatura;
    }

    public setTemperatura(temperatura: number): void {
        this._temperatura = temperatura;
    }

    public getCapacidad(): number {
        return this._estadoActual.getCapacidad();
    }

    public energiaProducida(): number {
        const horasOperadas = PlantaNuclear.getHorasOperadas();
        const decoradorTiempo: EnergiaDecoratorTiempo = new EnergiaDecoratorTiempo(this._energiaBase, horasOperadas);
        const decoradorCapacidad: EnergiaCapacidadDecorator = new EnergiaCapacidadDecorator(decoradorTiempo, this.getCapacidad());

        const energia = decoradorCapacidad.calcularEnergiaNeta(this.getTemperatura());
        return energia;
    }
    
    public manejarSitucion(): number {
        return this._estadoActual.manejarSituacion();
    }
}