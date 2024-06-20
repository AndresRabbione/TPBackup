import { maxTemperatura } from "../constantes";
import ReactorNuclear from "../reactor_nuclear/ReactorNuclear";
import Apagado from "./Apagado";
import EstadoReactor from "./EstadoReactor";
import Moderado from "./Moderado";

export default class Critico implements EstadoReactor {
    private reactor: ReactorNuclear;

    constructor(reactor: ReactorNuclear) {
        this.reactor = reactor;
    }

    public actualizarEstadoReactor(reactor: ReactorNuclear): void {
        this.reactor = reactor;
    }

    public getCapacidad(): number {
        return 0;
    }

    public calcularEnergia(energiaProducida: number): number {
        return energiaProducida * this.getCapacidad();
    }

    public manejarSituacion(): number {
        if (this.reactor.getTemperatura() >= maxTemperatura) {
            this.reactor.cambiarEstado(new Apagado(this.reactor));
        }
        return 0;
    }
} 