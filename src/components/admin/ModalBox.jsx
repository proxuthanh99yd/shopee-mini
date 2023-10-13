import { memo } from "react";
import PropTypes from "prop-types";
import { IoCloseCircleSharp } from "react-icons/io5";

const ModalBox = memo(function ModalBox({ children, open, closeModal, size }) {
    return (
        <>
            <div
                className={`fixed inset-0 z-[999] bg-slate-400/25 backdrop-blur-sm transition-all ${
                    !open ? "invisible opacity-0" : ""
                }`}
                onClick={() => closeModal()}
            ></div>
            <div
                className={`fixed left-1/2 top-1/4 z-[1000] ${size} -translate-x-1/2 rounded-sm bg-orange-100 shadow-xl transition-all ${
                    !open ? "invisible opacity-0" : ""
                }`}
            >
                <div className="absolute right-1 top-1 ">
                    <IoCloseCircleSharp
                        onClick={() => closeModal()}
                        className="cursor-pointer rounded-full bg-red-100  text-2xl text-red-600 transition-colors hover:text-red-500"
                    />
                </div>
                <form
                    className="m-4 text-slate-800"
                    onSubmit={(e) => e.preventDefault()}
                >
                    {children}
                </form>
            </div>
        </>
    );
});
export default ModalBox;
ModalBox.propTypes = {
    children: PropTypes.node,
    open: PropTypes.bool,
    closeModal: PropTypes.func,
    size: PropTypes.string,
};
