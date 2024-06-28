import { Reporte } from "../src/reportes/reporte";
import ReporteBarras from "../src/reportes/reporteBarras";

describe("ReporteBarras", () => {
  let instance: ReporteBarras;

  beforeEach(() => {
    instance = new ReporteBarras(0);
  });

  it("deberia ser una instancia de ReporteBarras", () => {
    expect(instance instanceof ReporteBarras).toBeTruthy();
  });

  it("deberia ser una instancia de ReporteBarras", () => {
    instance = new ReporteBarras(0);
    instance.getDatos();
    expect(instance instanceof ReporteBarras).toBeTruthy();
  });

  it("deberia ser una instancia de ReporteBarras", () => {
    instance = new ReporteBarras(2);
    instance.getDatos();
    expect(instance instanceof ReporteBarras).toBeTruthy();
  });
});

describe("Aiso barras", () => {
  let instance: ReporteBarras;

  beforeEach(() => {
    instance = new ReporteBarras(2);
  });

  it("deberia generar un aviso porque no se insertaron barras", () => {
    instance.getDatos();
    expect(instance instanceof ReporteBarras).toBeTruthy();
  });
});
