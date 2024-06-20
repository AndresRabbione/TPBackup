import { temperaturaAlerta } from "../constantes";
import ReactorNuclear from "../reactor_nuclear/ReactorNuclear";
import EstadoReactor from "./EstadoReactor";
import Normal from "./Normal";

export default class Apagado implements EstadoReactor {
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
        let barrasUtilizadas = 0;
        
        while(this.reactor.getTemperatura() >= temperaturaAlerta) {
            // *Código para insertar barra*. Hasta que la temperatura alcance su rango de normalidad. 
            barrasUtilizadas++;
        }
        
        this.reactor.cambiarEstado(new Normal(this.reactor)); 
        return barrasUtilizadas; //Acumular salida.
    }
    
} 