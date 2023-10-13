import PropTypes from "prop-types";
import { IoTrashBinSharp } from "react-icons/io5";

SelectImage.propTypes = {
    selectedFiles: PropTypes.any,
    setImagePreviews: PropTypes.func,
    setImageSelected: PropTypes.func,
    imagePreviews: PropTypes.array,
    multiple: PropTypes.bool,
    className: PropTypes.string,
    removeImage: PropTypes.func,
    name: PropTypes.string,
};

export default function SelectImage({
    multiple,
    imagePreviews,
    setImagePreviews,
    setImageSelected,
    removeImage,
    className,
    name,
}) {
    const selectFiles = (event) => {
        if (event.target.value.length) {
            if (multiple) {
                const images = [];
                for (let i = 0; i < event.target.files.length; i++) {
                    images.push(URL.createObjectURL(event.target.files[i]));
                }
                setImagePreviews(images);
                setImageSelected(Array.from(event.target.files));
            } else {
                setImagePreviews(URL.createObjectURL(event.target.files[0]));
                setImageSelected(event.target.files[0]);
            }
        }
    };

    return (
        <div className="flex flex-wrap gap-2">
            {multiple &&
                imagePreviews.length > 0 &&
                imagePreviews.map((file, i) => (
                    <div
                        key={file}
                        className={`${className} relative flex cursor-pointer items-center justify-center rounded border border-dashed border-neutral-500 bg-neutral-50`}
                    >
                        <img
                            className="w-2h-24 h-24 object-contain"
                            src={file}
                            alt=""
                        />
                        <button
                            onClick={() => removeImage(i)}
                            className="absolute bottom-0 flex w-full justify-center bg-orange-400 p-1"
                        >
                            <IoTrashBinSharp className="text-xs text-neutral-50" />
                        </button>
                    </div>
                ))}
            <label className={className} htmlFor={name}>
                {!multiple && imagePreviews[0] ? (
                    <div
                        className={`relative flex h-full w-full cursor-pointer items-center justify-center rounded border border-dashed border-neutral-500 bg-neutral-50`}
                    >
                        <img
                            className="w-5h-56 h-56 object-contain"
                            src={imagePreviews[0]}
                            alt=""
                        />
                        <button
                            onClick={() => removeImage(0)}
                            className="absolute bottom-0 flex w-full justify-center bg-orange-400 p-1"
                        >
                            <IoTrashBinSharp className="text-2xl text-neutral-50" />
                        </button>
                    </div>
                ) : (
                    <div
                        className={`relative block h-full w-full cursor-pointer rounded border border-dashed border-neutral-500 bg-neutral-50 p-4 text-orange-500`}
                    >
                        <svg
                            fill="currentColor"
                            viewBox="0 0 23 21"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M18.5 0A1.5 1.5 0 0120 1.5V12c-.49-.07-1.01-.07-1.5 0V1.5H2v12.65l3.395-3.408a.75.75 0 01.958-.087l.104.087L7.89 12.18l3.687-5.21a.75.75 0 01.96-.086l.103.087 3.391 3.405c.81.813.433 2.28-.398 3.07A5.235 5.235 0 0014.053 18H2a1.5 1.5 0 01-1.5-1.5v-15A1.5 1.5 0 012 0h16.5z" />
                            <path d="M6.5 4.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM18.5 14.25a.75.75 0 011.5 0v2.25h2.25a.75.75 0 010 1.5H20v2.25a.75.75 0 01-1.5 0V18h-2.25a.75.75 0 010-1.5h2.25v-2.25z" />
                        </svg>
                        <span className="absolute bottom-0 left-1/2 block w-full -translate-x-1/2 text-center leading-snug">
                            Select image
                        </span>
                    </div>
                )}
            </label>
            <input
                multiple={multiple}
                hidden
                type="file"
                name={name}
                id={name}
                onChange={selectFiles}
            />
        </div>
    );
}
