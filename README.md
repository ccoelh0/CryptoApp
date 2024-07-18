
# Crypto App

This is a microservice created with Node, Typescript and Express, that is responsible for doing only two things:
* Obtain the 5 cryptos with the best price of the moment (in USD and ARS), and at the same time also search for their information by name.
* Arrange an endpoint to send images or pdf and save them in a public folder.



## API Reference

### Crypto

##### Get top currencys in usd

```http
  GET /api/v1/crypto/top-currencys-in-usd
```

##### cURL
```
curl --location 'localhost:3001/api/v1/crypto/top-currencys-in-usd'
```

#### Get top currencys in ars

```http
  GET /api/v1/crypto/top-currencys-in-ars
```

##### cURL
```
curl --location 'localhost:3001/api/v1/crypto/top-currencys-in-ars'
```

#### Get currency

```http
  GET /api/v1/crypto/get-crypto-by-name?name=${value}
```

##### cURL
```
curl --location 'localhost:3001/api/v1/crypto/get-crypto-by-name?name=solana'
```


### File

#### Save file

```http
  POST /api/v1/files/save-file
```

#### cURL
```
curl --location 'localhost:3001/api/v1/files/save-file' \
--form 'file=@"postman-cloud:///1ef43ea0-d3bd-4d10-8852-31d239a28991"'
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `file`      | `file` | **Required**. Image |


Enviar el body en form-data


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PORT=5420`

`CRYPTO_API_KEY=your-key`





## Deployment

To deploy this project run

```bash
  npm i 
  npm run dev
```

Also, you can do: 

```bash
  docker build -t image-name .
  docker run -p 3000:3000 image-name
```


## Features

Some of the features of this projects are

- Error handling using an ApiError class and tryCatch func
- Type Safety with Typescript
- DTOs use for data transfer
- Logger
- Middlewares to validate reqs



## Last conclusions

Aca me permito hablar en espaniol para expresarme mejor. 

Pensando un poco como seguir con esta idea, creo que lo mejor seria separar estos dos servicios (cotizacion de cryptos y guardado de documentos) en un microservicio cada uno, dado que esto permitiria: 

- Que cada servicio escale por su lado y con su propia complejidad
- Mas facil de mantener cada uno
- Separacion de funcionalidades 

Por otro lado, entiendo que la idea principal de el guardado de archivos (quizas me equivoco) es para validar identidad y demas. En este caso este aspecto se podria cubrir integrando distintas apis/bibliotecas disponibles, algunas de las que estuve revisando son: AWS Rekognition, Opencv, o Microsoft Azure Cognitive Services (Face API)

Con respecto a la parte de crypto, un feature interesante relacionado con Takenos seria incluir la compra/venta de cryptos en la plataforma. Este servicio creado podria ser el puntapie para desarrollar esto mismo. 

Siguiendo esta ultima idea, y ya hablando un poco mas acerca de la arquitectura del proyecto, creo que la mejor base de datos para guardar el registro de compra/venta de las transacciones realizadas seria una nosql db como Mongo o Dynamo si se usa AWS (debido a la compatibilidad y escalabilidad).


## Authors

- [Agustin Coelho](https://www.linkedin.com/in/agustin-coelho/)


