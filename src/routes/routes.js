import { Router } from "express";
import multer from "multer";

import { DefaultController } from "../controllers/default.controller.js";
import { UserController } from "../controllers/user.controller.js";
import { validationMiddelware } from "../middlewares/validation.middleware.js";
import { CreateUserBodySchema } from "../validations/create-user.body.schema.js";
import { LoginBodySchema } from "../validations/login.body.schema.js.js";

export const routes = Router();
const upload = multer({ dest: "./uploads" });

routes.route("/").get(DefaultController.getHome);

routes
  .route("/user/login")
  .post(validationMiddelware(LoginBodySchema), UserController.login);
routes
  .route("/user/new")
  .post(validationMiddelware(CreateUserBodySchema), UserController.create);
