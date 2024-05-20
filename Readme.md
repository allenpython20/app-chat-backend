# Proyecto Node.js con Websockets y MongoDB

Este proyecto consiste en un API REST montado con Express.js que también proporciona funcionalidad de websockets utilizando la biblioteca `ws`. Utiliza MongoDB como base de datos, gestionada mediante Mongoose para una integración fluida con Node.js.


## Requisitos

- Node.js (la versión utilizada fue v20.11.1)
- Docker Desktop

## Instalación

1. Clona este repositorio:

```bash
git clone https://github.com/allenpython20/app-chat-backend.git
```

2. Navega al directorio del proyecto
```bash
cd chat-ws-backend
```

3. Ejecuta el siguiente comando para iniciar los contenedores de Docker
```bash
docker-compose up -d
```

3. Renombra el archivo .env.template a .env y cambiar el valor de las variables

4. Instala las dependencias:
```bash
npm install
```

5. Inicia la aplicación
```bash
npm run dev
```