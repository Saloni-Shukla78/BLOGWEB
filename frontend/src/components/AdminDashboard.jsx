import React, { useEffect, useState } from 'react';
import { CgProfile } from "react-icons/cg";
import { FaHome, FaImage } from "react-icons/fa";
import { IoIosCreate } from "react-icons/io";
import { Outlet, useNavigate } from 'react-router-dom';
import '../styles/MyStyle.css';
import AddBlogs from './AddBlog';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const[admin,setAdmin]=useState("");
    useEffect(()=>{
      const name = localStorage.getItem("name");
      // console.log(name);
      setAdmin(name);
    },[])
  return (
    <div className="d-flex min-vh-100">
      
      {/* Sidebar */}
      <div className="bg-white shadow-lg p-5 d-flex flex-column align-items-start position-fixed rounded rounded-lg" style={{ height: "100vh", width: "260px" ,top :"0"}}>
        
        {/* Profile Icon and Name */}
        <div className="w-100 text-center mb-4">
          <CgProfile className="text-primary" style={{ fontSize: "5rem" }} />
          <h5 className="mt-3 fw-bold text-dark">Welcome {admin}</h5>
        </div>

        {/* Sidebar Links */}
        <div className="w-100 d-flex flex-column gap-3 fw-semibold">
          <div className="sidebar-link">
            <FaHome className="me-2" />
            <span>Home</span>
          </div>
          <div className="sidebar-link" onClick={() => navigate("/admin/all-blogs")}>
            <FaImage className="me-2" />
            <span>All Blogs</span>
          </div>
          <div className="sidebar-link" onClick={() => navigate("/admin/add")}>
            <IoIosCreate className="me-2" />
            <span>Create Blog</span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-grow-1 p-5 bg-light " style={{ marginLeft: "250px" }}>
        <Outlet />
            
      </div>
    </div>
  );
};

export default AdminDashboard;
