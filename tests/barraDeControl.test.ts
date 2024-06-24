import BarraDeControl from "../src/barraDeControl";

describe("BarraDeControl", () => {
  let instance: BarraDeControl;

  beforeEach(() => {
    instance = new BarraDeControl(100);
  });

  it("instance deberia ser una instancia de BarraDeControl", () => {
    expect(instance instanceof BarraDeControl).toBeTruthy();
  });

  it("deberia bajar el tiempo de vida util de la barra por la cantidad pasada", () => {
    instance.bajarTiempoDeVida(50);
    expect(instance.tiempoDeVidaUtil).toBe(50);
  });

  it("deberia devolver un valor decimal, representante de un porcentaje, segun la formula", () => {
    expect(instance.calcularPorcentaje()).toBe(100 / 3600);
  });
});
