import Duenio from "../src/duenio";
import EstadoReactor from "../src/estados/EstadoReactor";
import ReactorNuclear from "../src/reactor_nuclear/ReactorNuclear";
import Moderado from "../src/estados/Moderado";
import PlantaNuclear from "../src/plantaNuclear";

jest.mock("../src/plantaNuclear", () => ({
  getHorasOperadas: jest.fn(() => 3),
  getMinutosOperados: jest.fn(() => 1),
}));

describe("Método energiaProducida()", () => {
  let reactor: ReactorNuclear;
  let estadoInicial: EstadoReactor;
  let temperaturaMock: number;
  let duenio: Duenio;

  beforeEach(() => {
    duenio = new Duenio("Burns");
    estadoInicial = new Moderado();
    temperaturaMock = 330;
    reactor = new ReactorNuclear(estadoInicial, temperaturaMock, [], duenio);
  });

  it("debe calcular la energía producida correctamente basada en un intervalo de tiempo", () => {
    let tiempoAnteriorOperadoMock = 2;
    reactor["_tiempoAnteriorOperado"] = tiempoAnteriorOperadoMock;
    PlantaNuclear.getHorasOperadas();

    expect(require("../src/plantaNuclear").getHorasOperadas).toHaveBeenCalled();
    const energiaProducida = reactor.energiaProducida();

    let energiaBaseMock = 700.0;
    let energiaEsperada =
      energiaBaseMock *
      (PlantaNuclear.getHorasOperadas() - tiempoAnteriorOperadoMock) *
      reactor.getCapacidad();
    expect(energiaProducida).toBe(energiaEsperada);
  });
});
