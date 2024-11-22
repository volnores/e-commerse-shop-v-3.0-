import { DeviceSchema } from '../models/models.js';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import { fileURLToPath } from 'url';

export const create = async (req, res) => {
  try {
    const { name, price, rating, brandId, typeId, info } = req.body;

    if (!req.files || !req.files.img) {
      return res.status(400).json({ message: 'Изображение не загружено.' });
    }
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const { img } = req.files;
    let fileName = uuidv4() + '.jpg';
    img.mv(path.resolve(__dirname, '../static/', fileName));
    const device = await DeviceSchema.create({
      id: uuidv4(),
      name,
      price,
      rating,
      brandId,
      typeId,
      info,
      img: `http://localhost:5000/static/${fileName}`,
    });

    return res.json(device);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Ошибка при создании устройства.' });
  }
};

export const getAll = async (req, res) => {
  try {
    const devices = await DeviceSchema.find();
    return res.json(devices);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Ошибка при получении устройств.' });
  }
};

export const getOne = async (req, res) => {
  try {
    const { id } = req.params;
    const device = await DeviceSchema.findOne({ id });
    if (!device) {
      return res.status(404).json({ message: 'Устройство не найдено.' });
    }
    return res.json({ ...device.toObject(), imgUrl: `http://localhost:5000/static/${device.img}` });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Ошибка при получении устройства.' });
  }
};
