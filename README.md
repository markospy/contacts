* [Go to markospy](https://github.com/markospy)

# Contact
Una aplicación web para manejar contactos, construida con FastAPI y MongoDB en el backend, y React con React Router, TanStack Query, Axios y Zod en el frontend.

## Descripción

Contact es una aplicación web que permite a los usuarios crear, leer, actualizar y eliminar contactos de manera sencilla y eficiente. La aplicación utiliza una arquitectura de microservicios, con un backend construido con FastAPI y MongoDB, y un frontend construido con React y varias librerías de apoyo.

## Características

- Crear, leer, actualizar y eliminar contactos.
- Búsqueda de contactos por nombre y apellidos.
- Validación de datos de contacto con Zod.
- Uso de React Router para la navegación entre páginas.
- Uso de TanStack Query para la gestión de estado y caché.
- Uso de Axios para las solicitudes HTTP al backend.
- Uso de MongoDB como base de datos.


## Tecnologías utilizadas
- FastAPI (backend)
- MongoDB (base de datos)
- React (frontend)
- React Router (navegación)
- TanStack Query (gestión de estado y caché)
- Axios (solicitudes HTTP)
- Zod (validación de datos)

## Instalación y ejecución
**Backend (FastAPI)**
1. Accede a la carpeta backend con ```cd backend```.
2. Instala las dependencias con ```pip install -r requirements.txt```.
3. Inicia el servidor de desarrollo con ```uvicorn main:app --reload```.
4. La API estará disponible en http://localhost:8000/docs

**Frontend (React)**
1. Accede a la carpeta frontend con ```cd frontend```.
2. Instala las dependencias con ```npm install``` o ```pnpm install```.
3. Inicia el servidor de desarrollo con ```npm run dev``` o ```pnpm run dev```.
4. La aplicación estará disponible en http://localhost:5173

## Capturas de pantalla
Aquí muestro algunas capturas de pantalla de la aplicación en acción:

<div style= "display: flex; flex-wrap: wrap; justify-content: center; gap: 24px">
  <div>
    <img src='screenshots/main.png' alt='Pantalla de inicio' />
    <p>Pantalla de inicio</p>
  </div>
  <div>
    <img src='screenshots/create_contact.png' alt='Crear un nuevo contacto' />
    <p>Crear un nuevo contacto</p>
  </div>
  <div>
    <img src='screenshots/contact_detail.png' alt='Ver detalles de un contacto' />
    <p>Ver detalles de un contacto</p>
  </div>
</div>

## Contribuciones

Si deseas contribuir al proyecto, por favor crea un issue o un pull request con tus cambios. Asegúrate de seguir las convenciones de código y las mejores prácticas del proyecto.

## Licencia
El proyecto está licenciado bajo la licencia MIT