import { TypeSchema } from '../models/models.js';

export const create = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Поле name обязательно!' });
    }

    const existingType = await TypeSchema.findOne({ name });
    if (existingType) {
      return res.status(400).json({ message: 'Тип с таким именем уже существует.' });
    }

    const type = await TypeSchema.create({ name });
    return res.json(type);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Произошла ошибка при создании типа.' });
  }
};

export const getAll = async (req, res) => {
  try {
    const types = await TypeSchema.find();
    return res.json(types);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Произошла ошибка при получении типов.' });
  }
};
