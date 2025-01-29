# Backend tracking de productos
Reto desarrollado en NodeJS con MongoDB. 
Se requiere desarrollar un Sistema para la empresa XYZ Boutique que tiene como actividad principal la venta de productos basicos. Su principal problema es que no realizan un correcto tracking al momento de hacer los pedidos de productos para abastecer su stock.
## Documentacion

### Instalacion de proyecto
```bash
git clone https://github.com/Frany-oss/francesco-bassino
```
```bash
cd francesco-bassino
```
```bash
npm install
```
### Correr el proyecto
Para correr el proyecto solo es necesario entrar a la carpeta ```src ```
```bash
node app.js
```
El proyecto deberia de correr en `http://localhost:3456`
NOTA: Por temas practicas en este caso no se esta usando ```.env ``` por temas de simplicidad (ademas que igual estaria compartiendo los datos mediante el readme)

Si todo sale bien. se debera mostrar asi:
```bash
Servidor corriendo en http://localhost:3456
MongoDB Connected: ac-5bvzk3m-shard-00-02.ehx14ak.mongodb.net
```

### Endpoints Desarrollados:
### - Auth (Estos NO requieren Bearer Token)
#### Register: ``` POST http://localhost:3456/api/auth/register ```
Json para enviar:
```json
{
    "email": "usuario@prueba.com",
    "password": "admin123",
    "name": "Usuario vendedor",
    "phone": "1234567890",
    "position": "Vendedor",
    "role": "Vendedor"
}
```
Registrar el usuario. Con este usuario vas a poder ingresar al login (email y password). 

#### Login: ```POST http://localhost:3456/api/auth/login ```
Json para enviar:
```json
{
    "email": "usuario@prueba.com",
    "password": "admin123",
}
```
La respuesta del login te devuelve el ```Token``` El cual te servira para usar todos los demas endpoints que quieras.

### - Product
#### Recuerda agregar el Token en todos los endpoints
#### POST ```http://localhost:3456/api/products ```
Json para enviar:
```json
{
    "sku": "SKU1927",
    "name": "Producto Prueba",
    "type": "Tecnolgia",
    "labels": ["nuevo", "celular", "tecnologia"],
    "price": 29.99,
    "unitOfMeasure": "u"
}
```

#### GET ```http://localhost:3456/api/products/:sku ```
Busqueda de producto por SKU

### - User
#### Recuerda agregar el Token en todos los endpoints
#### GET ```http://localhost:3456/api/users```
Obtiene todos los usuarios

#### GET ```http://localhost:3456/api/users/:rol```
Obtiene todos los usuarios de un rol

NOTA: El creado de usuario seria el register en el auth.

### - Order
#### Recuerda agregar el Token en todos los endpoints
#### POST ```http://localhost:3456/api/orders```
Json para enviar:
```json
{
  "productIds": ["66444fb7548789a82cde0a9e", "66444fdb548789a82cde0aa2"],
  "status": "Por atender",
  "deliveryPerson": "66444f66548789a82cde0a97",
  "seller": "66444f9e548789a82cde0a9a"
}
```
#### PATH ```http://localhost:3456/api/orders/:orderId/status```
Json para enviar:
```json
{
  "status": "Por atender"
}
```

#### GET ```http://localhost:3456/api/orders```
Obtiene todos los pedidos

#### GET ```http://localhost:3456/api/orders/:numeroPedido```
Obtiene el pedido mediante el numero de orden

#### GET ```http://localhost:3456/api/orders/full/:numeroPedido```
Obtiene el pedido completo (con productos y usuarios encargados) mediante el numero de orden


## Testing
Para realizar los test en jest, dirigete a la carpeta principal del proyecto y ejecuta
```bash
npm test
```

## DOCUMENTACION CON SWAGGER
Para poder testear los endpoints y poder ver con mas claridad todos los endpoints implementados una vez corriendo el backend entrar a
```bash
http://localhost:3456/api-docs
```
NOTA: Recuerda agregar el token arriba a la derecha una vez que te loguees para poder realizar los demas endpoints
