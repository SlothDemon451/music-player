import express from 'express';
import { readdirSync } from 'fs';
import { join } from 'path';
import { parseFile } from 'music-metadata';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { format } from 'date-fns';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const app = express();
const songsFolder = join(__dirname, './songs');

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

app.get('/api/songs', async (req, res) => {
    try {
        const files = readdirSync(songsFolder);
        const songs = [];

        for (const file of files) {
            const filePath = join(songsFolder, file);
            const metadata = await parseFile(filePath);

            let cover = '/default-cover.jpg';
            if (metadata.common.picture && metadata.common.picture.length > 0) {
                const picture = metadata.common.picture[0];
                const base64String = Buffer.from(picture.data).toString('base64');
                cover = `data:${picture.format};base64,${base64String}`;
            }

            const formattedDuration = formatDuration(metadata.format.duration);
            const formattedDate = metadata.common.date ? formatDate(metadata.common.date) : 'Unknown';

            songs.push({
                title: metadata.common.title,
                artists: metadata.common.artist,
                album: metadata.common.album,
                releaseDate: formattedDate,
                duration: formattedDuration,
                cover: cover,
            });
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
