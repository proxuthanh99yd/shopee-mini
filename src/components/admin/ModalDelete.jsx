import PropTypes from "prop-types";
import { memo } from "react";

const ModalDelete = memo(function ModalDelete({
  msg,
  open,
  actionYes,
  actionNo,
}) {
  return (
    <>
      <div
        className={`fixed inset-0 z-[999] bg-slate-400/25 backdrop-blur-sm transition-all ${
          !open ? "invisible opacity-0" : ""
        }`}
        onClick={() => actionNo({ open: false, data: {} })}
      ></div>
      <div
        className={`fixed left-1/2 top-1/4 z-[1000] w-1/4 -translate-x-1/2 rounded-sm bg-slate-300 shadow-xl transition-all ${
          !open ? "invisible opacity-0" : ""
        }`}
      >
        <div className="m-4 text-slate-800">
          <div className="mx-2 my-5">
            <p>DELETE {msg.name} ?</p>
          </div>
          <div className="items-centers m-2 flex justify-between">
            <button
              onClick={() => actionYes(msg.id)}
              className="rounded bg-green-600 px-4 py-1 text-green-100 transition-colors hover:bg-green-500 hover:text-green-50"
            >
              Yes
            </button>
            <button
              onClick={() => actionNo({ open: false, data: {} })}
              className="rounded bg-red-600 px-4 py-1 text-red-100 transition-colors hover:bg-red-500 hover:text-red-50"
            >
              No
            </button>
          </div>
        </div>
      </div>
    </>
  );
});
ModalDelete.propTypes = {
  msg: PropTypes.object,
  open: PropTypes.bool,
  actionNo: PropTypes.func,
  actionYes: PropTypes.func,
};
export default ModalDelete;
