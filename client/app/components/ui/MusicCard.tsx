import Image from "next/image";
import { FaCheckCircle } from "react-icons/fa";
export default function MusicCard() {
    return(
            <div className='flex py-1 w-[35vw]'>
                <Image src="/songs/Not-Like-Us.jpg" alt="Playlist" className="rounded-lg" width={55} height={55} />
                <div className='ml-4 mt-1'>
                    <div className="flex items-center">
                        <h1 className='text-primary text-sm'>MONTAGEM DIAMANTE ROSA - SLOWED</h1>
                        <span className="text-secondary ml-4"><FaCheckCircle /></span>
                    </div>
                    <p className='text-primary text-xs'>Dashie, ISXRO, Crazy Mano, Mc Menor Do Alvorada</p>
                </div>
            </div>
    );
}