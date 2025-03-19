import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiMenu, FiUser, FiClipboard, FiSettings, FiBarChart, FiDollarSign, FiLogOut } from "react-icons/fi";
import "bootstrap/dist/css/bootstrap.min.css";
import Admin from "./Admin";
import InspectionReport from "./InspectionReport";
import RIS from "./Ris";
import RSMI from "./Rsmi";
import Ics from "./Ics";
import Rspi from "./Rspi";
import Regspi from "./Regspi";
import PropertyPlan from "./PropertyPlan";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [consumableOpen, setConsumableOpen] = useState(false);
  const [semiExpandableOpen, setSemiExpandableOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData) {
      setCurrentUser(userData);
    } else {
      navigate("/Login");
    }
  }, [navigate]);

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("user");
      navigate("/Login");
    }
  };

  const renderNavItem = (icon, label, tab, onClick) => (
    <button
      className={`btn btn-dark text-start text-white d-flex align-items-center my-2 ${activeTab === tab ? "bg-primary" : ""}`}
      onClick={onClick || (() => setActiveTab(tab))}
    >
      {icon} <span className={isSidebarOpen ? "ms-2 d-inline" : "d-none"}>{label}</span>
    </button>
  );

  const renderSubMenu = (isOpen, items) => (
    isOpen && (
      <div className="ms-4">
        {items.map(({ tab, label }) => (
          <button
            key={tab}
            className={`btn btn-secondary text-white d-block my-2 ${activeTab === tab ? "bg-info" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {label}
          </button>
        ))}
      </div>
    )
  );

  return (
    <div className="d-flex vh-100">
      <div className={`bg-secondary text-white d-flex flex-column p-4 ${isSidebarOpen ? "w-25" : "w-10"} transition-all shadow`} style={{ height: "100vh", overflowY: "auto" }}>
        <button className="btn btn-light mb-3" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          <FiMenu />
        </button>

        <h2 className={`fs-4 text-center fw-bold ${isSidebarOpen ? "d-block" : "d-none"}`}>Admin Panel</h2>

        {currentUser && (
          <div className="d-flex flex-column align-items-center my-4">
            <p className="text-white mb-1 fs-5">{currentUser.fullName}</p>
            <p className="text-white-50 small">{currentUser.role}</p>
          </div>
        )}

        <nav className="nav flex-column flex-grow-1">
          {renderNavItem(<FiBarChart />, "Dashboard", "dashboard")}
          {renderNavItem(<FiUser />, "IAR", "users")}

          {renderNavItem(<FiClipboard />, "Consumable", null, () => setConsumableOpen(!consumableOpen))}
          {renderSubMenu(consumableOpen, [
            { tab: "RIS", label: "(RIS)" },
            { tab: "RSMI", label: "(RSMI)" },
          ])}

          {renderNavItem(<FiDollarSign />, "Semi-Expandable", null, () => setSemiExpandableOpen(!semiExpandableOpen))}
          {renderSubMenu(semiExpandableOpen, [
            { tab: "ICS", label: "(ICS)" },
            { tab: "RSPI", label: "(RSPI)" },
            { tab: "REGSPI", label: "(REGSPI)" },
          ])}

          {renderNavItem(<FiBarChart />, "Property Plan & Equipment", "propertyPlan")}
          {renderNavItem(<FiSettings />, "Settings", "settings")}

          <button className="btn btn-danger text-start text-white d-flex align-items-center mt-auto" onClick={handleLogout}>
            <FiLogOut className="me-2" /> <span className={isSidebarOpen ? "d-inline" : "d-none"}>Logout</span>
          </button>
        </nav>
      </div>

      <div className="flex-grow-1 bg-white p-5 shadow" style={{ overflowY: "auto" }}>
        <div className="mt-4">
          {activeTab === "dashboard" && <Admin />}
          {activeTab === "users" && <InspectionReport />}
          {activeTab === "RIS" && <RIS />}
          {activeTab === "RSMI" && <RSMI />}
          {activeTab === "ICS" && <Ics />}
          {activeTab === "RSPI" && <Rspi />}
          {activeTab === "REGSPI" && <Regspi />}
          {activeTab === "propertyPlan" && <PropertyPlan />}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
