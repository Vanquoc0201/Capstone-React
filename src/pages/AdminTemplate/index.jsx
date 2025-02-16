import Topbar from "./_component/Header/Topbar";
import Sidebar from "./_component/Sidebar/Sidebar";
// import Dashboard from "./DashboardPage";
import UserPage from "./UserPage";
export default function AdminTemplate() {
  return (
    <div className="flex ">
      <Sidebar className="w-1/5" />
      <div className="flex flex-col w-[1280px]">
        <Topbar />
        {/* <Dashboard /> */}
        <UserPage />
      </div>
    </div>
  );
}
