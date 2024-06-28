import { Reporte } from "./reporte";

export default class ReporteBarras implements Reporte {
  private cantBarras: number;

  constructor(cantBarras: number) {
    this.cantBarras = cantBarras;
  }

  public getDatos(): void {
    console.log(`Barras insertadas: ${this.cantBarras}`);
    if (this.cantBarras == 0) {
      console.log(
        `AVISO: No se insertaron barras, es recomendado apagar el reactor y reeemplazar las barras usadas.`
      );
    }
  }
}
