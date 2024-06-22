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

  public recibirReporteRegular(temperatura: number, energia: number): void {
    this._energiaTotal += energia;

    console.log(
      `Temperatura actual: ${temperatura}  Energia producida: ${energia}`
    );
  }

  public recibirReporteBarras(barras: number) {
    console.log(`Barras insertadas: ${barras}`);
    if (barras == 0) {
      console.log(
        `AVISO: No se insertaron barras, es recomendado apagar el reactor y reeemplazar las barras usadas.`
      );
    }
  }

  public recibirReporteTotal(horasReporte: number) {
    console.log(
      `Despues de ${horasReporte} se genero ${this._energiaTotal} MWe`
    );
  }

  public recibirReporteEstado(estado: String) {
    if (this._acumuladorEstados.has(estado)) {
      let contadorActual = this._acumuladorEstados.get(estado) || 0;
      contadorActual++;
      this._acumuladorEstados.set(estado, contadorActual);
    }
  }
}
