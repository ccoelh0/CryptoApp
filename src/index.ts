import express from "express";
import helmet from "helmet";
import xss from "xss-clean";
import ExpressMongoSanitize from "express-mongo-sanitize";
import cors from "cors";
import routes from "./routes/index.routes";

const app = express();
const port = 3000;

// Set security HTTP headers
app.use(helmet());

// Enable cors
app.use(cors());
app.options("*", cors());

// Parse json request body
app.use(express.json());

// Parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// Sanitize request data
app.use(xss());
app.use(ExpressMongoSanitize());

// V1 api routes
app.use(routes);

// Send back a 404 error for any unknown api request
// app.use((_req, _res, next) => {
//   next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
// });

// // convert error to ApiError, if needed
// app.use(errorConverter);

// // handle error
// app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
