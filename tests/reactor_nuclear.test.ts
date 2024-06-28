import ReactorNuclear from '../src/reactor_nuclear/reactorNuclear';
import EstadoReactor from '../src/estados/EstadoReactor';
import EnergiaBaseConcreta from '../src/energia/energiaBaseConcreta';
import Normal from '../src/estados/Normal';
import Moderado from '../src/estados/Moderado';
import PlantaNuclear from '../src/plantaNuclear';

jest.mock('../src/plantaNuclear', () => ({
    getHorasOperadas: jest.fn(() => 3) //Simulando 3 horas operadas.
}));

describe('Test clase ReactorNuclear', () => {
 
    describe('Método cambiarEstado()', () => {
        let reactor: ReactorNuclear;
        let estadoInicial: Normal;
        let nuevoEstado: Moderado;
        let temperaturaMock: 280.0;

        beforeEach(() => {
            estadoInicial = new Normal();
            nuevoEstado = new Moderado();

            reactor = new ReactorNuclear(estadoInicial, temperaturaMock);
        });


        it('debe cambiar el estado y acumular la energía producida en dicho estado', () => {
            const energiaAntes = reactor.energiaTotalProducida();
            reactor.cambiarEstado(nuevoEstado);

            const energiaDespues = reactor.energiaTotalProducida();

            expect(reactor.getEstado()).toBe(nuevoEstado);
            expect(energiaDespues).toBeGreaterThanOrEqual(energiaAntes);
        });
    });

    describe('Métodos getters y setters', () => {
        let reactor: ReactorNuclear;
        let estadoInicial: EstadoReactor;
        let temperaturaMock: number;

        beforeEach(() => {
            temperaturaMock = 280.0;
            estadoInicial = new Normal();
            reactor = new ReactorNuclear(estadoInicial, temperaturaMock);
        })

        it('debe retornar el estado actual correctamente', () => {
            expect(reactor.getEstado()).toBe(estadoInicial);
        });

        it('debe retornar la temperatura actual correctamente', () => {
            expect(reactor.getTemperatura()).toBe(temperaturaMock);
        });

        it('debe permitir establecer la temperatura correctamente', () => {
            reactor.setTemperatura(300.0);
            let temperaturaEsperada = 300;

            expect(reactor.getTemperatura()).toBe(temperaturaEsperada);
        })

        it('debe retornar la capacidad del estado actual correctamente', () => {
            let capacidadEsperada = 1;
            expect(reactor.getCapacidad()).toBe(capacidadEsperada);
        })
    });

    describe('Método energiaProducida()', () => {
        let reactor: ReactorNuclear;
        let estadoInicial: EstadoReactor;
        let temperaturaMock: number;

        beforeEach(() => {
            estadoInicial = new Moderado();
            temperaturaMock = 330;
            reactor = new ReactorNuclear(estadoInicial, temperaturaMock);
        });

        it('debe calcular la energía producida correctamente basada en un intervalo de tiempo', () => {
            let tiempoAnteriorOperadoMock = 2;
            reactor['_tiempoAnteriorOperado'] = tiempoAnteriorOperadoMock;

            expect(require('../src/plantaNuclear').getHorasOperadas).toHaveBeenCalled();
            const energiaProducida = reactor.energiaProducida();

            let energiaBaseMock = 700.00;
            let energiaEsperada = energiaBaseMock * (PlantaNuclear.getHorasOperadas() - tiempoAnteriorOperadoMock) * reactor.getCapacidad();
            expect(energiaProducida).toBe(energiaEsperada);
        })
    });

});