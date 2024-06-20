import EstadoReactor from "../estados/EstadoReactor";
import TablaEnergia from "../tablaEnergia";

export default class ReactorNuclear {
    private estadoActual: EstadoReactor;
    private tablaDeEnergia: TablaEnergia;
    private temperatura: number;

    constructor(estadoInicial: EstadoReactor, temperatura: number) {
        this.estadoActual = estadoInicial;
        this.tablaDeEnergia = new TablaEnergia();
        this.temperatura = temperatura;
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

    public energiaNetaProducida(): number {
        return this.tablaDeEnergia.energiaNeta(this.getTemperatura());
    }

    public energiaProducida(): number {
        return this.estadoActual.calcularEnergia(this.energiaNetaProducida());
    }

    public manejarSitucion(): number {
        return this.estadoActual.manejarSituacion();
    }
}