import { Reporte } from "./reporte";

export default class ReporteTotal implements Reporte {
  private energiaTotal: number;
  private horasReporte: number;

  constructor(energia: number, horas: number) {
    this.energiaTotal = energia;
    this.horasReporte = horas;
  }

  public getDatos() {
    console.log(
      `Despues de ${this.horasReporte} hora(s) se genero ${this.energiaTotal} MWe`
    );
  }
}
