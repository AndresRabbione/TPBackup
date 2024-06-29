import Operador from "../operador";
import ReactorNuclear from "../reactor_nuclear/ReactorNuclear";

export default interface EstadoReactor {
  actualizarEstadoReactor(reactor: ReactorNuclear): void;
  getCapacidad(): number;
  calcularEnergia(energiaProducida: number): number;
  checkEstado(): void;
  manejarSituacion(operador: Operador): number;
  cambioTemperatura(): number;
}
