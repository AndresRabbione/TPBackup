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

  it("deberia guardar la energia total", () => {
    instance.recibirReporteRegular(329, 700);
    expect(instance.getEnergiaTotal()).toBe(700);
  });

  it("deberia guardar cunatas veces estuvo en el estado pasado", () => {
    expect(instance.recibirReporteEstado("apagado")).toBe(1);
  });
});
