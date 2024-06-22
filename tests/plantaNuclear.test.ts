import Operador from "../src/operador";
import Duenio from "../src/duenio";
import { horasLimite } from "../src/constantes";
import ReactorNuclear from "../src/reactor_nuclear/ReactorNuclear";
import PlantaNuclear from "../src/plantaNuclear";
import EstadoReactor from "../src/estados/EstadoReactor";
import Apagado from "../src/estados/Apagado";

jest.useFakeTimers();
jest.spyOn(global, "setTimeout");

describe("PlantaNuclear", () => {
  let instance: PlantaNuclear;
  let reactor_nuclear: ReactorNuclear;
  let estadoInicial: EstadoReactor;
  let operador1: Operador;
  let duenio: Duenio;

  beforeEach(() => {
    duenio = new Duenio(operador1);
    operador1 = new Operador("Homero", undefined, duenio);
    estadoInicial = new Apagado(reactor_nuclear);
    reactor_nuclear = new ReactorNuclear(estadoInicial, 350, []);
    reactor_nuclear.cambiarEstado(estadoInicial);
    instance = new PlantaNuclear(reactor_nuclear, operador1, duenio);
    reactor_nuclear.getSensor().suscribir(operador1);
  });

  it("deberia ser una instancia de PlantaNuclear", () => {
    expect(instance instanceof PlantaNuclear).toBeTruthy();
  });

  it("deberia tener un return code de 0 ya que logra finalizar la simulacion", () => {
    let horasReporte: number = 1;
    let limite: number = 1;
    expect(instance.iniciarSimulacion(horasReporte, limite)).toBe(0);
  });

  it("should have a method finalizarSimulacion()", () => {
    instance.finalizarSimulacion();
    expect(reactor_nuclear.getEstado() instanceof Apagado).toBeTruthy();
  });
});
