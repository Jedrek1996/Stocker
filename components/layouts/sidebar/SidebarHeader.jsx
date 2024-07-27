import { AiOutlineStock } from "react-icons/ai";
import Themetoggle from "../theme/Themetoggle";
const SidebarHeader = () => {
  return (
    <div className="flex items-center mb-4 gap-4 px-4 ">
      <div className="flex items-center mr-auto">
        <h2 className="text-xl font-extrabold text-primary mr-1">Stocker</h2>
        <AiOutlineStock className="w-10 h-10 text-primary" />
      </div>
      <Themetoggle />
    </div>
  );
};
export default SidebarHeader;
