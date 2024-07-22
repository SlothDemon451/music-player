import { FaShuffle, FaCirclePlay, FaRepeat, FaVolumeHigh } from "react-icons/fa6";
import { FaBackward, FaForward  } from "react-icons/fa";
export default function PlayerControls() {
    return(
        <div className="flex flex-col w-[70vw]">
            <div className="flex">
                <div className="flex items-center justify-between text-primary mx-auto w-[55vw]">
                    <div>
                        
                    </div>
                    <div className="flex justify-center items-center">
                        <FaShuffle size="24px" className="mr-4" />
                        <FaBackward size="24px" />
                        <FaCirclePlay size="40px" className="mx-4" />
                        <FaForward size="24px" className="mr-4" />
                        <FaRepeat size="24px" />
                    </div>
                    <div className="flex text-primary items-center">
                        <FaVolumeHigh size="22px" className="mr-2"/> 
                        <input type="range" min="0" max="100" className="spotify-slider" />
                    </div>
                </div>
                
            </div>
            <div className="flex items-center w-[60vw] mx-auto mt-1">
                <span className="text-primary text-xs mr-2">00:00</span>
                <input type="range" min="0" max="100" className="flex-1 mr-1 spotify-slider" />
                <span className="text-primary text-xs ml-2">2:43</span>
            </div>
        </div>
    );
}