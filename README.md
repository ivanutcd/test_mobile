# Configuración de ambiente

## Requisitos

### Versión de Node y .NET

- Asegúrate de tener Node.js v18.18.2 instalado.
- Para el backend, utiliza .NET 8

## Clonar Repositorio

1. Clona el repositorio desde GitHub:

   ```bash
   git clone git@github.com:proyectos-enee/tu-repositorio.git
   ```

## Instalación de Dependencias

### En el Directorio Raíz

1. Navega al directorio raíz del proyecto:

   ```bash
   cd tu-repositorio
   ```

2. Instala las dependencias utilizando yarn

   ```bash
   yarn install
   ```

3. Eliminar carpeta de node_modules y volver instalar usando pnpm

   ```bash
   pnpm install
   ```

 >[!NOTE] Nota
   >
   >Este ultimo procedimiento ser realiza unicamente por que lefthook no instala correctamente los hook en la carpeta `.git` si utilizamos pnpm, pero una ves configurados se puede utilizar pnpm sin problemas.

### En la Carpeta Frontend

1. Navega al directorio de la carpeta frontend:

   ```bash
   cd gd_contratos_generacion/frontend
   ```

2. Instala las dependencias utilizando pnpm

   ```bash
   pnpm install
   ```

## Configuración del Entorno

### Backend

1. Copia el archivo example.env en la carpeta del proyecto de API y renómbralo a .env

2. Configura las variables de entorno según tus preferencias en el archivo .env

3. Para correr desde el proyecto API, ejecuta el comando:

    ```bash
    dotnet run
    ```

4. Para utilziar base de datos local Copiar el archivo example.env y renombrarlo a .env y el directorio raiz de monorepositorio (Los archivos .env son cargados automaticamente en docker compose por eso no mirara ninguna referencia al archivo)
5. Para correr el docker compose
    ```bash
    docker compose -p STACK_PARA_CONTENEDOR up
    ```

### Frontend

1. Copia el archivo env-config.example.js en la carpeta frontend y renómbralo a env-config.js

2. Configura las variables de entorno según tus preferencias en el archivo env-config.js

3. Para correr el frontend, ejecuta el comando:

    ```bash
    pnpm dev
    ```
