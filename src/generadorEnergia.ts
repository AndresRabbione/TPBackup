import TablaEnergia from "./tablaEnergia";

export default class GeneradorDeEnergia {
    private tablaEnergia: TablaEnergia;

    constructor() {
        this.tablaEnergia = new TablaEnergia();
    }

    public energiaNetaProducida(temperatura: number): number {
        return this.tablaEnergia.energiaNeta(temperatura);
    }
    
    public calcularEnergia(temperatura: number, horas: number): number {
        // Determinar según la capacidad, temperatura, horas ... 
        return 0;
    }

}