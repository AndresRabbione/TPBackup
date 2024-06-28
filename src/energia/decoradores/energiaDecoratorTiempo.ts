import PlantaNuclear from "../../plantaNuclear";
import EnergiaBase from "../energiaBase";
import EnergiaDecorator from "./energiaDecorator";

export default class EnergiaDecoratorTiempo extends EnergiaDecorator {
  constructor(energia: EnergiaBase) {
    super(energia);
  }

  public calcularEnergiaNeta(temperatura: number): number {
    const energiaPorHora = this._energia.calcularEnergiaNeta(temperatura);
    const energiaPorMinuto = energiaPorHora / 60;
    return energiaPorMinuto * PlantaNuclear.getMinutosOperados();
  }
}
