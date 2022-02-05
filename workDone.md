# Modelos de base de datos: Personaje, Pelicula, Genero, Usuarios
- Rutas: 
    - Autenticacion: 
        - POST /auth/register recibe por body nombre, apellido, email y password
        - POST /auth/login recibe por body nombre y password
    - Personajes: 
        - GET /characters con busqueda por query con name, age y movies. 
        - POST /characters por query pasando imagen, nombre, edad, peso, historia y peliculas asociadas. 
        - DELETE /characters por query con id de personaje.
        - PUT /characters por body ingresando el id del personaje y los datos a actualizar.
    - Peliculas:
        - GET /movies con busqueda por query con nomnre, genero y orden.
        - POST /movies por query pasando imagen, titulo, fecha_creacion y calificacion.
        - DELETE /movies por query con id de pelicula.
        - PUT /movies por body ingresando el id de la pelicula y los datos a actualizar
    - Email Service:
        - Al registrarse manda un Email si es que no existe en la base de datos
        - Al loguearse manda un Email
Documentacion API: 
https://documenter.getpostman.com/view/19198278/UVeGr66b
