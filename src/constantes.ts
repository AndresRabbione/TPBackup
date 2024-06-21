export const maxTemperatura: number = 400;
export const temperaturaAlerta: number = 330;
export const capacidadMaxReactor: number = 700;
export const minTemperatuta: number = 280;
export const cambioTemperaturaPorMinuto: number = 0.5;
export const cambioTemperaturaPorHora: number = 30;
export const temperaturaOptima = temperaturaAlerta - cambioTemperaturaPorHora;
export const horasLimite = 20;
export const tablaTemperatura: number[] = [
  280, 288.33, 296.66, 304.99, 313.32, 321.65, 329.98,
];
export const tablaEnergiaTermal: number[] = [
  2100, 2166.67, 2233.34, 2300.01, 2366.68, 2433.35, 2500.02,
];
export const tablaEnergiaNeta: number[] = [
  100, 116.65, 233.32, 349.99, 466.66, 583.33, 700,
];
