import { minTemperatuta, temperaturaAlerta } from "../constantes";
import EnergiaBase from "./energiaBase";

export default class EnergiaBaseConcreta implements EnergiaBase {
  private _valoresBase: Map<number, [number, number]>;

  constructor() {
    this._valoresBase = new Map<number, [number, number]>([
      [280.0, [2100.0, 100.0]],
      [288.33, [2166.67, 116.65]],
      [296.66, [2233.34, 233.32]],
      [304.99, [2300.01, 349.99]],
      [313.32, [2366.68, 466.66]],
      [321.65, [2433.35, 583.33]],
      [329.98, [2500.02, 700.0]],
    ]);
  }
  
  private interpolarEnergia(temperatura: number, temperaturaInicial: number, energiaInicial: number, temperaturaFinal: number, energiaFinal: number ): number {
    return ( energiaInicial + ((temperatura - temperaturaInicial) * (energiaFinal - energiaInicial)) / (temperaturaFinal - temperaturaInicial));
  }

  public calcularEnergiaNeta(temperatura: number): number {
    if (temperatura < minTemperatuta) {
      return 0;
    } else if (temperatura >= temperaturaAlerta) {
      return 700;
    }

    const energia = this._valoresBase.get(temperatura);

    if (energia !== undefined) {
      return energia[1];
    } else {
      let temperaturaInicial = 0;
      let temperaturaFinal = 0;

      for (const tempKeys of this._valoresBase.keys()) {
        if (tempKeys < temperatura) {
          temperaturaInicial = tempKeys;
        } else {
          temperaturaFinal = tempKeys;
          break;
        }
      }

      const energiaInicial = this._valoresBase.get(temperaturaInicial)![1];
      const energiaFinal = this._valoresBase.get(temperaturaFinal)![1];

      const resultadoInterpolacion = this.interpolarEnergia(
        temperatura,
        temperaturaInicial,
        energiaInicial,
        temperaturaFinal,
        energiaFinal
      );
      return Math.round(resultadoInterpolacion * 100) / 100;
    }
  }
}
