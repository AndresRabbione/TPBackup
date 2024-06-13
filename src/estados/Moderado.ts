import { maxTemperatura, temperaturaAlerta } from "../constantes";
import ReactorNuclear from "../reactor_nuclear/ReactorNuclear";
import Critico from "./Critico";
import EstadoReactor from "./EstadoReactor";
import Normal from "./Normal";

export default class Moderado implements EstadoReactor {
    private reactor: ReactorNuclear;

    constructor(reactor: ReactorNuclear) {
        this.reactor = reactor;
    }

    public actualizarEstadoReactor(reactor: ReactorNuclear): void {
        this.reactor = reactor;
    }

    public getCapacidad(): number {
        return 0.2;
    }

    public calcularEnergia(energiaProducida: number): number {
        return energiaProducida * this.getCapacidad();
    }

    public manejarSituacion(): number {
        let barrasUtilizadas = 0;

        if (this.reactor.getTemperatura() >= maxTemperatura) {
            this.reactor.cambiarEstado(new Critico(this.reactor));
        } else if (this.reactor.getTemperatura() >= temperaturaAlerta) {
            
            while(this.reactor.getTemperatura() >= temperaturaAlerta) {
                // *Código para insertar barra* 
                barrasUtilizadas++;
            }
            
            this.reactor.cambiarEstado(new Normal(this.reactor));
        }
        
        return barrasUtilizadas; //Acumular salida.
    }
} 