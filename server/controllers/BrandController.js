import { BrandSchema } from '../models/models.js';

export const create = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Поле name обязательно!' });
    }

    const existingBrand = await BrandSchema.findOne({ name });
    if (existingBrand) {
      return res.status(400).json({ message: 'Бренд с таким именем уже существует.' });
    }

    const brand = await BrandSchema.create({ name });
    return res.json(brand);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Произошла ошибка при создании бренда.' });
  }
};

export const getAll = async (req, res) => {
  try {
    const brands = await BrandSchema.find();
    return res.json(brands);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Произошла ошибка при получении брендов.' });
  }
};
