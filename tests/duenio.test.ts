import EstadoReactor from "../src/estados/EstadoReactor";
import { Notificable } from "../src/notificable";
import Operador from "../src/operador";
import Duenio from "../src/duenio";
import Apagado from "../src/estados/Apagado";
import ReactorNuclear from "../src/reactor_nuclear/ReactorNuclear";

describe("Duenio", () => {
  let instance: Duenio;

  beforeEach(() => {
    instance = new Duenio("Burns");
  });

  it("deberia ser una instancia de Duenio", () => {
    expect(instance instanceof Duenio).toBeTruthy();
  });

  it("deberia devolver 1 porque recibio la alerta correctamente", () => {
    let estado: EstadoReactor = new Apagado();
    let reactor: ReactorNuclear = new ReactorNuclear(estado, 0, [], instance);
    reactor.cambiarEstado(estado);
    expect(instance.recibirAlerta(estado, true)).toBe(1);
  });
});
