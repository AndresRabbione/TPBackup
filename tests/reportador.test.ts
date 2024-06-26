import Reportador from "../src/reportador";
import EstadoReactor from "../src/estados/EstadoReactor";
import Apagado from "../src/estados/Apagado";

describe("Reportador", () => {
  let instance: Reportador;

  beforeEach(() => {
    instance = new Reportador();
  });

  it("deberia ser una instancia de Reportador", () => {
    expect(instance instanceof Reportador).toBeTruthy();
  });

  it("deberia informar los la temperatura y energia y devolverlas mediante el return para pasarlas a otro lugar", () => {
    expect(instance.recibirReporteRegular(329, 700)[0]).toBe(329);
    expect(instance.recibirReporteRegular(329, 700)[1]).toBe(700);
  });

  it("deberia informar la cantidad de barras usadas y devolverla mediante el return para pasarla a otro lugar", () => {
    expect(instance.recibirReporteBarras(2)).toBe(2);
  });

  it("deberia informar la energia total generada y devolverla mediante el return para pasarla a otro lugar", () => {
    expect(instance.recibirReporteTotal(1)).toBe(0);
  });

  it("deberia informar la cantidad de veces que estuvo en el estado y devolverla mediante el return para pasarla a otro lugar", () => {
    expect(instance.recibirReporteEstado("apagado")).toBe(1);
  });
});
