import Reportador from "../src/reportador";
import { Reporte } from "../src/reportes/reporte";
import Duenio from "../src/duenio";

jest.mock("../src/duenio");

describe("Test clase Reportador", () => {
  let reportador: Reportador;
  let mockDuenio: jest.Mocked<Duenio>;

  beforeEach(() => {
    mockDuenio = new Duenio("Burns") as jest.Mocked<Duenio>;
    reportador = new Reportador(mockDuenio);
  });
  
  it("debe ser una instancia de Reportador", () => {
    expect(reportador instanceof Reportador).toBeTruthy();
  });

 it("debe inicializar la energia total y el acumulador de estados", () => {
      expect(reportador.getEnergiaTotal()).toBe(0);
      expect(reportador.getAcumuladorEstados().size).toBe(3);
      expect(reportador.getAcumuladorEstados().get("apagado")).toBe(0);
      expect(reportador.getAcumuladorEstados().get("normal")).toBe(0);
      expect(reportador.getAcumuladorEstados().get("critico")).toBe(0);
  });
  
  it("debe guardar la energia total", () => {
    let mockTemperatura = 329;
    let mockEnergia = 700;
    let energiaEsperada = 700;

    reportador.recibirReporteRegular(mockTemperatura, mockEnergia);
    expect(reportador.getEnergiaTotal()).toBe(energiaEsperada);
  });
  
  it("debe guardar cuántas veces estuvo en el estado pasado", () => {
    expect(reportador.recibirReporteEstado("apagado")).toBe(1);
  });

  it('debe enviar el reporte al dueño', () => {
    const mockReporte: Reporte = {
      getDatos: jest.fn()
    };

    reportador.enviarReporte(mockReporte);
    expect(mockDuenio.recibirReporte).toHaveBeenCalledWith(mockReporte);
  });

}); 
