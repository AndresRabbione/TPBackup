import EstadoReactor from "../estados/EstadoReactor";
import TablaEnergia from "../tabla_energia/tablaEnergia";

export default class ReactorNuclear {
    private estadoActual: EstadoReactor;
    private temperatura: number;
    private _energiaBase: EnergiaBase;

    constructor(estadoInicial: EstadoReactor, temperatura: number) {
        this.estadoActual = estadoInicial;
        this.temperatura = temperatura;
        this._energiaBase = new EnergiaBaseConcreta();
    }

    public cambiarEstado(nuevoEstado: EstadoReactor): void {
        this.estadoActual = nuevoEstado;
        nuevoEstado.actualizarEstadoReactor(this);
    }

    public getTemperatura(): number {
        return this.temperatura;
    }

    public setTemperatura(temperatura: number): void {
        this.temperatura = temperatura;
    }

    public getCapacidad(): number {
        return this._estadoActual.getCapacidad();
    }

    public energiaProducida(): number {
        let horasOperadas = PlantaNuclear.getHorasOperadas();
        let decoradorTiempo: EnergiaTiempoDecorator = new EnergiaTiempoDecorator(this._energiaBase, horasOperadas);
        let decoradorCapacidad: EnergiaCapacidadDecorator = new EnergiaCapacidadDecorator(decoradorTiempo, this.getCapacidad());

        return decoradorCapacidad.calcularEnergiaNeta(this.getTemperatura());
    }
    
    public manejarSitucion(): number {
        return this.estadoActual.manejarSituacion();
    }
}