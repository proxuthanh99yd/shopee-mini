export default function ProfilePage() {
    return (
        <div className="w-full px-6 shadow-sm">
            <div className="border-b py-4">
                <h2 className="text-lg">My Profile</h2>
                <p className="text-sm text-neutral-600">
                    Manage and protect your account
                </p>
            </div>
            <div className="mt-6 flex pb-3">
                <div className="basis-9/12">
                    <table className="w-full border-collapse border border-neutral-400">
                        <tbody>
                            <tr>
                                <td className="w-4/12 border border-neutral-400 p-4 text-right text-neutral-500">
                                    Username
                                </td>
                                <td className="border border-neutral-400 p-4">
                                    proxuthanh
                                </td>
                            </tr>
                            <tr>
                                <td className="w-4/12 border border-neutral-400 p-4 text-right text-neutral-500">
                                    Name
                                </td>
                                <td className="border border-neutral-400 p-4">
                                    <input
                                        type="text"
                                        className="w-full border p-2 focus:outline-none"
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td className="w-4/12 border border-neutral-400 p-4 text-right text-neutral-500">
                                    Email
                                </td>
                                <td className="border border-neutral-400 p-4">
                                    <span className="mr-2">
                                        pr************@gmail.com
                                    </span>
                                    <button className="text-blue-500 underline">
                                        Change
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td className="w-4/12 border border-neutral-400 p-4 text-right text-neutral-500">
                                    Phone Number
                                </td>
                                <td className="border border-neutral-400 p-4">
                                    <span className="mr-2">*********47</span>
                                    <button className="text-blue-500 underline">
                                        Change
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td className="w-4/12 border border-neutral-400 p-4 text-right text-neutral-500">
                                    Gender
                                </td>
                                <td className="flex items-center gap-6 border border-neutral-400 p-4">
                                    <div className="flex gap-1">
                                        <input
                                            type="radio"
                                            name="gender"
                                            id="male"
                                        />
                                        <label htmlFor="male">Male</label>
                                    </div>
                                    <div className="flex gap-1">
                                        <input
                                            type="radio"
                                            name="gender"
                                            id="female"
                                        />
                                        <label htmlFor="female">Female</label>
                                    </div>
                                    <div className="flex gap-1">
                                        <input
                                            type="radio"
                                            name="gender"
                                            id="other"
                                        />
                                        <label htmlFor="other">Other</label>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td className="w-4/12 border border-neutral-400 p-4 text-right text-neutral-500">
                                    Date of birth
                                </td>
                                <td className="flex items-center gap-6 border border-neutral-400 p-4">
                                    <div className="flex-1">
                                        <select
                                            className="w-full rounded-sm bg-neutral-200 p-1"
                                            name=""
                                            id=""
                                        >
                                            {Array.from(
                                                { length: 31 },
                                                (_, i) => {
                                                    return (
                                                        <option
                                                            value={i + 1}
                                                            key={i + 1}
                                                        >
                                                            {i + 1}
                                                        </option>
                                                    );
                                                },
                                            )}
                                        </select>
                                    </div>
                                    <div className="flex-1">
                                        <select
                                            className="w-full rounded-sm bg-neutral-200 p-1"
                                            name=""
                                            id=""
                                        >
                                            {Array.from(
                                                { length: 12 },
                                                (_, i) => {
                                                    return (
                                                        <option
                                                            value={i + 1}
                                                            key={i + 1}
                                                        >
                                                            {i + 1}
                                                        </option>
                                                    );
                                                },
                                            )}
                                        </select>
                                    </div>
                                    <div className="flex-1">
                                        <select
                                            className="w-full rounded-sm bg-neutral-200 p-1"
                                            name=""
                                            id=""
                                        >
                                            {Array.from(
                                                { length: 100 },
                                                (_, i) => {
                                                    return (
                                                        <option
                                                            value={2023 - i}
                                                            key={2023 - i}
                                                        >
                                                            {2023 - i}
                                                        </option>
                                                    );
                                                },
                                            )}
                                        </select>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td className="w-4/12 border border-neutral-400 p-4 text-right text-neutral-500"></td>
                                <td className="border border-neutral-400 p-4 text-center">
                                    <button className="rounded-sm bg-orange-600 px-4 py-1 text-neutral-50">
                                        Save
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="ml-14 flex basis-3/12 flex-col items-center gap-4 border-l">
                    <img
                        src="../public/images/book.jpg"
                        className="h-28 w-28 rounded-full object-cover shadow"
                        alt=""
                    />
                    <button className="rounded-sm border px-4 py-1.5 text-sm text-neutral-600">
                        Select Image
                    </button>

                    <span className="text-xs text-neutral-500">
                        File size: maximum 1 MB
                    </span>
                    <span className="text-xs text-neutral-500">
                        File extension: .JPEG, .PNG
                    </span>
                </div>
            </div>
        </div>
    );
}
