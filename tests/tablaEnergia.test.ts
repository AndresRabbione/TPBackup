import { minTemperatuta, temperaturaAlerta } from "../src/constantes";
import TablaEnergia from "../src/tabla_energia/tablaEnergia";

describe('Test clase TablaEnergia', () => {
  let instance: TablaEnergia;

  beforeEach(() => {
    instance = new TablaEnergia();
  });

  describe('Debe verificar el constructor default', () => {
    expect(instance).toBeInstanceOf(TablaEnergia);
  })

  describe('Test de energia neta generada según la tabla de valores.', () => {
    //Dentro del rango normal.
    it("Verifica que la energia neta sea 100, si la temperatura es 280.", () => {
      const temperatura = 280;
      const energiaEsperada = 100.00;
      const resultado = instance.energiaNeta(temperatura);

      expect(resultado).toBe(energiaEsperada);
    });

    //Fuera del rango máximo.
    it("Verifica que la energia neta sea 700, si la temperatura es mayor a 329.98.", () => {
      const temperatura = 340.00;
      const energiaEsperada = 700.00;
      const resultado = instance.energiaNeta(temperatura);

      expect(resultado).toBe(energiaEsperada);
    });

    //Fuera del rango mínimo.
    it("Verifica que la energia neta sea 0 (cero), si la temperatura es menor a 280.00.", () => {
      const temperatura = 155.00;
      const energiaEsperada = 0;
      const resultado = instance.energiaNeta(temperatura);

      expect(resultado).toBe(energiaEsperada);
    });

    describe('Test interpolacion de energia', () => {
      it("Debe calcular la energia interpolada correctamente para una temperatura intermedia", () => {
        const temperaturaIntermedia = 285.55;
        const temperaturaInicial = 280.00;
        const energiaInicial = 100.00;
        const temperaturaFinal = 288.33;
        const energiaFinal = 116.65;

        const resultadoEsperado = energiaInicial + ((temperaturaIntermedia - temperaturaInicial) * (energiaFinal - energiaInicial)) / (temperaturaFinal - temperaturaInicial);
        const resultado = instance.energiaNeta(temperaturaIntermedia);

        expect(resultado).toBe(resultadoEsperado);
      });
      
    });

  });
  
}); 