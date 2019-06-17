# Backend

## Instalando Node.js v10.x:

NOTA.- Debian Wheezy no soporta Node 10

``` bash
# Using Ubuntu
curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
sudo apt-get install -y nodejs

# Using Debian, as root
curl -sL https://deb.nodesource.com/setup_10.x | bash -
apt-get install -y nodejs
```

## Instalando el proyecto

Siga los siguientes pasos:

``` bash
# 1. Instalar dependencias
npm install

# 2. Iniciar el servidor y crear la base de datos del proyecto en http://localhost:3000
npm run dev

# 3. Una vez creada la base de datos ejecutar los seeders(datos de prueba) de las tablas de la base de datos
npm run seeders

# 4. Probar api automático del sistema de companies y users
curl -X GET \
  http://localhost:3000/model/companies

curl -X GET \
  http://localhost:3000/model/users

````

## Agregando modelos

- Cuando crea un modelo en la carpeta models, este se cargará automáticamente y su api-rest estará disponible de manera automática, los enpoints disponibles son:

```
create  POST /resource
get     GET /resource/:id
query   GET /resource
remove  DELETE /resource/:id
update  PUT /resource/:id
```

Para más opciones de los endpoins puede revisar [Sequelize handler](https://www.npmjs.com/package/sequelize-handlers).

- Se debe seguir la misma estructura que los modelos de prueba(companies, users).

- Para agregar relaciones entre los modelos se debe hacerlo en el archivo `model/associations.js`.

## API

- En el archivo `api.js` puede agregar sus endpoins personalizados bajo la ruta `http://localhost:3000/api/[endpoint-personalizado]`

## Agregando seeders

Para agregar seeders lo puede hacer en la carpeta `seeders`, para esto se genera datos fakes con el módulo [casual](https://www.npmjs.com/package/casual), debe mantener el orden de los seeders de acuerdo a su esquema de base de datos.

## Cambiar de gestor de base de datos

Puede usar el archivo `config/config.sample.json` para configurar su conexión a otro gestor de base de datos como MySQL, PostgreSQL, MsSQL, Oracle; para esto renombre `config/config.sample.json` a `config/config.json` y coloque sus datos de conexión a su gestor de base de datos.