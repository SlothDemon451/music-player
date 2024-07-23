"use client";
import MidBar from '../ui/MidBar';
import TopBar from '../ui/TopBar';
import Table from '../ui/Table';
import { useEffect, useState } from 'react';

interface Song {
    title: string;
    artists: string;
    album: string;
    releaseDate: string;
    duration: string;
    cover: string;
}

export default function Main() {
    const [songs, setSongs] = useState<Song[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchSongs = async () => {
            try {
                const response = await fetch('https://music-player-rouge-six.vercel.app/api/songs');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setSongs(data);
            } catch (error) {
                setError((error as Error).message);
            } finally {
                setLoading(false);
            }
        };

        fetchSongs();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }
    return(
        <>
            <div className="w-[69%] h-[84vh] bg-tertiary rounded-xl my-4">
                <div className="w-[97%] mx-auto">
                    <TopBar />
                    <MidBar />
                    <Table songs={songs}/>
                </div>
            </div>
        </>
    );
}