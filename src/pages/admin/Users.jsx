import { IoSearch } from "react-icons/io5";
import Paginate from "../../components/Paginate";
import { dateFormat } from "../../utils/helper";
import Breadcrumb from "../../components/Breadcrumb";
import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import {
    changeStatusUser,
    fetchUsers,
} from "../../features/admin/account/accountThunkApi";
import { setCurrentPage } from "../../features/admin/account/accountSlice";
const currentLink = {
    name: "Users",
    path: "/admin/users",
};

const prevLinks = [
    {
        name: "Admin",
        path: "/admin/dashboard",
    },
];
export default function Users() {
    const {
        currentPage,
        totalPage,
        results,
        isLoading,
        isError,
        toastLoading,
        toastSuccess,
        toastError,
        loadingMessage,
        successMessage,
        errorMessage,
    } = useSelector((state) => state.managerUsers);
    const dispatch = useDispatch();
    const toastId = useRef(null);
    useEffect(() => {
        if (toastLoading) {
            toastId.current = toast.loading(loadingMessage);
        }
        if (toastSuccess) {
            toast.update(toastId.current, {
                render: successMessage,
                type: "success",
                isLoading: false,
                autoClose: 2000,
            });
        }
        if (toastError) {
            toast.update(toastId.current, {
                render: errorMessage,
                type: "error",
                isLoading: false,
                autoClose: 2000,
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [toastLoading, toastSuccess, toastError]);
    useEffect(() => {
        dispatch(fetchUsers({ page: currentPage }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage]);
    const handlePageClick = ({ selected }) => {
        dispatch(setCurrentPage({ currentPage: selected + 1 }));
    };
    const handleChangeStatus = (id) => {
        dispatch(changeStatusUser(id));
    };
    if (isLoading) {
        return <p>Loading ...</p>;
    }
    if (isError) {
        return <p>Error ...</p>;
    }
    return (
        <>
            <div className="p-1">
                <div className="mt-2 flex justify-between gap-4">
                    <h2 className="text-xl">Users </h2>
                    <form
                        className="relative flex-1"
                        onSubmit={(e) => e.preventDefault()}
                    >
                        <input
                            // value={searchParam}
                            // onChange={(e) =>
                            //     dispatch(
                            //         setSearchParam({
                            //             searchParam: e.target.value,
                            //         }),
                            //     )
                            // }
                            type="search"
                            className="w-full rounded-sm px-3 py-1 focus:outline-none"
                        />
                        <button
                            // onClick={handleSearch}
                            className="absolute right-0 top-1/2 -translate-y-1/2 rounded-sm bg-orange-400 px-8 py-1.5 text-neutral-50 "
                        >
                            <IoSearch />
                        </button>
                    </form>
                    <Breadcrumb
                        currentLink={currentLink}
                        prevLinks={prevLinks}
                    />
                </div>
                <div className="mt-4">
                    <div>
                        <div className="hidden rounded-t bg-orange-400 p-1 font-semibold text-neutral-50 md:flex">
                            <div className="mx-1 basis-1/12">No.</div>
                            <div className="mx-1 basis-1/12">ID</div>
                            <div className="mx-1 flex-1">Name</div>
                            <div className="mx-1 basis-2/12">Updated at</div>
                            <div className="mx-1 basis-3/12 text-center">
                                Status
                            </div>
                        </div>
                        {/* table item start */}
                        {results.map((user, index) => {
                            const { id, name, updated_at, status } = user;
                            return (
                                <div
                                    key={id}
                                    className="my-2 rounded bg-orange-50 pb-2 pl-3 transition-colors hover:bg-orange-100 md:my-0 md:flex md:items-center md:rounded-none md:border-b md:p-1"
                                >
                                    <div className="mx-1 basis-1/12">
                                        <span className="font-semibold md:hidden">
                                            No. :{" "}
                                        </span>
                                        {index + 1}
                                    </div>
                                    <div className="mx-1 basis-1/12">
                                        <span className="font-semibold md:hidden">
                                            ID :{" "}
                                        </span>
                                        {id}
                                    </div>
                                    <div className="mx-1 flex-1 cursor-pointer rounded-sm py-1">
                                        <span className="font-semibold md:hidden">
                                            Name :{" "}
                                        </span>
                                        {name}
                                    </div>
                                    <div className="mx-1 basis-2/12">
                                        <span className="font-semibold md:hidden">
                                            Updated at :
                                        </span>
                                        {dateFormat(new Date(updated_at))}
                                    </div>
                                    <div className="mx-1 basis-3/12 text-center">
                                        <span className="font-semibold md:hidden">
                                            Action :{" "}
                                        </span>
                                        <button
                                            onClick={() =>
                                                handleChangeStatus(id)
                                            }
                                            className={`${
                                                status
                                                    ? "bg-green-600"
                                                    : "bg-neutral-600"
                                            } transition-color ml-1 inline-flex h-5 w-5 items-center gap-1 rounded-full ${
                                                status
                                                    ? "hover:bg-green-400"
                                                    : "hover:bg-neutral-400"
                                            }`}
                                        ></button>
                                    </div>
                                </div>
                            );
                        })}

                        {/* table item end */}
                    </div>
                </div>
                <Paginate
                    handlePageClick={handlePageClick}
                    pageCount={totalPage}
                    currentPage={currentPage}
                />
            </div>
        </>
    );
}
