import Sidebar from "@/components/layouts/sidebar/Sidebar";
import { FaBarsStaggered } from "react-icons/fa6";

// The layout component that wraps around the main content and includes a sidebar
const layout = ({ children }) => {
  return (
    <div className="drawer lg:drawer-open">
      {/* The checkbox is used to toggle the sidebar */}
      <input type="checkbox" id="my-drawer-2" className="drawer-toggle" />

      {/* The main content area */}
      <div className="drawer-content">
        {/* The button for opening the sidebar on smaller screens */}
        <label
          htmlFor="my-drawer-2"
          className="drawer-button lg:hidden fixed top-6 right-6"
        >
          {/* Icon for the sidebar toggle button */}
          <FaBarsStaggered className="w-8 h-8 text-primary" />
        </label>

        {/* The main content area, styled with some padding and a background color */}
        <div className="bg-base-200 px-8 py-12 min-h-screen">{children}</div>
      </div>

      {/* The sidebar section */}
      <div className="drawer-side">
        {/* Overlay that can close the sidebar when clicked */}
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        {/* The actual Sidebar component */}
        <Sidebar />
      </div>
    </div>
  );
};

export default layout;
