import express, { json } from "express";
import { routes } from "./routes/routes.js";
import cors from "cors";
import { jwtMiddleware } from "./middlewares/jwt.middleware.js";

// Import de tous les modeles
import "./models/db.js";
import "./models/user.model.js";

const app = express();
app.use(cors());

app.use("/uploads", express.static("./uploads"));

app.use(json());

app.use(jwtMiddleware);

app.use(routes);

app.listen(3000, () => {
  console.log("listening port 3000");
});
