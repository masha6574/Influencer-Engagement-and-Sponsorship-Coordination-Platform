// Components/SponsorDashboard/Sidebar.jsx
import { NavLink } from "react-router-dom";
import { FaHome, FaBullhorn, FaEnvelope, FaCog } from "react-icons/fa";

const Sidebar = () => {
    return (
        <div className="w-64 h-screen bg-white border-r shadow-lg p-5 fixed">
            <h2 className="text-xl font-bold mb-6 text-center">Sponsor Panel</h2>
            <nav className="flex flex-col space-y-4">
                <NavLink to="/sponsor-dashboard/home" className="flex items-center space-x-2 hover:text-blue-600">
                    <FaHome /> <span>Home</span>
                </NavLink>
                <NavLink to="/sponsor-dashboard/campaign" className="flex items-center space-x-2 hover:text-blue-600">
                    <FaBullhorn /> <span>Campaigns</span>
                </NavLink>
                <NavLink to="/sponsor-dashboard/messages" className="flex items-center space-x-2 hover:text-blue-600">
                    <FaEnvelope /> <span>Messages</span>
                </NavLink>
                <NavLink to="/sponsor-dashboard/settings" className="flex items-center space-x-2 hover:text-blue-600">
                    <FaCog /> <span>Settings</span>
                </NavLink>
            </nav>
        </div>
    );
};

export default Sidebar;
