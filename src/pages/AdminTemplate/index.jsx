import { Outlet } from "react-router-dom";
import Topbar from "./_component/Header/Topbar";
import Sidebar from "./_component/Sidebar/Sidebar";
export default function AdminTemplate() {
  return (
    <div className="flex ">
      <Sidebar className="w-1/5" />
      <div className="flex flex-col w-[1280px]">
        <Topbar />
        <Outlet />
      </div>
    </div>
  );
}
