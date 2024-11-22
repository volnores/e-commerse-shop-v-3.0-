import mongoose from 'mongoose';

const Role = new mongoose.Schema({
  value: { type: String, unique: true, default: 'USER' },
});

export const RoleShema = mongoose.model('Role', Role);
