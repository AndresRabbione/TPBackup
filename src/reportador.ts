export default class Reportador {
  private _energiaTotal: number;
  private _acumuladorEstados: Map<String, number>;

  constructor() {
    this._energiaTotal = 0;
    this._acumuladorEstados = new Map();
    this.inicializarContadorDeEventos();
  }

  private inicializarContadorDeEventos(): void {
    const estados: String[] = ["apagado", "normal", "critico"];
    estados.forEach((estado) => this._acumuladorEstados.set(estado, 0));
  }

  public recibirReporteRegular(temperatura: number, energia: number): number[] {
    this._energiaTotal += energia;

    console.log(
      `Temperatura actual: ${temperatura}  Energia producida: ${energia}`
    );

    return [temperatura, energia];
  }

  public recibirReporteBarras(barras: number): number {
    console.log(`Barras insertadas: ${barras}`);
    if (barras == 0) {
      console.log(
        `AVISO: No se insertaron barras, es recomendado apagar el reactor y reeemplazar las barras usadas.`
      );
    }

    return barras;
  }

  public recibirReporteTotal(horasReporte: number): number {
    console.log(
      `Despues de ${horasReporte} hora(s) se genero ${this._energiaTotal} MWe`
    );

    return this._energiaTotal;
  }

  public recibirReporteEstado(estado: String) {
    if (this._acumuladorEstados.has(estado)) {
      let contadorActual = this._acumuladorEstados.get(estado) || 0;
      contadorActual++;
      this._acumuladorEstados.set(estado, contadorActual);
    }

    return this._acumuladorEstados.get(estado);
  }
}
