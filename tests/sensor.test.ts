import Notificador from '../src/notificador'
import Sensor from '../src/sensor';
import { expect } from '@jest/globals';

describe('prueba de sensor', () => {
    let notificador: Notificador = new Notificador();
    let sensor: Sensor = new Sensor();
    let moderada: number = 330;
    let critica: number = 400;
    let normal: number = 280;
    
    it('deberia suscribirse y desuscribirse', () => {
        expect(sensor.suscribir(notificador)).toBeUndefined();

        expect(sensor.desuscribir(notificador)).toBeUndefined();     
    });

    describe('resultados', () => {
        beforeEach(() => {
            sensor.suscribir(notificador);
        });

        //FIX
        it('deberia devolver temperatura', () => {
            sensor.actualizarTemperatura(normal)
            expect(notificador.actualizar(sensor)).toBe(normal)
        })

        it('deberia tirar error de temperatura moderada', () => {
            expect(() => {
                sensor.actualizarTemperatura(moderada);
                notificador.actualizar(sensor)
            }).toThrowError(`La temperatura es de ${moderada}, la insercion de barras de control es recomendada.`);
        });

        it('deberia tirar error de temperatura critica', () => {
            
            expect(() => {
                sensor.actualizarTemperatura(critica);
                notificador.actualizar(sensor)
            }).toThrowError('La temperatura es CRITICA y el reactor DEBE apagarse.');
        });

    })
});