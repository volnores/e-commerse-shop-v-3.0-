import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const User = new mongoose.Schema(
  {
    id: { type: Number, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: [{ type: String, ref: 'Role' }],
  },
  { timestamps: true },
);

const counterSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  seq: { type: Number, default: 0 },
});

const Basket = new mongoose.Schema(
  {
    id: { type: Number },
  },
  { timestamps: true },
);

const BasketDevice = new mongoose.Schema(
  {
    id: { type: Number },
  },
  { timestamps: true },
);

const Device = new mongoose.Schema(
  {
    id: { type: String, unique: true, default: uuidv4 },
    name: { type: String, unique: true },
    price: { type: Number },
    rating: { type: Number },
    brandId: { type: Number },
    typeId: { type: Number },
    info: { type: String },
    img: { type: String },
  },
  { timestamps: true },
);

const Type = new mongoose.Schema(
  {
    id: { type: Number },
    name: { type: String, unique: true },
  },
  { timestamps: true },
);

const Brand = new mongoose.Schema(
  {
    id: { type: Number },
    name: { type: String, unique: true },
  },
  { timestamps: true },
);

const Rating = new mongoose.Schema(
  {
    id: { type: Number },
    rate: { type: String },
  },
  { timestamps: true },
);

const DeviceInfo = new mongoose.Schema(
  {
    id: { type: Number },
    title: { type: String },
    description: { type: String },
  },
  { timestamps: true },
);

export const UserSchema = mongoose.model('User', User);
export const Counter = mongoose.model('Counter', counterSchema);
export const BasketSchema = mongoose.model('Basket', Basket);
export const BasketDeviceSchema = mongoose.model('BasketDevice', BasketDevice);
export const DeviceSchema = mongoose.model('Device', Device);
export const TypeSchema = mongoose.model('Type', Type);
export const BrandSchema = mongoose.model('Brand', Brand);
export const RatingSchema = mongoose.model('Rating', Rating);
export const DeviceInfoSchema = mongoose.model('DeviceInfo', DeviceInfo);
