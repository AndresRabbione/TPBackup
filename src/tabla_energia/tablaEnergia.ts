import { minTemperatuta, temperaturaAlerta } from "../constantes";

export default class TablaEnergia {
    private _tablaEnergia: Map<number, [number, number]>;

    constructor() {
        this._tablaEnergia = new Map<number, [number, number]>([
            [280.00, [2100.0, 100.00]],
            [288.33, [2166.67, 116.65]],
            [296.66, [2233.34, 233.32]],
            [304.99, [2300.01, 349.99]],
            [313.32, [2366.68, 466.66]],
            [321.65, [2433.35, 583.33]],
            [329.98, [2500.02, 700.00]]
        ]);
    }

    private interpolarEnergia(temperatura: number, temperaturaInicial: number, energiaInicial: number, temperaturaFinal: number, energiaFinal: number): number {
        return energiaInicial + ((temperatura - temperaturaInicial) * (energiaFinal - energiaInicial)) / (temperaturaFinal - temperaturaInicial);
    }

    public energiaNeta(temperatura: number): number {
        if (temperatura < minTemperatuta) { 
            return 0;
        } else if (temperatura >= temperaturaAlerta) {
            return 700;
        }

        const energia = this._tablaEnergia.get(temperatura);

        if (energia !== undefined) {
            return energia[1]; 
        } else {
            let temperaturaInicial = 0;
            let temperaturaFinal = 0;

            for (const tempKeys of this._tablaEnergia.keys()) {
                if (tempKeys < temperatura) {
                    temperaturaInicial = tempKeys;
                } else {
                    temperaturaFinal = tempKeys;
                    break;
                }
            }

            const energiaInicial = this._tablaEnergia.get(temperaturaInicial)![1];
            const energiaFinal = this._tablaEnergia.get(temperaturaFinal)![1];

            const resultadoInterpolacion = this.interpolarEnergia(temperatura, temperaturaInicial, energiaInicial, temperaturaFinal, energiaFinal);
            return Math.round(resultadoInterpolacion * 100) / 100; 
        }
    }
}
