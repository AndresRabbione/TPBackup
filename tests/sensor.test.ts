import Duenio from "../src/duenio";
import Apagado from "../src/estados/Apagado";
import Critico from "../src/estados/Critico";
import EstadoReactor from "../src/estados/EstadoReactor";
import GestorDeOperadores from "../src/gestorDeOperadores";
import { Notificable } from "../src/notificable";
import Operador from "../src/operador";
import ReactorNuclear from "../src/reactor_nuclear/ReactorNuclear";
import Sensor from "../src/sensor";

describe("Sensor", () => {
  let instance: Sensor;
  let gestor: GestorDeOperadores;
  let operador1: Operador;
  let operador2: Operador;
  let duenio: Duenio;
  let estado: EstadoReactor;
  let reactor: ReactorNuclear;

  beforeEach(() => {
    duenio = new Duenio("Burns");
    operador1 = new Operador("Homero", duenio);
    operador2 = new Operador("Bart", duenio);
    gestor = new GestorDeOperadores([operador1, operador2]);
    instance = new Sensor();
    estado = new Critico();
    reactor = new ReactorNuclear(estado, 400, []);
  });

  it("deberia ser una instancia de Sensor", () => {
    expect(instance instanceof Sensor).toBeTruthy();
  });

  it("deberia notificar a uno de los operadores y este deberia manejar la situacion", () => {
    instance.suscribir(gestor);

    reactor.cambiarEstado(estado);
    instance.notificar(estado);
    expect(reactor.getEstado() instanceof Apagado).toBeTruthy();
  });

  it("deberia asignar al gestor como observer", () => {
    instance.suscribir(gestor);
    expect(instance.getGestor()).toBe(gestor);
  });

  it("deberia iniciar la cadena para manejar la situacion", () => {
    instance.suscribir(gestor);
    reactor.cambiarEstado(estado);
    instance.actualizarTemperatura(reactor);
    expect(reactor.getEstado() instanceof Apagado).toBeTruthy();
  });
});
