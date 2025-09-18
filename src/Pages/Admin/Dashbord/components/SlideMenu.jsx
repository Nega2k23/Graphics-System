import { Activity, Cpu, Factory, GlobeLock, Handshake, PackageSearch, PersonStanding, User } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

export default function SlideMenu() {
  return (
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-white text-base-content  min-h-full w-70 p-4">
          <div className="flex pl-5">
              <Link to="/"><img src="/src/helpers/LOGO-01.png" className="w-25" /></Link>
          </div>
          <div className="flex flex-col gap-10 mt-20">
            <li>
              <Link to="/client" className="focus:text-yellow-400">
                <PersonStanding />
                Client
              </Link>
            </li>
            <li>
              <Link to="/users" className="focus:text-yellow-400">
                <User />
                Users
              </Link>
            </li>
            <li>
              <Link to="/activite" className="focus:text-yellow-400">
                <Activity/>
                Activite
              </Link>
            </li>
            <li>
              <Link to="/operation" className="focus:text-yellow-400">
                <Handshake />
                Operation
              </Link>
            </li>
            <li>
              <Link to="/matiere" className="focus:text-yellow-400">
                <PackageSearch />
                Matiere
              </Link>
            </li>
            <li>
              <Link to="/ordre_de_fabrication" className="focus:text-yellow-400">
                <Factory/>
                Ordre de Fabrication
              </Link>
            </li>
          </div>
        </ul>
      </div>
  );
}
