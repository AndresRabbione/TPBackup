import BarraDeControl from "../src/barraDeControl";

describe("BarraDeControl", () => {
  let instance: BarraDeControl;

  beforeEach(() => {
    instance = new BarraDeControl(100);
  });

  it("instance deberia ser una instancia de BarraDeControl", () => {
    expect(instance instanceof BarraDeControl).toBeTruthy();
  });

  it("should have a method bajarTiempoDeVida()", () => {
    instance.bajarTiempoDeVida(50);
    expect(instance.tiempoDeVidaUtil).toBe(50);
  });

  it("should have a method calcularPorcentaje()", () => {
    expect(instance.calcularPorcentaje()).toBe(100 / 3600);
  });
});
