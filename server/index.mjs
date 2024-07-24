import express from 'express';
import { readdirSync } from 'fs';
import { join } from 'path';
import { parseFile } from 'music-metadata';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { format } from 'date-fns';
import dotenv from 'dotenv';
import cloudinary from 'cloudinary';
import mongoose from 'mongoose';
import Song from './models/Song.js'; // Import the Song model

dotenv.config();
console.log('MONGODB_URI:', process.env.MONGODB_URI);

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const app = express();
const songsFolder = join(__dirname, './songs');

// Configure Cloudinary
cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));

// Use the CORS middleware to allow requests from specific origins
app.use(cors({
    origin: 'https://zyn-station.vercel.app/' // Allow requests from this origin
}));

function formatDuration(duration) {
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

function formatDate(date) {
    return format(new Date(date), 'd MMM yyyy');
}

async function uploadToCloudinary(filePath) {
    return new Promise((resolve, reject) => {
        cloudinary.v2.uploader.upload(filePath, { resource_type: 'video' }, (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result.secure_url);
            }
        });
    });
}

app.get('/api/songs', async (req, res) => {
    try {
        const files = readdirSync(songsFolder);
        const songs = [];

        for (const file of files) {
            const existingSong = await Song.findOne({ fileName: file });

            if (existingSong) {
                songs.push(existingSong);
                continue;
            }

            const filePath = join(songsFolder, file);
            const metadata = await parseFile(filePath);

            // Upload the audio file to Cloudinary
            const audioUrl = await uploadToCloudinary(filePath);

            let cover = '/default-cover.jpg';
            if (metadata.common.picture && metadata.common.picture.length > 0) {
                const picture = metadata.common.picture[0];
                const base64String = Buffer.from(picture.data).toString('base64');
                cover = `data:${picture.format};base64,${base64String}`;
            }

            const formattedDuration = formatDuration(metadata.format.duration);
            const formattedDate = metadata.common.date ? formatDate(metadata.common.date) : 'Unknown';

            const song = new Song({
                title: metadata.common.title,
                artists: metadata.common.artist,
                album: metadata.common.album,
                releaseDate: formattedDate,
                duration: formattedDuration,
                cover: cover,
                audioUrl: audioUrl,
                fileName: file,
            });

            await song.save();
            songs.push(song);
        }

        res.json(songs);
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).send('Error reading songs folder');
    }
});

app.listen(3001, () => {
    console.log('Server is running on port 3001');
});
