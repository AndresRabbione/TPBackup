import EnergiaBase from "../src/energia/energiaBase";
import EnergiaDecoratorCapacidad from "../src/energia/decoradores/energiaDecoratorCapacidad";
import EnergiaCapacidadDecorator from "../src/energia/decoradores/energiaDecoratorCapacidad";

class MockEnergiaBase implements EnergiaBase {
    calcularEnergiaNeta(temperatura: number): number {
        return temperatura * 1;
    }
}

describe('Test clase EnergiaDecoratorCapacidad()', () => {
    it('debe calcular la energía neta multiplicada por la capacidad', () => {
        const temperatura = 280;
        const capacidad = 0.2;
        const energiaBase = new MockEnergiaBase();

        const energiaDecorator = new EnergiaCapacidadDecorator(energiaBase, capacidad);
        const resultado = energiaDecorator.calcularEnergiaNeta(temperatura);
        const resultadoEsperado = 280 * 0.2;
        expect(resultado).toBe(resultadoEsperado);
    });
});