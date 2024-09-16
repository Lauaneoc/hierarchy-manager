import { Outlet } from "react-router-dom";
import { Header } from "../../view/components";

export function DefaultLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow bg-gray-300 p-4">
        <Outlet />
      </div>
    </div>
  );
}
