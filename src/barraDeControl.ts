export default class BarraDeControl {
  private _tiempoDeVidaUtil: number;

  constructor(tiempoDeVida: number) {
    this._tiempoDeVidaUtil = tiempoDeVida;
  }

  public get tiempoDeVidaUtil(): number {
    return this._tiempoDeVidaUtil;
  }

  private setTiempoDeVida(tiempoDeVida: number) {
    this._tiempoDeVidaUtil = tiempoDeVida;
  }

  public calcularPorcentaje(): number {
    return (this._tiempoDeVidaUtil / 3600) * 100;
  }
}
