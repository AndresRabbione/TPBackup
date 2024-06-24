import Operador from "../src/operador";
import Duenio from "../src/duenio";
import ReactorNuclear from "../src/reactor_nuclear/ReactorNuclear";
import PlantaNuclear from "../src/plantaNuclear";
import EstadoReactor from "../src/estados/EstadoReactor";
import Apagado from "../src/estados/Apagado";
import Moderado from "../src/estados/Moderado";
import GestorDeOperadores from "../src/gestorDeOperadores";
import BarraDeControl from "../src/barraDeControl";
import Frio from "../src/estados/frio";
import Normal from "../src/estados/Normal";

jest.useFakeTimers();
jest.spyOn(global, "setTimeout");

describe("PlantaNuclear", () => {
  let instance: PlantaNuclear;
  let reactor_nuclear: ReactorNuclear;
  let estadoInicial: EstadoReactor;
  let operador1: Operador;
  let operador2: Operador;
  let duenio: Duenio;
  let barra1: BarraDeControl;
  let barra2: BarraDeControl;

  beforeEach(() => {
    duenio = new Duenio([operador1, operador2]);
    operador1 = new Operador("Homero", duenio);
    operador2 = new Operador("Jorge", duenio);
    estadoInicial = new Apagado(reactor_nuclear);
    barra1 = new BarraDeControl(150);
    barra2 = new BarraDeControl(200);
    reactor_nuclear = new ReactorNuclear(estadoInicial, 310, [barra1, barra2]);
    reactor_nuclear.cambiarEstado(estadoInicial);
    reactor_nuclear.encenderReactor(new Moderado(reactor_nuclear));
    instance = new PlantaNuclear(
      reactor_nuclear,
      [operador1, operador2],
      duenio
    );
  });

  it("deberia ser una instancia de PlantaNuclear", () => {
    expect(instance instanceof PlantaNuclear).toBeTruthy();
  });

  it("deberia tener un return code de 0 ya que logra finalizar la simulacion despues de la primera hora", () => {
    let horasReporte: number = 1;
    let limite: number = 1;
    expect(instance.iniciarSimulacion(horasReporte, limite)).toBe(0);
  });

  it("deberia tener un return code de 0 ya que logra finalizar la simulacion despues de la primera hora, esta prueba tambien pasa de Frio a Moderado", () => {
    reactor_nuclear = new ReactorNuclear(estadoInicial, 390, [barra1, barra2]);
    reactor_nuclear.cambiarEstado(estadoInicial);
    reactor_nuclear.encenderReactor(new Frio(reactor_nuclear));
    instance = new PlantaNuclear(
      reactor_nuclear,
      [operador1, operador2],
      duenio
    );
    let horasReporte: number = 1;
    let limite: number = 1;
    expect(instance.iniciarSimulacion(horasReporte, limite)).toBe(0);
  });

  it("deberia tener un return code de 0 ya que logra finalizar la simulacion despues de la primera hora, esta prueba tambien pasa de Frio a Critico", () => {
    reactor_nuclear = new ReactorNuclear(estadoInicial, 450, [barra1, barra2]);
    reactor_nuclear.cambiarEstado(estadoInicial);
    reactor_nuclear.encenderReactor(new Frio(reactor_nuclear));
    instance = new PlantaNuclear(
      reactor_nuclear,
      [operador1, operador2],
      duenio
    );
    let horasReporte: number = 1;
    let limite: number = 1;
    expect(instance.iniciarSimulacion(horasReporte, limite)).toBe(0);
  });

  it("deberia tener un return code de 0 ya que logra finalizar la simulacion despues de la primera hora, esta prueba tambien pasa de Normal a Critico", () => {
    reactor_nuclear = new ReactorNuclear(estadoInicial, 450, [barra1, barra2]);
    reactor_nuclear.cambiarEstado(estadoInicial);
    reactor_nuclear.encenderReactor(new Normal(reactor_nuclear));
    instance = new PlantaNuclear(
      reactor_nuclear,
      [operador1, operador2],
      duenio
    );
    let horasReporte: number = 1;
    let limite: number = 1;
    expect(instance.iniciarSimulacion(horasReporte, limite)).toBe(0);
  });

  it("deberia tener un return code de 1 ya que logra finalizar la simulacion despues de multiples horas", () => {
    let horasReporte: number = 1;
    expect(instance.iniciarSimulacion(horasReporte)).toBe(1);
  });

  it("deberia apagar el reactor y reportar los datos finales", () => {
    instance.finalizarSimulacion();
    expect(reactor_nuclear.getEstado() instanceof Apagado).toBeTruthy();
  });

  it("deberia devolver algo de tipo GestorDeOperadores", () => {
    expect(instance.getGestor() instanceof GestorDeOperadores).toBeTruthy();
  });
});
