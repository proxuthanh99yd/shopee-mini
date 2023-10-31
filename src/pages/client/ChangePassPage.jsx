import { useDispatch, useSelector } from "react-redux";
import { setChangePassword } from "../../features/client/account/accountSlice";
import { changePassword as changePass } from "../../features/client/account/accountThunkApi";
import { toast } from "react-toastify";
import { useRef } from "react";
import { useEffect } from "react";
export default function ChangePassPage() {
    const { changePassword, authToken, status } = useSelector(
        (state) => state.account,
    );
    const dispatch = useDispatch();
    const toastId = useRef(null);
    useEffect(() => {
        if (status === "changing") {
            toastId.current = toast.loading("changing password");
        }
        if (status === "changed") {
            toast.update(toastId.current, {
                render: "change password success!",
                type: "success",
                isLoading: false,
                autoClose: 2000,
            });
        }
        if (status === "failed") {
            toast.update(toastId.current, {
                render: "change password failed!",
                type: "error",
                isLoading: false,
                autoClose: 2000,
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [status]);
    const handleChangePassword = () => {
        if (
            changePassword.oldPassword &&
            changePassword.newPassword &&
            changePassword.cfPassword
        ) {
            if (changePassword.newPassword === changePassword.cfPassword) {
                dispatch(changePass({ authToken, body: changePassword }));
            } else {
                toast.error("confirm password not match!", { autoClose: 2000 });
            }
        }
    };
    const handleInput = (e) => {
        dispatch(
            setChangePassword({
                name: e.target.name,
                value: e.target.value,
            }),
        );
    };
    return (
        <div className="inline-flex flex-col gap-2 p-8">
            <div className="flex items-center gap-1">
                <label htmlFor="" className="basis-3/6 text-neutral-500">
                    Old Password
                </label>
                <input
                    value={changePassword.oldPassword}
                    onChange={handleInput}
                    type="password"
                    name="oldPassword"
                    className="rounded-sm border px-3 py-1 focus:outline-none"
                />
            </div>
            <div className="flex items-center gap-1">
                <label htmlFor="" className="basis-3/6 text-neutral-500">
                    New Password
                </label>
                <input
                    value={changePassword.newPassword}
                    onChange={handleInput}
                    type="password"
                    name="newPassword"
                    className="rounded-sm border px-3 py-1 focus:outline-none"
                />
            </div>
            <div className="flex items-center gap-1">
                <label htmlFor="" className="basis-3/6 text-neutral-500">
                    Confirm Password
                </label>
                <input
                    value={changePassword.cfPassword}
                    onChange={handleInput}
                    type="password"
                    name="cfPassword"
                    className="focus:outline-none` rounded-sm border px-3 py-1"
                />
            </div>
            <div className="mt-2 text-center">
                <button
                    disabled={
                        changePassword.oldPassword &&
                        changePassword.newPassword &&
                        changePassword.cfPassword
                            ? false
                            : true
                    }
                    onClick={handleChangePassword}
                    className="rounded-sm bg-orange-600 px-3 py-1 text-neutral-50"
                >
                    Save
                </button>
            </div>
        </div>
    );
}
