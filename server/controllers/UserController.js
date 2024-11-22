import bcrypt from 'bcrypt';
import { UserSchema, BasketSchema, Counter } from '../models/models.js';
import { RoleShema } from '../models/roles.js';
import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';

async function getNextSequenceValue(sequenceName) {
  const sequenceDocument = await Counter.findOneAndUpdate(
    { _id: sequenceName },
    { $inc: { seq: 1 } },
    { new: true, upsert: true },
  );
  return sequenceDocument.seq;
}

const generateJwt = (id, email, role) => {
  return jwt.sign({ id, email, role }, process.env.SECRET_KEY, { expiresIn: '24h' });
};

export const registration = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: 'Ошибка при регистрации', errors });
    }
    const { email, password, role } = req.body;
    const candidate = await UserSchema.findOne({ email });
    if (candidate) {
      return res.status(400).json({
        message: 'Такой пользователь уже существует',
      });
    }
    const passwordHash = bcrypt.hashSync(password, 8);
    const userRole = role
      ? await RoleShema.findOne({ value: role })
      : await RoleShema.findOne({ value: 'USER' });
    const nextId = await getNextSequenceValue('userId');

    const user = new UserSchema({
      id: nextId,
      email,
      password: passwordHash,
      role: userRole ? [userRole.value] : ['USER'],
    });
    await user.save();
    const token = generateJwt(user.id, user.email, user.role);
    return res.json({ user, token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Ошибка сервера' });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserSchema.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: `Пользователь${email} не найден` });
    }
    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: 'Введен неверный пароль' });
    }
    const token = generateJwt(user.id, user.email, user.role);
    return res.json({ user, token });
  } catch (error) {
    console.log(error);
  }
};

export const checkAuth = async (req, res, next) => {
  try {
    return res.json({ message: 'Пользователь авторизован', user: req.user });
  } catch (error) {
    console.log(error);
  }
};
