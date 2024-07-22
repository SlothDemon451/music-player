
import MusicCard from "../ui/MusicCard";
import PlayerControls from "../ui/PlayerControls";

export default function Footer() {
    return(
       <div className="h-[9vh] w-[97vw] mx-auto flex justify-between">
            <MusicCard />
            <PlayerControls />
       </div>
    );
}