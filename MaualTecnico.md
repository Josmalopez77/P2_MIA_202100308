# Manual Técnico de Proyecto 2 MIA Junio 2024

## Introducción
Esta aplicación permite la reserva de vuelos y autos, diseñada para tres tipos de usuarios: administrador, turista y recepcionista.

## Arquitectura de la Aplicación
La aplicación es multiplataforma y es compatible con Windows, macOS, Linux, iPhone y Android.

### Tecnologías Utilizadas
- **Frontend**: Angular CLI
- **Backend**: Node.js
- **Base de Datos**: MongoDB
- **Servidores**: AWS EC2 y EC3
- **Orquestación de Contenedores**: Docker Compose

## Requisitos del Sistema
Para ejecutar la aplicación eficientemente, se requieren los siguientes componentes mínimos:

- **Hardware**:
  - Procesador dual-core o superior
  - 4GB de RAM
  - Conexión a Internet

- **Software**:
  - Sistema operativo compatible (Windows, macOS, Linux, iOS, Android)
  - Navegador web moderno (Chrome, Firefox, Safari)

## Instalación y Configuración
Para ejecutar la aplicación localmente después de descargarla, configure la IP del ordenador en la configuración de la aplicación.

## Guía de Despliegue
### Frontend
Para levantar el frontend:

ng serve

Para construir el frontend en modo producción:
npm run build --prod

### Backend
Para correr el backend:
npm run dev

### Docker Compose
Para construir y levantar los contenedores Docker:
docker-compose build
docker-compose up

Para detener y eliminar
docker-compose down

