import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { User } from "../models/user.model.js";
import { CreateUserDTO } from "../dto/user/create-user.dto.js";

dotenv.config();

const create = async (req, res) => {
  const user = req.parsedBody;
  const exists = await User.findOne({ where: { email: user.email } });
  if (exists) {
    return res.status(400).json({ message: "Cet email est déjà utilisé" });
  }

  const result = await User.create({
    ...user,
    hashedPassword: await bcrypt.hash(user.password, await bcrypt.genSalt()),
    role: "USER",
  });
  res.json(new CreateUserDTO(result));
};

const login = async (req, res) => {
  const { email, password } = req.parsedBody;
  const user = await User.findOne({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.hashedPassword))) {
    return res.status(401).json({ message: "Bad Credentials" });
  }
  const payload = {
    id: user.id,
    email: user.email,
    role: user.role,
  };
  const token = jwt.sign(
    payload, // payload
    process.env.JWT_SECRET, // secret
    { expiresIn: process.env.JWT_DURATION } // options
  );
  res.json({ token });
};

export const UserController = { login, create };
