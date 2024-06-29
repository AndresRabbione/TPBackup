import { Reporte } from "../src/reportes/reporte";
import ReporteTotal from "../src/reportes/reporteTotal";

describe("ReporteTotal", () => {
  let instance: ReporteTotal;

  beforeEach(() => {
    instance = new ReporteTotal(1400, 2);
  });

  it("deberia ser una instancia de ReporteTotal", () => {
    expect(instance instanceof ReporteTotal).toBeTruthy();
  });

  it("deberia ser una instancia de ReporteTotal", () => {
    instance.getDatos();
    expect(instance instanceof ReporteTotal).toBeTruthy();
  });
});
