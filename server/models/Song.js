import mongoose from 'mongoose';

const songSchema = new mongoose.Schema({
    title: String,
    artists: String,
    album: String,
    releaseDate: String,
    duration: String,
    cover: String,
    audioUrl: String,
    fileName: String // To track the file and avoid re-uploading
});

const Song = mongoose.model('Song', songSchema);

export default Song;
