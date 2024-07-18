
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

#### Get top currencys in ars

```http
  GET /api/v1/crypto/top-currencys-in-ars
```

#### Get currency

```http
  GET /api/v1/crypto/get-crypto-by-name?name=${value}
```


### File

#### Save file

```http
  POST /api/v1/files/save-file
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




## Authors

- [Agustin Coelho](https://www.linkedin.com/in/agustin-coelho/)

