import Image from "next/image";
import { FaCheckCircle } from "react-icons/fa";

interface Song {
    title: string;
    artists: string;
    album: string;
    releaseDate: string;
    duration: string;
    cover: string;
    audioUrl: string;
}

interface MusicCardProps {
    currentSong: Song | null;
}

export default function MusicCard({ currentSong }: MusicCardProps) {
    if (!currentSong) {
        return <div className='flex py-1 w-[35vw] text-primary'>No song selected</div>;
    }

    return(
            <div className='flex py-1 w-[35vw]'>
                <Image src={currentSong.cover} alt={currentSong.title} className="rounded-lg" width={55} height={55} />
                <div className='ml-4 mt-1'>
                    <div className="flex items-center">
                        <h1 className='text-primary text-sm'>{currentSong.title}</h1>
                        <span className="text-secondary ml-4"><FaCheckCircle /></span>
                    </div>
                    <p className='text-primary text-xs'>{currentSong.artists}</p>
                </div>
            </div>
    );
}