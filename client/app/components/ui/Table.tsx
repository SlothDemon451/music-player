"use client";
import { LuClock3 } from "react-icons/lu";
import Image from "next/image";

interface Song {
    title: string;
    artists: string;
    album: string;
    releaseDate: string;
    duration: string;
    cover: string;
    audioUrl: string;
}

interface TableProps {
    songs: Song[];
    onSongSelect: (song: Song) => void;
}

export default function Table({ songs, onSongSelect }: TableProps) {  
    return (
        <div className="flex flex-col mt-4">
            <table className="table-auto w-full">
                <thead className="border-b-2 border-primary/30">
                    <tr>
                        <th className="w-[3%] text-left text-primary font-medium">#</th>
                        <th className="w-[41%] text-left text-primary font-medium">Title</th>
                        <th className="w-[40%] text-left text-primary font-medium">Album</th>
                        <th className="w-[12%] text-left text-primary font-medium">Release Date</th>
                        <th className="w-[4%] text-left text-primary font-medium"><LuClock3 /></th>
                    </tr>
                </thead>
            </table>
            <div className="h-[47vh] overflow-y-auto scrollbar mt-2">
                <table className="table-auto w-full">
                    <tbody>
                    {songs.map((song, index) => (
                    <tr key={index} onClick={() => onSongSelect(song)}>
                        <td className="w-[3%] text-primary font-normal">{index + 1}</td>
                        <td className="w-[41%] text-primary">
                            <div className='flex py-1'>
                                <Image src={song.cover} alt="Playlist" className="rounded-lg" width={55} height={55} />
                                <div className='ml-4 mt-1'>
                                    <h1 className='text-primary text-md max-w-[19vw] whitespace-nowrap overflow-hidden text-ellipsis'>{song.title}</h1>
                                    <p className='text-primary text-xs max-w-[19vw] whitespace-nowrap overflow-hidden text-ellipsis'>{song.artists}</p>
                                </div>
                            </div>
                        </td>
                        <td className="w-[41%]">
                            <div className="text-primary whitespace-nowrap max-w-[20vw] overflow-hidden text-ellipsis">{song.album}</div>
                        </td>
                        <td className="w-[11%] text-primary text-sm">{song.releaseDate}</td>
                        <td className="w-[4%] text-primary text-sm">{song.duration}</td>
                    </tr>
                ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}