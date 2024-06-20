import { temperaturaAlerta } from "../constantes";
import ReactorNuclear from "../reactor_nuclear/ReactorNuclear";
import EstadoReactor from "./EstadoReactor";
import Moderado from "./Moderado";

export default class Normal implements EstadoReactor {
    private reactor: ReactorNuclear;

    constructor(reactor: ReactorNuclear) {
        this.reactor = reactor;
    }

    public actualizarEstadoReactor(reactor: ReactorNuclear): void {
        this.reactor = reactor;
    }

    public getCapacidad(): number {
        return 1;
    }
    
    public calcularEnergia(energiaProducida: number): number {
        return energiaProducida * this.getCapacidad();
    }

    public manejarSituacion(): number {
        if (this.reactor.getTemperatura() > temperaturaAlerta) {
            
            this.reactor.cambiarEstado(new Moderado(this.reactor)); 
        }
        
        return 0;
    }
}