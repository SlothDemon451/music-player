
import MusicCard from "../ui/MusicCard";
import PlayerControls from "../ui/PlayerControls";

interface Song {
    title: string;
    artists: string;
    album: string;
    releaseDate: string;
    duration: string;
    cover: string;
    audioUrl: string;
}

interface FooterProps {
    currentSong: Song | null;
}

export default function Footer({ currentSong }: FooterProps) {
    return(
       <div className="h-[9vh] w-[97vw] mx-auto flex justify-between">
            <MusicCard currentSong={currentSong}/>
            <PlayerControls currentSong={currentSong} />
       </div>
    );
}