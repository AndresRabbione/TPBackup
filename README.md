# READ ME

Este grupo está integrado por Dario Zagarzazu, Francesca Massollo, Claudia Canta y Andres Rabbione.

## Introduccion

_Este proyecto simula el funcionamiento de una planta nuclear utilizando una estructura orientada a objetos._

La planta nuclear opera simulando el pasaje del tiempo y delegando la responsabilidad de manejar cualquier contratiempo que ocurra durante la operacion a una serie de operadores.

La planta tiene varios mecanismos que emplea para manejar su temperatura, utiliza barras de control y la habilidad de apagar el reactor en caso de emergencia.

La temperatura y enrgia son reportadas en el momento con la habilidad de recibir un reporte de la energia total generada despues de una cierta cantidad de tiempo

## Funcionamiento detallado

## Instrucciones para compilación:

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
