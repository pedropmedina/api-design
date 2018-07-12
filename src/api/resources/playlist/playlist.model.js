import mongoose from 'mongoose';

const schema = {};

const playlistSchema = new mongoose.Schema(schema);

export const Playlist = mongoose.model('playlist', playlistSchema);
