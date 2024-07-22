import Logo from "../ui/Logo";
import Playlist from "../ui/Playlist";
export default function Sidebar() {
    return (
        <aside className="w-[30%] py-4">
            <Logo />
            <Playlist />
        </aside>
    );
}