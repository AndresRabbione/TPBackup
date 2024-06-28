import Reportador from "../src/reportador";
import EstadoReactor from "../src/estados/EstadoReactor";
import Apagado from "../src/estados/Apagado";
import Duenio from "../src/duenio";

describe("Reportador", () => {
  let instance: Reportador;
  let duenio: Duenio;

  beforeEach(() => {
    instance = new Reportador(duenio);
  });

  it("deberia ser una instancia de Reportador", () => {
    expect(instance instanceof Reportador).toBeTruthy();
  });

  it("deberia informar los la temperatura y energia y devolverlas mediante el return para pasarlas a otro lugar", () => {
    instance.recibirReporteRegular(329, 700);
    expect(instance.getEnergiaTotal()).toBe(700);
  });

  it("deberia informar la cantidad de veces que estuvo en el estado y devolverla mediante el return para pasarla a otro lugar", () => {
    expect(instance.recibirReporteEstado("apagado")).toBe(1);
  });
});
