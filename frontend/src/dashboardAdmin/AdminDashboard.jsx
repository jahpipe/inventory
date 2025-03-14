import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiMenu, FiUser, FiClipboard, FiSettings, FiBarChart, FiDollarSign, FiLogOut } from "react-icons/fi";
import "bootstrap/dist/css/bootstrap.min.css";
import Admin from "./Admin";
import InspectionReport from "./InspectionReport";
import RIS from "./RIS";
import RSMI from "./RSMI";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [consumableOpen, setConsumableOpen] = useState(false);
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

  return (
    <div className="d-flex vh-100">
      <div className="bg-dark text-white d-flex flex-column p-3" style={{ width: isSidebarOpen ? "250px" : "75px", height: "100vh", overflowY: "auto" }}>
        <button className="btn btn-outline-light mb-3 d-md-none" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          <FiMenu />
        </button>
        <h2 className={`fs-5 text-center ${isSidebarOpen ? "d-block" : "d-none"}`}>Admin Panel</h2>

        {currentUser && (
          <div className="d-flex flex-column align-items-center my-3">
            <p className="text-white mb-0">{currentUser.fullName}</p>
            <p className="text-white small">{currentUser.role}</p>
          </div>
        )}

        <nav className="nav flex-column flex-grow-1">
          <button className={`btn btn-dark text-start text-white d-flex align-items-center my-2 ${activeTab === "dashboard" ? "bg-primary" : ""}`} onClick={() => setActiveTab("dashboard")}>
            <FiBarChart className="me-2" /> <span className={isSidebarOpen ? "d-inline" : "d-none"}>Dashboard</span>
          </button>

          <button className={`btn btn-dark text-start text-white d-flex align-items-center my-2 ${activeTab === "users" ? "bg-primary" : ""}`} onClick={() => setActiveTab("users")}>
            <FiUser className="me-2" /> <span className={isSidebarOpen ? "d-inline" : "d-none"}>IAR</span>
          </button>

          <button className="btn btn-dark text-start text-white d-flex align-items-center my-2" onClick={() => setConsumableOpen(!consumableOpen)}>
            <FiClipboard className="me-2" /> <span className={isSidebarOpen ? "d-inline" : "d-none"}>CONSUMABLE</span>
          </button>

          {consumableOpen && (
            <div className="ms-4">
              <button className={`btn btn-dark text-white d-block my-2 ${activeTab === "RIS" ? "bg-primary" : ""}`} onClick={() => setActiveTab("RIS")}>RIS</button>
              <button className={`btn btn-dark text-white d-block my-2 ${activeTab === "RSMI" ? "bg-primary" : ""}`} onClick={() => setActiveTab("RSMI")}>RSMI</button>
            </div>
          )}

          <button className={`btn btn-dark text-start text-white d-flex align-items-center my-2 ${activeTab === "balance" ? "bg-primary" : ""}`} onClick={() => setActiveTab("balance")}>
            <FiDollarSign className="me-2" /> <span className={isSidebarOpen ? "d-inline" : "d-none"}>Manage Balance</span>
          </button>

          <button className={`btn btn-dark text-start text-white d-flex align-items-center my-2 ${activeTab === "reports" ? "bg-primary" : ""}`} onClick={() => setActiveTab("reports")}>
            <FiBarChart className="me-2" /> <span className={isSidebarOpen ? "d-inline" : "d-none"}>Reports</span>
          </button>

          <button className={`btn btn-dark text-start text-white d-flex align-items-center my-2 ${activeTab === "settings" ? "bg-primary" : ""}`} onClick={() => setActiveTab("settings")}>
            <FiSettings className="me-2" /> <span className={isSidebarOpen ? "d-inline" : "d-none"}>Settings</span>
          </button>

          <button className="btn btn-danger text-start text-white d-flex align-items-center mt-auto" onClick={handleLogout}>
            <FiLogOut className="me-2" /> <span className={isSidebarOpen ? "d-inline" : "d-none"}>Logout</span>
          </button>
        </nav>
      </div>

      <div className="flex-grow-1 bg-light p-4" style={{ overflowY: "auto" }}>
        <div className="mt-4">
          {activeTab === "dashboard" && <Admin />}
          {activeTab === "users" && <InspectionReport />}
          {activeTab === "RIS" && <RIS />}
          {activeTab === "RSMI" && <RSMI />}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
