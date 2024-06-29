import { Reporte } from "./reporte";

export default class ReporteEstados implements Reporte {
  private contadorEstados: Map<String, number>;

  constructor(contadorEstados: Map<String, number>) {
    this.contadorEstados = contadorEstados;
  }

  public getDatos(): void {
    for (const key of this.contadorEstados.keys()) {
      console.log(`${key.toUpperCase()}: ${this.contadorEstados.get(key)}`);
    }
  }
}
