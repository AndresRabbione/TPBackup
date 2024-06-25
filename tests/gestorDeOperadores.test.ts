import EstadoReactor from "../src/estados/EstadoReactor";
import Operador from "../src/operador";
import GestorDeOperadores from "../src/gestorDeOperadores";
import Duenio from "../src/duenio";
import Critico from "../src/estados/Critico";
import ReactorNuclear from "../src/reactor_nuclear/ReactorNuclear";
import Apagado from "../src/estados/Apagado";

describe("GestorDeOperadores", () => {
  let instance: GestorDeOperadores;
  let operador1: Operador;
  let operador2: Operador;
  let duenio: Duenio;
  let estadoReactor: EstadoReactor;
  let reactor: ReactorNuclear;

  beforeEach(() => {
    duenio = new Duenio();
    operador1 = new Operador("Homero", duenio);
    operador2 = new Operador("Jorge", duenio);
    duenio.setOperadores([operador1, operador2]);
    instance = new GestorDeOperadores([operador1, operador2]);
  });

  it("deberia ser una instancia de GestorDeOperadores", () => {
    expect(instance instanceof GestorDeOperadores).toBeTruthy();
  });

  it("deberia llegar la alerta a un operador que deberia manejar la situacion", () => {
    estadoReactor = new Critico();
    reactor = new ReactorNuclear(estadoReactor, 400, []);
    reactor.cambiarEstado(estadoReactor);

    instance.notificarOperadores(estadoReactor);
    expect(reactor.getEstado() instanceof Apagado).toBeTruthy();
  });

  it("debria poder agregar un operador", () => {
    let operador3: Operador = new Operador("Mario", duenio);
    instance.agregarOperador(operador3);
    expect(instance.getOperadores().includes(operador3)).toBeTruthy();
  });

  it("deberia sacar al operador pasado de el array de operadores existentes", () => {
    instance.sacarOperador(operador2);
    expect(instance.getOperadores().includes(operador2)).toBeFalsy();
  });
});
