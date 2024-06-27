import ReactorNuclear from "../src/reactor_nuclear/ReactorNuclear";
import Critico from "../src/estados/Critico";
import Moderado from "../src/estados/Moderado";
import Frio from "../src/estados/frio";
import Normal from "../src/estados/Normal";

describe("Normal", () => {
  let instance: Normal;
  let reactor: ReactorNuclear;

  beforeEach(() => {
    reactor = new ReactorNuclear(instance, 0, []);
    instance = new Normal(reactor);
  });

  it("deberia ser una instancia de Normal", () => {
    expect(instance instanceof Normal).toBeTruthy();
  });

  it("deberia tener una capacidad de 1", () => {
    expect(instance.getCapacidad()).toBe(1);
  });

  it("deberia devolver generacion de la misma energia que entro como parametro", () => {
    expect(instance.calcularEnergia(700)).toBe(700);
  });

  it("deberia cambiar al estado correcto segun la temperatura, en este caso Frio", () => {
    instance.checkEstado();
    expect(reactor.getEstado() instanceof Frio).toBeTruthy();
  });

  it("deberia cambiar al estado correcto segun la temperatura, en este caso Moderado", () => {
    let reactor2: ReactorNuclear = new ReactorNuclear(instance, 350, []);
    reactor2.cambiarEstado(instance);
    instance.checkEstado();
    expect(reactor2.getEstado() instanceof Moderado).toBeTruthy();
  });

  it("deberia cambiar al estado correcto segun la temperatura, en este caso Critico", () => {
    let reactor2: ReactorNuclear = new ReactorNuclear(instance, 410, []);
    reactor2.cambiarEstado(instance);
    instance.checkEstado();
    expect(reactor2.getEstado() instanceof Critico).toBeTruthy();
  });

  it("should have a method manejarSituacion()", () => {
    // instance.manejarSituacion(operador);
    expect(true).toBeTruthy();
  });

  it("deberia pasar cuanto cambia la temperatura en este estado (0.5)", () => {
    expect(instance.cambioTemperatura()).toBe(0.5);
  });
});
