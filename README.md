# Alkemy Challenge Node Disney API
REST API hecha con NodeJS en la cual se puede obtener, crear, editar, borrar personajes y peliculas de Disney

# Indice
- Caracteristicas de la API
- Como usar la API
- Lenguajes y librerias usadas

# Caracteristicas
API con autenticacion por token que obtiene datos de archivos JSON y los carga en una base de datos al prenderse, despues se pueden realizar requests GET, POST, PUT y DELETE a los distintos modelos de la base de datos. Usé Sequelize como orm para manejar Postgres y para crear los endpoints usé Express. Despues utilicé SendGrid para el sistema de emails cuando nos registramos y logeamos a la API. Para el registro y logueo se usa JWT para usar la API y Bcrypt para encriptar las contraseñas en la base de datos.

# Como usar la API
- Clonar el repo usando el comando: git clone https://github.com/franmassello/alkemyChallenge.git 
- Hacer npm install en /alkemyChallenge (donde esta el package.json)
- Crear un archivo .env que contenga: 
  -  DB_USER='' 
  -  DB_PASSWORD='' 
  -  DB_HOST=localhost 
  -  TOKEN_KEY='' 
  -  SENDGRID_API_KEY= '' 
  -  EMAIL_SENDER_SENDGRID=''
- Hacer npm start

