import { Schema, model } from 'mongoose';
import { imageSchema } from './common';
import { UserSchema } from './types';
import { setCreatedAt } from './utils';

const userSchema = new Schema<UserSchema>({
  userId: {
    type: Number,
    unique: true,
    immutable: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  hidden: {
    type: Boolean,
    default: false,
    required: true,
  },
  createdAt: {
    type: String,
    required: true,
    immutable: true,
  },
  name: {
    type: String,
    default: '',
  },
  country: {
    type: String,
    default: '',
  },
  birthDate: {
    type: String,
    default: '',
  },
  alias: {
    type: String,
    unique: true,
    sparse: true,
  },
  avatarURL: {
    type: String,
    default: '',
  },
  postsIds: [{ type: Number }],
  friendsIds: [{ type: Number }],
  pendingFriendsIds: [{ type: Number }],
  activationLink: {
    type: String,
    required: true,
  },
  isActivated: {
    type: Boolean,
    default: process.env.MODE === 'dev',
  },
  isOnline: {
    type: Boolean,
    default: true,
  },
  lastSeen: {
    type: String,
  },
  images: [imageSchema],
});

userSchema.pre('validate', setCreatedAt);

const userModel = model('User', userSchema);

export { userModel };
