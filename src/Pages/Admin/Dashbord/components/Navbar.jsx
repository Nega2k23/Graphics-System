import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { accoutService } from "../../../Authentication/login/accoutService";
import { PowerOff, Settings , User } from "lucide-react";

export default function Navbar() {
  let navigate = useNavigate()
  const logout = () =>{
    accoutService.logout()
    navigate("/auth")
  }
  return (
    <div className="flex gap-2">
      <label htmlFor="my-drawer-2" className="drawer-button lg:hidden absolute left-2">
        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {" "}
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h7"
            />{" "}
          </svg>
        </div>
      </label>
     <div className="flex gap-5 items-center">
      <input
        type="text"
        placeholder="Search"
        className="input input-sm input-bordered w-24 md:w-auto inset-shadow-sm"
      />
      <button className="btn btn-ghost btn-circle tooltip tooltip-bottom" data-tip="Notifications">
        <div className="indicator">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {" "}
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />{" "}
          </svg>
          <span className="badge badge-xs bg-red-400 z-0 indicator-item"></span>
        </div>
      </button>
      <div className="dropdown dropdown-end">
        <div
          tabIndex={0}
          role="button"
          className="btn btn-ghost btn-circle avatar"
        >
          <div className="w-10 rounded-full">
            <img
              alt="Tailwind CSS Navbar component"
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
            />
          </div>
        </div>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
        >
          <li>
            <Link className="flex" to="/profile"><User/>Profil</Link>
          </li>
          <li>
            <a><Settings/> Settings</a>
          </li>
          <li>
            <Link to="/auth" onClick={logout}><PowerOff/> Logout</Link>
          </li>
        </ul>
      </div>
     </div>
    </div>
  );
}
