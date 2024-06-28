import BarraDeControl from "../src/barraDeControl";
import Duenio from "../src/duenio";
import EstadoReactor from "../src/estados/EstadoReactor";
import ReactorNuclear from "../src/reactor_nuclear/ReactorNuclear";
import Operador from "../src/operador";
import Apagado from "../src/estados/Apagado";

describe("Operador", () => {
  let instance: Operador;
  let duenio: Duenio;
  let reactor: ReactorNuclear;
  let estadoInicial: EstadoReactor;
  let barra1: BarraDeControl;
  let barra2: BarraDeControl;

  beforeEach(() => {
    duenio = new Duenio("Burns");
    instance = new Operador("Homero", duenio);
    estadoInicial = new Apagado();
    let barra1 = new BarraDeControl(150);
    let barra2 = new BarraDeControl(50);
    reactor = new ReactorNuclear(estadoInicial, 330, [barra1, barra2], duenio);
    reactor.cambiarEstado(estadoInicial);
  });

  it("deberia devolver el nombre del operador", () => {
    expect(instance.nombre).toBe("Homero");
  });

  it("deberia cambiar el nombre del operador a otro", () => {
    instance.nombre = "Jorge";
    expect(instance.nombre).toBe("Jorge");
  });

  it("deberia ser una instancia de Operador", () => {
    expect(instance instanceof Operador).toBeTruthy();
  });

  it("deberia bajar la temperatura del reactor por una cantidad correspondiente a las barras disponibles", () => {
    instance.insertarBarras(reactor);
    expect(reactor.getTemperatura()).toBe(311.8576388888889);
  });

  it("deberia bajar la temperatura del reactor por una cantidad correspondiente a las barras disponibles", () => {
    reactor.setBarras([]);
    instance.insertarBarras(reactor);
    expect(reactor.getTemperatura()).toBe(330);
  });

  it("deberia devolver 1 porque recibio una alerta y la manejo", () => {
    expect(instance.recibirAlerta(reactor.getEstado(), false)).toBe(1);
  });

  it("deberia devolver 0 porque recibio una alerta ya manejada", () => {
    expect(instance.recibirAlerta(reactor.getEstado(), true)).toBe(0);
  });

  it("deberia devolver 1 porque el duenio recibio la alerta correctamente", () => {
    expect(instance.notificarDuenio(reactor.getEstado())).toBe(1);
  });
});
