import BarraDeControl from "../src/barraDeControl";
import Duenio from "../src/duenio";
import Apagado from "../src/estados/Apagado";
import EstadoReactor from "../src/estados/EstadoReactor";
import GestorDeOperadores from "../src/gestorDeOperadores";
import { Notificable } from "../src/notificable";
import Reportador from "../src/reportador";
import Sensor from "../src/sensor";
import TablaEnergia from "../src/tablaEnergia";
import ReactorNuclear from "../src/reactor_nuclear/ReactorNuclear";
import Operador from "../src/operador";
import Frio from "../src/estados/frio";
import Moderado from "../src/estados/Moderado";
import PlantaNuclear from "../src/plantaNuclear";

describe("ReactorNuclear", () => {
  let instance: ReactorNuclear;
  let estadoInicial: EstadoReactor;
  let operador1: Operador;
  let operador2: Operador;
  let duenio: Duenio;
  let barra1: BarraDeControl;
  let barra2: BarraDeControl;
  let planta: PlantaNuclear;

  beforeEach(() => {
    estadoInicial = new Apagado();
    barra1 = new BarraDeControl(200);
    barra2 = new BarraDeControl(200);
    duenio = new Duenio("Burns");
    operador1 = new Operador("Homero", duenio);
    operador2 = new Operador("Bart", duenio);
    instance = new ReactorNuclear(estadoInicial, 0, [barra1, barra2], duenio);
    instance.cambiarEstado(estadoInicial);
    planta = new PlantaNuclear(instance, [operador1, operador2], duenio);
  });

  it("deberia ser una instancia de ReactorNuclear", () => {
    expect(instance instanceof ReactorNuclear).toBeTruthy();
  });

  it("deberia cambiar el estado del reactor al estado pasado", () => {
    let estado: EstadoReactor = new Frio();
    instance.encenderReactor(estado);
    expect(instance.getEstado() instanceof Frio).toBeTruthy();
  });

  it("deberia apagar al reactor", () => {
    instance.apagarReactor();
    expect(instance.getEstado() instanceof Apagado).toBeTruthy();
  });

  it("deberia cambiar el estado del reactor al estado pasado", () => {
    let nuevoEstado: EstadoReactor = new Moderado();
    instance.cambiarEstado(nuevoEstado);
    expect(instance.getEstado() instanceof Moderado).toBeTruthy();
  });

  it("deberia devolver al sensor del reactor", () => {
    expect(instance.getSensor() instanceof Sensor).toBeTruthy();
  });

  it("deberia devolver el estado actual", () => {
    expect(instance.getEstado() instanceof Apagado).toBeTruthy();
  });

  it("deberia devolver la temperatura actual", () => {
    expect(instance.getTemperatura()).toBe(0);
  });

  it("deberia cambiar la temperatura a la pasada", () => {
    let temperatura: number = 100;
    instance.setTemperatura(temperatura);
    expect(instance.getTemperatura()).toBe(100);
  });

  it("deberia devolver el reportador", () => {
    expect(instance.getReportador() instanceof Reportador).toBeTruthy();
  });

  it("deberia devolver las barras de control", () => {
    expect(instance.getBarras()).toStrictEqual([barra1, barra2]);
  });

  it("deberia cambiar las barras al array pasado", () => {
    let barras: BarraDeControl[] = [];
    instance.setBarras(barras);
    expect(instance.getBarras()).toStrictEqual([]);
  });

  it("debe retornar la capacidad del estado actual correctamente", () => {
    let capacidadEsperada = 0;
    expect(instance.getCapacidad()).toBe(capacidadEsperada);
  });

  it("deberia devolver la energia neta generada segun la temperatura y el estado", () => {
    expect(instance.energiaProducida()).toBe(0);
  });

  it("deberia aumentar/disminuir la temperatura segun el estado", () => {
    instance.cambiarTemperatura(1);
    expect(instance.getTemperatura()).toBe(-0.5);
  });
});
