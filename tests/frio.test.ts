import {
  cambioTemperaturaPorMinuto,
  maxTemperatura,
  minTemperatuta,
  temperaturaAlerta,
} from "../src/constantes";
import Operador from "../src/operador";
import ReactorNuclear from "../src/reactor_nuclear/ReactorNuclear";
import Critico from "../src/estados/Critico";
import EstadoReactor from "../src/estados/EstadoReactor";
import Moderado from "../src/estados/Moderado";
import Normal from "../src/estados/Normal";
import Frio from "../src/estados/frio";
import Duenio from "../src/duenio";
import Apagado from "../src/estados/Apagado";

describe("Frio", () => {
  let instance: EstadoReactor;
  let reactor: ReactorNuclear;
  let estadoInicial: EstadoReactor;
  let operador: Operador;
  let duenio: Duenio;

  beforeEach(() => {
    duenio = new Duenio("Burns");
    operador = new Operador("Homero", duenio);
    instance = new Frio();
    estadoInicial = new Apagado();
    reactor = new ReactorNuclear(estadoInicial, 0, []);
    reactor.cambiarEstado(estadoInicial);
  });

  it("deberia ser una instancia de Frio", () => {
    expect(instance instanceof Frio).toBeTruthy();
  });

  it("deberia actualizar el estado del reactor a la instancia", () => {
    reactor.cambiarEstado(instance);
    expect(reactor.getEstado() instanceof Frio).toBeTruthy();
  });

  it("deberia tener una capacidad de 0", () => {
    expect(instance.getCapacidad()).toBe(0);
  });

  it("deberia devolver la energia multiplicada por la capacidad", () => {
    expect(instance.calcularEnergia(0)).toBe(0);
  });

  it("deberia pasar al estado correcto segun la temperatura del reactor", () => {
    reactor = new ReactorNuclear(estadoInicial, 290, []);
    reactor.cambiarEstado(estadoInicial);
    reactor.cambiarEstado(instance);
    instance.checkEstado();
    expect(reactor.getEstado() instanceof Normal).toBeTruthy();
  });

  it("deberia pasar al estado correcto segun la temperatura del reactor", () => {
    reactor = new ReactorNuclear(estadoInicial, 350, []);
    reactor.cambiarEstado(estadoInicial);
    reactor.cambiarEstado(instance);
    instance.checkEstado();
    expect(reactor.getEstado() instanceof Moderado).toBeTruthy();
  });

  it("deberia pasar al estado correcto segun la temperatura del reactor", () => {
    reactor = new ReactorNuclear(estadoInicial, 410, []);
    reactor.cambiarEstado(estadoInicial);
    reactor.cambiarEstado(instance);
    instance.checkEstado();
    expect(reactor.getEstado() instanceof Critico).toBeTruthy();
  });

  it("deberia devolver 0 porque no debe hacer nada sobre la situacion", () => {
    reactor.cambiarEstado(instance);
    expect(instance.manejarSituacion(operador)).toBe(0);
  });

  it("deberia devolver el cambio de temperatura por minuto en este estado", () => {
    expect(instance.cambioTemperatura()).toBe(0.5);
  });
});
