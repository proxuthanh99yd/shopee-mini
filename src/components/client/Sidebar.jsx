import {
    IoFilterSharp,
    IoListSharp,
    IoStar,
    IoStarOutline,
} from "react-icons/io5";

export default function Sidebar() {
    return (
        <>
            <div>
                <h3 className="flex items-center gap-1 border-b border-neutral-500/80 py-2 font-semibold">
                    <IoListSharp className="text-lg font-bold" /> All Categories
                </h3>
                <ul className="py-2 text-sm">
                    <li className="p-1">Mobile Phones</li>
                    <li className="p-1">Mobile Phones</li>
                    <li className="p-1">Mobile Phones</li>
                    <li className="p-1">Mobile Phones</li>
                    <li className="p-1">Mobile Phones</li>
                    <li className="p-1">Mobile Phones</li>
                    <li className="p-1">Mobile Phones</li>
                    <li className="p-1">Mobile Phones</li>
                </ul>
            </div>
            <div>
                <h3 className="flex items-center gap-1 border-b border-neutral-500/80 py-2 font-semibold">
                    <IoFilterSharp className="text-lg font-bold" /> Search
                    Filter
                </h3>
                <h5 className="pt-2 text-base">Brands</h5>
                <ul className="border-b border-neutral-300/80 py-2 text-sm">
                    <li className="flex items-center gap-1 py-1">
                        <input type="checkbox" name="" id="" />
                        <label className="uppercase">Mobile Phones</label>
                    </li>
                    <li className="flex items-center gap-1 py-1">
                        <input type="checkbox" name="" id="" />
                        <label className="uppercase">Mobile Phones</label>
                    </li>
                    <li className="flex items-center gap-1 py-1">
                        <input type="checkbox" name="" id="" />
                        <label className="uppercase">Mobile Phones</label>
                    </li>
                    <li className="flex items-center gap-1 py-1">
                        <input type="checkbox" name="" id="" />
                        <label className="uppercase">Mobile Phones</label>
                    </li>
                    <li className="flex items-center gap-1 py-1">
                        <input type="checkbox" name="" id="" />
                        <label className="uppercase">Mobile Phones</label>
                    </li>
                    <li className="flex items-center gap-1 py-1">
                        <input type="checkbox" name="" id="" />
                        <label className="uppercase">Mobile Phones</label>
                    </li>
                    <li className="flex items-center gap-1 py-1">
                        <input type="checkbox" name="" id="" />
                        <label className="uppercase">Mobile Phones</label>
                    </li>
                </ul>
                <h5 className="pt-2 text-base">Price Range</h5>
                <div className="flex flex-col gap-3 border-b border-neutral-300/80 py-2 text-sm">
                    <input
                        type="number"
                        name=""
                        id=""
                        placeholder="Min"
                        className="rounded-sm px-2 py-1 focus:outline-none"
                    />
                    <input
                        type="number"
                        name=""
                        id=""
                        placeholder="Max"
                        className="rounded-sm px-2 py-1 focus:outline-none"
                    />
                </div>
                <h5 className="pt-2 text-base">Rating</h5>
                <div className="flex flex-col gap-3 border-b border-neutral-300/80 py-2 text-sm">
                    <div className="flex items-center gap-1 px-2 text-yellow-500">
                        <IoStar />
                        <IoStar />
                        <IoStar />
                        <IoStar />
                        <IoStar />
                    </div>
                    <div className="flex items-center gap-1 px-2 text-yellow-500">
                        <IoStar />
                        <IoStar />
                        <IoStar />
                        <IoStar />
                        <IoStarOutline />
                        <span className="text-sm text-neutral-500">& Up</span>
                    </div>
                    <div className="flex items-center gap-1 px-2 text-yellow-500">
                        <IoStar />
                        <IoStar />
                        <IoStar />
                        <IoStarOutline />
                        <IoStarOutline />
                        <span className="text-sm text-neutral-500">& Up</span>
                    </div>
                    <div className="flex items-center gap-1 px-2 text-yellow-500">
                        <IoStar />
                        <IoStar />
                        <IoStarOutline />
                        <IoStarOutline />
                        <IoStarOutline />
                        <span className="text-sm text-neutral-500">& Up</span>
                    </div>
                    <div className="flex items-center gap-1 px-2 text-yellow-500">
                        <IoStar />
                        <IoStarOutline />
                        <IoStarOutline />
                        <IoStarOutline />
                        <IoStarOutline />
                        <span className="text-sm text-neutral-500">& Up</span>
                    </div>
                </div>
                <button className="mt-2 block w-full rounded-sm bg-orange-500 py-1 text-sm text-neutral-50 hover:opacity-80">
                    Filter
                </button>
                <button className="mt-2 block w-full rounded-sm bg-orange-500 py-1 text-sm text-neutral-50 hover:opacity-80">
                    Clear all
                </button>
            </div>
        </>
    );
}
