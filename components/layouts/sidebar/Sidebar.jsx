import Profile from "../profile/Profile";
import Navlinks from "./Navlinks";
import SidebarHeader from "./SidebarHeader";

const Sidebar = () => {
  return (
    <div className="px-4 w-80 min-h-full bg-base-300 py-12 grid grid-rows-[auto,1fr,auto]">
      <SidebarHeader />
      <Navlinks />
      <Profile />
    </div>
  );
};

export default Sidebar;
