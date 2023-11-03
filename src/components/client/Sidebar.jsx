import {
    IoFilterSharp,
    IoListSharp,
    IoStar,
    IoStarOutline,
} from "react-icons/io5";
import PropTypes from "prop-types";
export default function Sidebar({
    brandResults,
    categoryResults,
    handleSetFilter,
    brandFilter,
    categoryFilter,
    handleClearFilter,
}) {
    return (
        <div className="h-full overflow-auto">
            <div className="overflow-auto">
                <h3 className="flex items-center gap-1 border-b border-neutral-500/80 py-2 font-semibold">
                    <IoListSharp className="text-lg font-bold" /> All Categories
                </h3>
                <ul className="py-2 text-sm">
                    {categoryResults.map((category) => {
                        return (
                            <li
                                onClick={() =>
                                    handleSetFilter({
                                        type: "categoryFilter",
                                        value: category.name,
                                    })
                                }
                                key={category.id}
                                className={`cursor-pointer p-1 uppercase ${
                                    categoryFilter.includes(category.name)
                                        ? "text-orange-500"
                                        : ""
                                }`}
                            >
                                {category.name}
                            </li>
                        );
                    })}
                </ul>
            </div>
            <div className="overflow-auto">
                <h3 className="flex items-center gap-1 border-b border-neutral-500/80 py-2 font-semibold">
                    <IoFilterSharp className="text-lg font-bold" /> Search
                    Filter
                </h3>
                <h5 className="pt-2 text-base">Brands</h5>
                <ul className="border-b border-neutral-300/80 py-2 text-sm">
                    {brandResults.map((brand) => {
                        return (
                            <li
                                onClick={() =>
                                    handleSetFilter({
                                        type: "brandFilter",
                                        value: brand.name,
                                    })
                                }
                                key={brand.id}
                                className={`cursor-pointer p-1 uppercase ${
                                    brandFilter.includes(brand.name)
                                        ? "text-orange-500"
                                        : ""
                                }`}
                            >
                                {brand.name}
                            </li>
                        );
                    })}
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

                <button
                    onClick={handleClearFilter}
                    className="mb-4 mt-2 block w-full rounded-sm bg-orange-500 py-2 text-sm text-neutral-50 hover:opacity-80 md:my-1 md:mb-0"
                >
                    Clear all
                </button>
            </div>
        </div>
    );
}

Sidebar.propTypes = {
    brandResults: PropTypes.array,
    categoryResults: PropTypes.array,
    handleSetFilter: PropTypes.func,
    brandFilter: PropTypes.string,
    categoryFilter: PropTypes.string,
    handleClearFilter: PropTypes.func,
};
