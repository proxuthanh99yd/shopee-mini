import { useDispatch, useSelector } from "react-redux";
import { updateUserProfile } from "../../features/client/account/accountThunkApi";
import { useEffect } from "react";
import { useRef } from "react";
import { toast } from "react-toastify";

export default function ProfilePage() {
    const { user, status, authToken, isAuthenticating } = useSelector(
        (state) => state.account,
    );
    const dispatch = useDispatch();
    const { address, email, name, phone, gender } = user;
    const toastId = useRef(null);
    useEffect(() => {
        if (status === "updating") {
            toastId.current = toast.loading("Updating");
        }
        if (status === "updated") {
            toast.update(toastId.current, {
                render: "Update success!",
                type: "success",
                isLoading: false,
                autoClose: 2000,
            });
        }
        if (status === "failed") {
            toast.update(toastId.current, {
                render: "Update failed!",
                type: "error",
                isLoading: false,
                autoClose: 2000,
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [status]);
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        dispatch(
            updateUserProfile({
                authToken,
                body: {
                    name: formData.get("name"),
                    address: formData.get("address"),
                    gender: formData.get("gender"),
                },
            }),
        );
    };
    if (isAuthenticating) {
        return (
            <div className="flex h-full w-full items-center justify-center">
                <div className="loading">
                    <div className="loadingSpinner">
                        <div>
                            <div></div>
                        </div>
                        <div>
                            <div></div>
                        </div>
                        <div>
                            <div></div>
                        </div>
                        <div>
                            <div></div>
                        </div>
                        <div>
                            <div></div>
                        </div>
                        <div>
                            <div></div>
                        </div>
                        <div>
                            <div></div>
                        </div>
                        <div>
                            <div></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    return (
        <div className="w-full px-6 shadow-sm">
            <div className="border-b py-4">
                <h2 className="text-lg">My Profile</h2>
                <p className="text-sm text-neutral-600">
                    Manage and protect your account
                </p>
            </div>
            <form onSubmit={handleSubmit} className="mt-6 flex pb-3">
                <div className="basis-9/12">
                    <table className="w-full border-collapse border border-neutral-400">
                        <tbody>
                            <tr>
                                <td className="w-4/12 border border-neutral-400 p-4 text-right text-neutral-500">
                                    Name
                                </td>
                                <td className="border border-neutral-400 p-4">
                                    <input
                                        defaultValue={name}
                                        name="name"
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
                                    <span className="mr-2">{email}</span>
                                </td>
                            </tr>
                            <tr>
                                <td className="w-4/12 border border-neutral-400 p-4 text-right text-neutral-500">
                                    Phone Number
                                </td>
                                <td className="border border-neutral-400 p-4">
                                    <span className="mr-2">{phone}</span>
                                </td>
                            </tr>
                            <tr>
                                <td className="w-4/12 border border-neutral-400 p-4 text-right text-neutral-500">
                                    Gender
                                </td>
                                <td className="flex items-center gap-6 border border-neutral-400 p-4">
                                    <div className="flex gap-1">
                                        <input
                                            defaultChecked={gender == 0}
                                            value={0}
                                            type="radio"
                                            name="gender"
                                            id="male"
                                        />
                                        <label htmlFor="male">Male</label>
                                    </div>
                                    <div className="flex gap-1">
                                        <input
                                            defaultChecked={gender == 1}
                                            value={1}
                                            type="radio"
                                            name="gender"
                                            id="female"
                                        />
                                        <label htmlFor="female">Female</label>
                                    </div>
                                    <div className="flex gap-1">
                                        <input
                                            defaultChecked={gender == 2}
                                            value={2}
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
                                    Address
                                </td>
                                <td className="flex items-center gap-6 border border-neutral-400 p-4">
                                    <textarea
                                        defaultValue={address}
                                        name="address"
                                        className="flex-1"
                                    ></textarea>
                                </td>
                            </tr>
                            <tr>
                                <td className="w-4/12 border border-neutral-400 p-4 text-right text-neutral-500"></td>
                                <td className="border border-neutral-400 p-4 text-center">
                                    <button
                                        type="submit"
                                        className="rounded-sm bg-orange-600 px-4 py-1 text-neutral-50"
                                    >
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
                    <button
                        disabled
                        className="rounded-sm border px-4 py-1.5 text-sm text-neutral-600"
                    >
                        Select Image
                    </button>

                    <span className="text-xs text-neutral-500">
                        File size: maximum 1 MB
                    </span>
                    <span className="text-xs text-neutral-500">
                        File extension: .JPEG, .PNG
                    </span>
                </div>
            </form>
        </div>
    );
}
