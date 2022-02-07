# Alkemy Challenge Node Disney API
API REST hecha con NodeJS en la cual se puede obtener, crear, editar, borrar personajes y peliculas de Disney

# Indice
- Caracteristicas
- Lenguajes y librerias usadas
- Como usar la API
- Documentacion API Postman
- Estructura de codigo
- Workdone.md

# Caracteristicas
API con autenticacion por token que obtiene datos de archivos JSON y los carga en una base de datos al prenderse, despues se pueden realizar requests GET, POST, PUT y DELETE a los distintos modelos de la base de datos. Usé Sequelize como orm para manejar Postgres y para crear los endpoints usé Express. Despues utilicé SendGrid para el sistema de emails cuando nos registramos y logeamos a la API. Para el registro y logueo se usa JWT para usar la API y Bcrypt para encriptar las contraseñas en la base de datos.

# Lenguajes y librerias usadas
- JavaScript
- NodeJS
- Express
- Sequelize
- JWT
- Bcrypt
- PostgreSQL
- SendGrid
- Dotenv
- Postman (para el testing de las rutas)

# Como usar la API
- Clonar el repo usando el comando: git clone https://github.com/franmassello/alkemyChallenge.git 
- Hacer npm install en /alkemyChallenge (donde esta el package.json)
- Crear una base de datos en Postgres llamada disney
- Crear una cuenta gratuita en SendGrid y obtener una API KEY (Documentacion: https://www.youtube.com/watch?v=s2bzUzHeSVw) 
- Crear un single sender en SendGrid (poder dar de alta un email para mandar mails. Documentacion: https://docs.sendgrid.com/ui/sending-email/sender-verification) 
- Crear un archivo .env en el /alkemyChallenge que contenga: 
  -  DB_USER='' 
  -  DB_PASSWORD='' 
  -  DB_HOST=localhost 
  -  TOKEN_KEY='' 
  -  SENDGRID_API_KEY= '' 
  -  EMAIL_SENDER_SENDGRID=''
      - En TOKEN_KEY ingresar una frase random para generar los JWT token ej: llavesecreta
      - En SENDGRID_API_KEY ingresar la key que generamos en SendGrid
      - En EMAIL_SENDER_SENDGRID ingresar el email verificado en SendGrid
- Hacer npm start

# Documentacion API Postman
https://documenter.getpostman.com/view/19198278/UVeGr66b

# Estructura de codigo
- /alkemyChallenge
  - /src
    - /json
      - generos.json
      - peliculas.json
      - personajes.json 
    - /models
      - Genero.js
      - Pelicula.js
      - Personaje.js
      - Usuario.js
    - /routes
      - /middleware
        - auth.js
      - index.js
    - /utils
      - autoFunctions.js
      - startEmail.js
      - userActions.js 
    - app.js
    - db.js
  - /tests
    - test.spec.js
  - .gitignore
  - Challenge Backend.pdf
  - index.js
  - package.json
  - README.md
  - workDone.md

# Workdone 
- Workdone: Es un archivo en el que iba marcando el progreso del proyecyto

