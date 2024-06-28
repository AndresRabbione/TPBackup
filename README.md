# READ ME

Este grupo está integrado por Dario Zagarzazu, Francesca Massollo, Claudia Canta y Andres Rabbione.

## Tabla de contenidos

- [Intoduccion](#introduccion)
- [Funcionamiento detallado](#funcionamiento-detallado)
  - [Construccion](#construccion)
  - [Operacion](#operacion)
  - [Secuencia basica](#secuencia-basica)
- [Instrucciones para compilacion](#instrucciones-para-compilación)
  - [Preparando el entrono](#preparando-el-entorno)
  - [Usar el entorno](#usar-el-entorno)
- [Comandos utiles](#comandos-utiles)
- [Dependencias](#dependencias)
  - [Necesario](#necesario)
  - [Recomendado](#recomendado)

## Introduccion

_Este proyecto simula el funcionamiento de una planta nuclear utilizando una estructura orientada a objetos._

La planta nuclear opera simulando el pasaje del tiempo y delegando la responsabilidad de manejar cualquier contratiempo que ocurra durante la operacion a una serie de operadores.

La planta tiene varios mecanismos que emplea para manejar su temperatura, utiliza barras de control y la habilidad de apagar el reactor en caso de emergencia.

La temperatura y enrgia son reportadas en el momento con la habilidad de recibir un reporte de la energia total generada despues de una cierta cantidad de tiempo

## Funcionamiento detallado

_Esta seccion detalla paso a paso como se se construye la planta y se simula su operacion_

### Construccion

Los primeros objetos a construir son las barras de control, ya que son los mas simples, con una sola propiedad, su tiempo de vida util.

> `let barras: BarraDeControl[] = [new BarraDeControl(num1), new BarraDeControl(num2), ...];`

El siguiente objeto es el duenio de la planta cuya una propiedad requerida es su nombre.

> `let duenio: Duenio = new Duenio("nombre");`

El siguiente paso es armar los operadores, estos tienen un nombre y una referencia al duenio.

> `let operadores: Operador[] = [new Operador("nombre1", duenio), new Operador("nombre2", duenio), ...];`

Ahora falta construir un estado inicial para el reactor, aunque es recomendado que el estado generado sea del tipo apropiado para la temperatura ingresada la simulacion toma precauciones para corregir el estado si la temperatura no coincide.

> `let estadoInicial: EstadoReactor = new 'Estado'();`

_Reeplaza 'Estado' por tu estado deseado_

Como anteultimo paso debemos cosntruir al reactor, este requiere de un estado inicial, una temperatura, un array de barras de control y un duenio para asignar al reportador. Tambien automaticamente construye algunos componentes clave: los decoradores que calculan la energia generada, el sensor y el reportador.

_Estos componentes son explicados en mayor detalle en la siguiente seccion_

> `let reactor: ReactorNuclear = new ReactorNuclear(estadoInicial, temperatura, barras, duenio);`

_Aunque el duenio no es un componente del reactor, es requerido para construir al reportador_

Tambien en necesario llamar al metodo de cambiarEstado para asegurarnos de que el estado sea correctamente asignado

> `reactor.cambiarEstado(estadoInicial);`

El ultimo objeto a construir es la planta nuclear cuyo constructor tiene 3 parametros: Un reactor, los operadores y el duenio. La planta tambien automaticamente inicializa sus contadores, el gestor de operadores y subscribe al gestor para que pueda ser notificado.

> `let plantaNuclear: PlantaNuclear = new PlantaNuclear(reactor, operadores, duenio);`

### Operacion

#### Planta Nuclear

El unico metodo que debe ser llamado para iniciar la operacion de la planta es iniciarSimulacion

> `plantaNuclear.iniciarSimulacion(horasReporte, limite);`

Los parametros necesarios son: la hora a realizar un reporte de la energia generada total hasta ese punto y un parametro opcional que fija un limite de cuantas horas se van a simular, si no se fija se utiliza un valor constante encontrado en el archivo constantes.ts.

> `export const horasLimite = 10;`

Al iniciar la simulacion, esta llama al sensor encontrado dentro del reactor nuclear para pasar por la siguiente secuencia:

> Confirmar estado --> Manejar la situacion si es necesario --> Enviar un reoprte con los datos en el momento

_El detalle individual de estos procesos sera explicado mas abajo._

Luego continua simulando la hora actual una cierta cantidad de minutos a la vez, actualmente 1, aumentando o disminuyendo la temperatura mientras va y repitiendo la secuencia de arriba.

Si se encuentra que la hora actual es igual a la hora pedida para el reporte, se envia un reporte con la energia total generada hasta ese momento.

Si se llego al limite se llama al metodo de finalizarSimulacion y se envia otro reporte. De otra forma se llama a este metodo automaticamente, simulando otra hora hasta llegar al limite.

> `plantaNuclear.finalizarSimulacion()`

#### Reactor Nuclear

El reactor se responsabiliza por llamar a sus componentes, principalmente al sensor cuando su temperatura cambia, junto con modificar su temperatura segun el estado actual.

Al llamar el metodo de cambiarTemperatura este aumenta o disminuye la temperatura por una cierta cantidad dependiendo del estado actual y el tiepo transcurrido, pasado como parametro.

> `reactor.cambiarTemperatura(tiempo);`

_El cambio en la temperatura es un calculo realizado por el estado del reactor sobre una constante encontrada en constantes.ts_

Este metodo desencadena la secuencia definida al comienzo de la seccion de la planta nuclear mediante un metodo del sensor.

> `reactor.sensor.actualizarTemperatura(reactor);`

El reactor tambien es capaz de obtener la energia generada en el momento segun la temperatura en el momento.

> `reactor.energiaProducida()`

#### Sensor

El sonsor opera como un patron **observer** donde, luego de asegurar que el estado sea correcto, notifica al gestor de operadores que se encarga de asignar tareas a los operadores.

> _En el metodo actualizarTemperatura()_ > `reactor.estado.checkEstado()` > `sensor.notificar(estado)`

#### Gestor de Operadores

El gestor implementa un algoritmo Round Robin, donde cada operador tiene su turno para decidir que operador deberia manejar la situacion actual, aunque notifica a todos los operadores que ocurrio un cambio de todas formas.

> `gestor.notificarOperadores(estadoReactor)`

_Opera con un orden secuencial en el array de operadores subscriptos._

#### Estados

Los estados son relativos a la temperatura actual del reactor con ciertos rangos de temperatura perteneciendo a algun estado. Cada estado define la capacidad del reactor de generar energia, el cambio de la temperatura por un minuto y como ese estado deberia ser manejado por los operadores.

El reactor meneja 5 estados actualmente:  
**Apagado:** Este estado no depende de alguna temperatura y previene encender el reactor si la temperatura se encuentra critica.  
**Frio:** Este estado ocurre a cualquier temperatura menor a 280.  
**Normal:** Este estado ocurren entre los 280 y 330 (no inclusive).  
**Moderado:** Este estado ocurren entre los 330 y 400 (no inclusive).  
**Critico:** Este estado ocurre a cualquier temperatura mayor a 400.

Las 3 maneras de manejar situacion son:  
**Nada:** No es necesario tomar accion, se envia un reporte y regresa a simular.  
**Insertar barras de control:** Cuando la temperatura llega a los 330 es posible insertar barras de control que disminuyen la temperatura, estas barras son elegidas por el operador.  
**Apagar el reactor:** Cuando la temperatura llega a un nivel critico se apaga el reactor a la fuerza.  
_En todos los casos se envia un reporte sobre la situacion_

#### Operador

El operador esta a cargo de manejar la situacion y los procesos necesarios para eso. Esto incluye elegir, insertar y gastar barras.

Las barras son elegidas segun un algoritmo que intenta llegar a una temperatura considerada optima, definida en el archivo de constantes.

#### Barras de control

Las barras son el objeto mas simple, tienen un tiempo de vida util que disminuye cuando son usadas. Tambien calculan un porcentaje por el que disminuye la temperatura del reactor.

> `porcentaje = tiempoDeVidaUtil / 3600`

#### Base de enregia

La base de energia se usa para calcular la energia generada en el momento segun la temperatura actual, esta depende de **decoradores** que toman en cuenta el tiempo transcurrido y la capacidad actual del rector, derivada de el estado.  
_Para la metodologia particular, leer los archivos encontrados en el directorio energia_

#### Duenio

El duenio no tiene muchas responsabilidades, es notificado cuando el reactor es apagado y recibe reportes de la situacion cuando cambia. Estas notificaciones son generalmente pasadas mediante el operador.

> `duenio.recibirAlerta(estado, manejado);` > `duenio.recibirReporte(reporte);`

#### Reportes

Hay 4 tipos de reporte:  
**Reporte Regular:** Este reporte manda la medicion de temperatura mas reciente y la energia neta correspondiente.  
**Reporte de barras:** Este reporte informa la cantidad de barras usadas cuando se manejo la situacion actual.  
**Reporte de estados:** Este reporte informa la cantidad de veces que se estuvo en ciertos estados.  
**Reporte Total:** Este reporte informa la energia total generada despues de una cierta cantidad de horas.

#### Reportador

El reportador se encarga de pasar los reportes ya armados a los agentes correctos mediante el metodo enviarReporte, junto con guardar algunos datos necesarios para el reporte.

> `reportador.enviarReporte(reporte);`

### Secuencia basica

_Esta seccion detalla una secuencia del llamado de metodos empezando con una nueva simulacion. Esto ignora contexto para mostrar mas claramente a que objeto pertenece cada metodo, esto significa que casos donde cadenas como: reactor.sensor.algunMetodo() o la palabra this se reemplazan por simplemente llamar al metodo. Por la implementacion mas directa, leer los otros archivos_

> `planta.iniciarSimulacion(horasReporte, limite);`  
> `sensor.actualizarTemperatura(reactor);`  
> `estado.checkEstado();`  
> `reactor.cambiarEstado();`  
> `sensor.notificar(estado);`  
> `gestor.notificarOperadores(estado)`  
> `operador.recibirAlerta(estado, manejado);`  
> `estado.manejarSituacion(operador);`  
> `reportador.enviarReporte(reporte);`

_Tambien es una version generica ya que, por ejemplo, manejarSituacion puede llevar a insertarBarras o apagarReactor antes de reportar, o puede ocurrir un cambio de temperatura antes de llamar al sensor._

## Instrucciones para compilación

_Para una lista de dependencias mas extensiva con links utiles, ve la seccion: [Dependencias](#dependencias)._

### Preparando el entorno

**1. Descargar los archivos del repositorio.**

_Este paso puede ser saltado si estas leyendo esto despues de clonar el repositorio_

El repositorio contiene todos los archivos necesarios incluyendo la configuracion para compilar. Si ya tenes [git](https://git-scm.com/) intstalado podes clonar el repositorio usando el siguiente comando dentro de la consola:

> git clone https://github.com/FrancescaMassollo/TP_PlantaNuclear

Alternativamente se puede copiar o descargar los archivos individualmente, mientras que se mantengan los directorios con los archivos iguales.

**2. Descargar NodeJS, esto puede ser hecho desde el siguiente link: [Descargar Node](https://nodejs.org/en/download/package-manager).**

Es recomendado usar el instalador encontado en la pestaña "Prebuilt Installer", pero cualquier metodo de instalacion funciona.

**3. Descargar npm**

En la consola usar el siguiente comando dentro del directorio donde copiaste los archivos:

> npm i

**4. Compilar**

En la misma termianl o en otra en el mismo repositorio usar el comando:

> npm run build

### Usar el entorno

Ya se puede correr el codigo con el comando:

> npm run start

En la proxima seccion hay una lista de comandos utiles ahora que el entorno esta listo.

## Comandos utiles

_Es recomendado leer esta seccion si estas interesado en editar el codigo o correr las pruebas, tambien hay una lista completa de todos los comandos en el archivo: package.json._

Compilar:

> npm run build

Correr codigo en el archivo index.ts:

> npm run start

Correr pruebas:

> npm run test

Limpiar los archivos generados al compilar:

> npm run clean

## Dependencias

### Necesario

_Las dependencias relacionadas a pruebas (3-5) solo son consideradas necesarias para que las pruebas compilen, pero el codigo deberia funcionar sin ellas mientras que esos archivos sean borrados._

- [NodeJS](https://nodejs.org/en)
- npm
- [JEST](https://marketplace.visualstudio.com/items?itemName=Orta.vscode-jest)
- [Test Adapter Converter](https://marketplace.visualstudio.com/items?itemName=ms-vscode.test-adapter-converter)
- [Test Explorer UI](https://marketplace.visualstudio.com/items?itemName=hbenl.vscode-test-explorer)

### Recomendado

_Estas dependencias son utiles si se desea modificar el codigo o tener un preview util de los diagramas pero el codigo y las pruebas funcionaran si no desea instalarlas._

- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [PlantUML](https://marketplace.visualstudio.com/items?itemName=jebbs.plantuml)
- [git](https://git-scm.com/)
