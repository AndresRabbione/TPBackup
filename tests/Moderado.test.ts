import Operador from "../src/operador";
import ReactorNuclear from "../src/reactor_nuclear/ReactorNuclear";
import EstadoReactor from "../src/estados/EstadoReactor";
import Frio from "../src/estados/frio";
import Moderado from "../src/estados/Moderado";
import Duenio from "../src/duenio";
import Apagado from "../src/estados/Apagado";

describe("Moderado", () => {
  let instance: EstadoReactor;
  let reactor: ReactorNuclear;
  let estadoInicial: EstadoReactor;
  let operador: Operador;
  let duenio: Duenio;

  beforeEach(() => {
    duenio = new Duenio();
    operador = new Operador("Homero", duenio);
    duenio.setOperadores([operador]);
    instance = new Moderado();
    estadoInicial = new Apagado();
    reactor = new ReactorNuclear(estadoInicial, 0, []);
    reactor.cambiarEstado(estadoInicial);
  });

  it("deberia ser una instancia de Moderado", () => {
    expect(instance instanceof Moderado).toBeTruthy();
  });

  it("deberia actualizar el estado del reactor a la instancia", () => {
    reactor.cambiarEstado(instance);
    expect(reactor.getEstado() instanceof Moderado).toBeTruthy();
  });

  it("deberia tener una capacidad de 0.2", () => {
    reactor.cambiarEstado(instance);
    expect(instance.getCapacidad()).toBe(0.2);
  });

  it("deberia devolver la energia multiplicada por la capacidad", () => {
    reactor.cambiarEstado(instance);
    expect(instance.calcularEnergia(700)).toBe(140);
  });

  it("deberia pasar al estado correcto segun la temperatura del reactor", () => {
    reactor.cambiarEstado(instance);
    instance.checkEstado();
    expect(reactor.getEstado() instanceof Frio).toBeTruthy();
  });

  it("deberia intentar insertar barras si hay", () => {
    reactor.cambiarEstado(instance);
    instance.manejarSituacion(operador);
    expect(reactor.getTemperatura()).toBe(0);
  });

  it("deberia devolver el cambio de temperatura por minuto en este estado", () => {
    expect(instance.cambioTemperatura()).toBe(0.5);
  });
});
