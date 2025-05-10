import { z } from "zod";

export const loginFormSchema = z.object({
  email: z.string().email({
    message: "Введите email",
  }).trim(),
  password: z.string().min(4, {
    message: "Пароль должен состоять хотя бы из 4 символов"
  }).trim(),
})