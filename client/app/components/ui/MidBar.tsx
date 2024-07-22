import { IoSearch } from "react-icons/io5";
import { FaCirclePlay } from "react-icons/fa6";
export default function MidBar() {
    return(
        <div className="flex mt-4">
            <div className="flex justify-center text-secondary items-center w-max">
              <FaCirclePlay size="50px"/>
            </div>
            <div className="flex items-center w-[85%] ml-6 relative">
              <input type="search" placeholder="What do you want to play..." className="rounded-full bg-primary/5 text-primary pl-10 pr-2 py-2 w-full" />
              <span className="absolute left-0 pl-3 flex items-center text-primary h-full">
                <IoSearch size="24px" />
              </span>
            </div>
        </div>
    );
}