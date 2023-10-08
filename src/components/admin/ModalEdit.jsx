import { memo, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { IoCloseCircleSharp } from "react-icons/io5";

const ModalEdit = memo(function ModalEdit({
  data,
  field,
  submitAction,
  open,
  setModal,
  size = "w-1/2",
}) {
  const [input, setInput] = useState(() => {
    return field.reduce((curr, { name, value }) => {
      return { ...curr, [name]: value };
    }, {});
  });
  useEffect(() => {
    if (open) {
      setInput(
        field.reduce((curr, { name, value }) => {
          return { ...curr, [name]: value || data[name] };
        }, {}),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);
  const handleInput = (e) => {
    setInput((curr) => ({
      ...curr,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    submitAction({ ...input, id: data.id });
  };
  return (
    <>
      <div
        className={`fixed inset-0 z-[999] bg-slate-400/25 backdrop-blur-sm transition-all ${
          !open ? "invisible opacity-0" : ""
        }`}
        onClick={() => setModal({ open: false, data: {} })}
      ></div>
      <div
        className={`fixed left-1/2 top-1/4 z-[1000] ${size} -translate-x-1/2 rounded-sm bg-slate-400 shadow-xl transition-all ${
          !open ? "invisible opacity-0" : ""
        }`}
      >
        <div className="absolute right-1 top-1 ">
          <IoCloseCircleSharp
            onClick={() => setModal({ open: false, data: {} })}
            className="cursor-pointer rounded-full bg-red-100  text-2xl text-red-600 transition-colors hover:text-red-500"
          />
        </div>
        <form className="m-4 text-slate-800" onSubmit={handleSubmit}>
          {field.map((item) => (
            <div key={item.id} className="m-2 flex flex-col">
              <label htmlFor={item.id}>{item.label}</label>
              <input
                className="mb-2 mt-4 p-1 text-slate-600 focus:outline-slate-300"
                type={item.type}
                name={item.name}
                id={item.id}
                value={input[item.name]}
                onChange={handleInput}
              />
            </div>
          ))}
          <div className="items-centers m-2 flex justify-end">
            <button
              type="submit"
              className="rounded bg-green-600 px-3 py-1 text-green-100 transition-colors hover:bg-green-500 hover:text-green-50"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </>
  );
});

ModalEdit.propTypes = {
  data: PropTypes.object,
  field: PropTypes.array,
  submitAction: PropTypes.func,
  open: PropTypes.bool,
  setModal: PropTypes.func,
  size: PropTypes.string,
};

export default ModalEdit;
