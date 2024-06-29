import { Reporte } from "./reporte";

export default class ReporteRegular implements Reporte {
  private temperatura: number;
  private energia: number;

  constructor(temperatura: number, energia: number) {
    this.energia = energia;
    this.temperatura = temperatura;
  }
  public getDatos(): void {
    console.log(
      `Temperatura actual: ${this.temperatura}  Energia producida: ${this.energia}`
    );
  }
}
