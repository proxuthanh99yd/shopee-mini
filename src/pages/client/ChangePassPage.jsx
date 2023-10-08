export default function ChangePassPage() {
    return (
        <div className="inline-flex flex-col gap-2 p-8">
            <div className="flex items-center gap-1">
                <label htmlFor="" className="basis-3/6 text-neutral-500">
                    Old Password
                </label>
                <input
                    type="password"
                    name=""
                    id=""
                    className="rounded-sm border px-3 py-1 focus:outline-none"
                />
            </div>
            <div className="flex items-center gap-1">
                <label htmlFor="" className="basis-3/6 text-neutral-500">
                    New Password
                </label>
                <input
                    type="password"
                    name=""
                    id=""
                    className="rounded-sm border px-3 py-1 focus:outline-none"
                />
            </div>
            <div className="flex items-center gap-1">
                <label htmlFor="" className="basis-3/6 text-neutral-500">
                    Confirm Password
                </label>
                <input
                    type="password"
                    name=""
                    id=""
                    className="focus:outline-none` rounded-sm border px-3 py-1"
                />
            </div>
            <div className="mt-2 text-center">
                <button className="rounded-sm bg-orange-600 px-3 py-1 text-neutral-50">
                    Save
                </button>
            </div>
        </div>
    );
}
