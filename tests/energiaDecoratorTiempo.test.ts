import EnergiaBase from "../src/energia/energiaBase";
import EnergiaDecoratorTiempo from "../src/energia/decoradores/energiaDecoratorTiempo";

class MockEnergiaBase implements EnergiaBase {
    calcularEnergiaNeta(temperatura: number): number {
        if (temperatura <= 0) {
            return 0;
        } else {
            return 1;
        }
    }
}

describe('Test clase EnergiaDecoratorTiempo', () => {
    let mockEnergiaBase: MockEnergiaBase;
    let decorator: EnergiaDecoratorTiempo;
    let mockTiempo: number = 2;
    
    beforeEach(() => {
        mockEnergiaBase = new MockEnergiaBase();
        decorator = new EnergiaDecoratorTiempo(mockEnergiaBase, mockTiempo);
    });

    describe('Método convertir tiempo a minutos', () => {
        it('debe convertir correctamente el tiempo a minutos', () => {
            const tiempoEnMinutos = decorator['convertirTiempoAMinutos']();
            const minutosEsperados = mockTiempo * 60;

            expect(tiempoEnMinutos).toBe(minutosEsperados);
        })
    })

    describe('Método calcularEnergiaNeta()', () => {
        it('debe calcular la energía neta correctamente multiplicada por el tiempo', () => {
            const temperatura = 280;
            const energiaBaseCalculada = mockEnergiaBase.calcularEnergiaNeta(temperatura);
            const energiaEsperada = (energiaBaseCalculada / 60) * (mockTiempo * 60);
            const resultado = decorator.calcularEnergiaNeta(temperatura);
    
            expect(resultado).toBe(energiaEsperada);
        });
    
        it('debe manejar correctamente el cálculo con temperatura negativa', () => {
            const temperatura = -10;
            const energiaEsperada = 0;
            const resultado = decorator.calcularEnergiaNeta(temperatura);
    
            expect(resultado).toBe(energiaEsperada);
        });
    });
});