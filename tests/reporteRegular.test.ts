import { Reporte } from "../src/reportes/reporte";
import ReporteRegular from "../src/reportes/reporteRegular";

describe("ReporteRegular", () => {
  let instance: ReporteRegular;

  beforeEach(() => {
    instance = new ReporteRegular(329.98, 700);
  });

  it("deberia ser una instancia de ReporteRegular", () => {
    expect(instance instanceof ReporteRegular).toBeTruthy();
  });

  it("deberia ser una instancia de ReporteRegular", () => {
    instance.getDatos();
    expect(instance instanceof ReporteRegular).toBeTruthy();
  });
});
