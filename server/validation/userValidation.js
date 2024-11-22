import { body } from 'express-validator';

export const registerValidation = [
  body('email', 'Не соответствует по форме регистрации почты').isEmail(),
  body('password', 'Пароль не может быть меньше 5 и больше 12 символов').isLength({
    min: 5,
    max: 12,
  }),
];
