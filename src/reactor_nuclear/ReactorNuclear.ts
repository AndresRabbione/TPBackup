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
    private _energiaTotalProducida: number;
    private _tiempoAnteriorOperado: number;

    constructor(estadoInicial: EstadoReactor, temperatura: number) {
        this._estadoActual = estadoInicial;
        this._temperatura = temperatura;
        this._energiaBase = new EnergiaBaseConcreta();
        this._energiaTotalProducida = 0;
        this._tiempoAnteriorOperado = 0;
    }

    public cambiarEstado(nuevoEstado: EstadoReactor): void {
        this.acumularEnergiaProducida();

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
        const tiempoOperado = PlantaNuclear.getHorasOperadas();
        const tiempoIntervalo = tiempoOperado - this._tiempoAnteriorOperado;
        const decoradorTiempo: EnergiaDecoratorTiempo = new EnergiaDecoratorTiempo(this._energiaBase, tiempoIntervalo);
        const decoradorCapacidad: EnergiaCapacidadDecorator = new EnergiaCapacidadDecorator(decoradorTiempo, this.getCapacidad());

        const energia = decoradorCapacidad.calcularEnergiaNeta(this.getTemperatura());
        this._tiempoAnteriorOperado = tiempoOperado;

        return energia;
    }

    private acumularEnergiaProducida(): void {
        const energiaPrevioCambio = this.energiaProducida();
        this._energiaTotalProducida += energiaPrevioCambio;
    }

    public energiaTotalProducida(): number {
        return this._energiaTotalProducida;
    }
    
    public manejarSitucion(): number {
        return this._estadoActual.manejarSituacion();
    }
}