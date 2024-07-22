import Image from 'next/image';
import PlaylistCard from './PlaylistCard';
export default function Playlist() {
    return(
        <>
        <div className="w-[95%] mx-auto h-[68vh] bg-tertiary rounded-xl mt-2 p-2 py-4">
            <div className='flex justify-between items-start'>
                <div className='flex items-start ml-2'>
                     <Image src="/icons/playlist.svg" alt="Playlist" className="dark:invert" width={26} height={26} />
                     <h1 className="text-primary text-lg font-bold ml-4">Playlist</h1>
                </div>
                <Image src="/icons/plus.svg" alt="Add Playlist" className="dark:invert" width={26} height={26} />
            </div>
            <PlaylistCard />
        </div>
        
        </>
    );
}