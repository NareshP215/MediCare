import React, { useContext, useState } from "react";
import { TiHome } from "react-icons/ti";
import { RiLogoutBoxFill } from "react-icons/ri";
import { AiFillMessage } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaUserDoctor } from "react-icons/fa6";
import { MdAddModerator } from "react-icons/md";
import { IoPersonAddSharp } from "react-icons/io5";
import axios from "axios";
import { Context } from "../main";
import { toast } from "react-toastify";

import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [show, setShow] = useState(false);

  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const navigateTo = useNavigate();

  const gotoHome = () => {
    navigateTo("/");
    setShow(!show);
  };

  const gotoDoctorsPage = () => {
    navigateTo("/doctors");
    setShow(!show);
  };

  const gotoMessagesPage = () => {
    navigateTo("/messages");
    setShow(!show);
  };

  const gotoAddNewDoctor = () => {
    navigateTo("/doctor/addnew");
    setShow(!show);
  };

  const gotoAddNewAdmin = () => {
    navigateTo("/admin/addnew");
    setShow(!show);
  };

  const handleLogout = async () => {
    try {
      const { data } = await axios.get(
        "https://medicare-r4rk.onrender.com/api/v1/user/admin/logout",
        { withCredentials: true }
      );

      toast.success(data.message);

      setIsAuthenticated(false);

      navigateTo("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Logout failed");
    }
  };

  return (
    <>
      <nav
        style={isAuthenticated ? { display: "flex" } : { display: "none" }}
        className={show ? "show sidebar" : "sidebar"}
      >
        <div className="links">
          <TiHome onClick={gotoHome} />
          <FaUserDoctor onClick={gotoDoctorsPage} />
          <MdAddModerator onClick={gotoAddNewAdmin} />
          <IoPersonAddSharp onClick={gotoAddNewDoctor} />
          <AiFillMessage onClick={gotoMessagesPage} />
          <RiLogoutBoxFill onClick={handleLogout} />
        </div>
      </nav>

      <div
        className="wrapper"
        style={isAuthenticated ? { display: "flex" } : { display: "none" }}
      >
        <GiHamburgerMenu className="hamburger" onClick={() => setShow(!show)} />
      </div>
    </>
  );
};

export default Sidebar;
