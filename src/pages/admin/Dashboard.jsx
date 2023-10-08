import {
  IoArrowForwardCircle,
  IoBagAddOutline,
  IoBagHandleOutline,
  IoPersonAddOutline,
} from "react-icons/io5";
import Breadcrumb from "../../components/Breadcrumb";
const currentLink = {
  name: "Dashboard",
  path: "/admin/dashboard",
};
const prevLinks = [
  {
    name: "Admin",
    path: "/admin/dashboard",
  },
];
export default function Dashboard() {
  return (
    <div className="p-1">
      <div className="flex justify-between">
        <h2 className="text-xl">Dashboard</h2>
        <Breadcrumb currentLink={currentLink} prevLinks={prevLinks} />
      </div>
      <div className="justify-star mt-4 flex flex-wrap gap-3">
        <div className="group/card  flex-1  cursor-pointer  rounded bg-slate-400">
          <div className="flex justify-between p-3">
            <div className="flex flex-col">
              <span className="text-4xl font-bold text-slate-300">150</span>
              <span className="text-md whitespace-nowrap capitalize text-slate-300">
                new order
              </span>
            </div>
            <div className="overflow-visible">
              <IoBagAddOutline className="text-6xl text-slate-300 transition-transform group-hover/card:scale-125" />
            </div>
          </div>
          <div className="border-t-2 border-slate-500">
            <a
              href="#!"
              className=" text-md flex items-center justify-center whitespace-nowrap font-semibold capitalize text-slate-300 hover:text-slate-50"
            >
              {" "}
              more info <IoArrowForwardCircle />
            </a>
          </div>
        </div>
        <div className="group/card  flex-1  cursor-pointer  rounded bg-slate-400">
          <div className="flex justify-between p-3">
            <div className="flex flex-col">
              <span className="text-4xl font-bold text-slate-300">150</span>
              <span className="text-md whitespace-nowrap capitalize text-slate-300">
                Products
              </span>
            </div>
            <div>
              <IoBagHandleOutline className="text-6xl text-slate-300 transition-transform group-hover/card:scale-125" />
            </div>
          </div>
          <div className="border-t-2 border-slate-500">
            <a
              href="#!"
              className=" text-md flex  items-center justify-center whitespace-nowrap font-semibold capitalize text-slate-300 hover:text-slate-50"
            >
              {" "}
              more info <IoArrowForwardCircle />
            </a>
          </div>
        </div>
        <div className="group/card  flex-1  cursor-pointer  rounded bg-slate-400">
          <div className="flex justify-between p-3">
            <div className="flex flex-col">
              <span className="text-4xl font-bold text-slate-300">150</span>
              <span className="text-md whitespace-nowrap capitalize text-slate-300">
                new order
              </span>
            </div>
            <div>
              <IoBagHandleOutline className="text-6xl text-slate-300 transition-transform group-hover/card:scale-125" />
            </div>
          </div>
          <div className="border-t-2 border-slate-500">
            <a
              href="#!"
              className=" text-md flex items-center justify-center whitespace-nowrap font-semibold capitalize text-slate-300 hover:text-slate-50"
            >
              {" "}
              more info <IoArrowForwardCircle />
            </a>
          </div>
        </div>
        <div className="group/card  flex-1  cursor-pointer  rounded bg-slate-400">
          <div className="flex justify-between p-3">
            <div className="flex flex-col">
              <span className="text-4xl font-bold text-slate-300">150</span>
              <span className="whitespace-nowrap capitalize text-slate-300">
                Users
              </span>
            </div>
            <div>
              <IoPersonAddOutline className="text-6xl text-slate-300 transition-transform group-hover/card:scale-125" />
            </div>
          </div>
          <div className="border-t-2 border-slate-500">
            <a
              href="#!"
              className=" text-md flex items-center justify-center whitespace-nowrap font-semibold capitalize text-slate-300 hover:text-slate-50"
            >
              {" "}
              more info <IoArrowForwardCircle />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
