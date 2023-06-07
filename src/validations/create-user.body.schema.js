import yup from "yup";

export const CreateUserBodySchema = yup.object({
  firstname: yup.string().required().min(2).max(255),
  lastname: yup.string().required().min(2).max(255),
  birthDate: yup.date().required().max(new Date()),
  genre: yup.string().required().oneOf(["M", "F", "X"]),
  email: yup.string().required().email().max(255),
  password: yup.string().required(),
});
