import { Reporte } from "../src/reportes/reporte";
import ReporteEstados from "../src/reportes/reporteEstados";

describe("ReporteEstados", () => {
  let instance: ReporteEstados;

  beforeEach(() => {
    let map: Map<String, number> = new Map();
    const estados: String[] = ["apagado", "normal", "critico"];
    estados.forEach((estado) => map.set(estado, 0));
    instance = new ReporteEstados(map);
  });

  it("debreia ser una instancia de ReporteEstados", () => {
    expect(instance instanceof ReporteEstados).toBeTruthy();
  });

  it("debreia ser una instancia de ReporteEstados", () => {
    instance.getDatos();
    expect(instance instanceof ReporteEstados).toBeTruthy();
  });
});
