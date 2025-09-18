import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { accoutService } from "./accoutService";

export default function Login() {
  let navigate = useNavigate();
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(login);
    axios
      .post(`http://localhost:3000/login`, login)
      .then((res) => {
        console.log(res);
        accoutService.saveToken(res.data.acces_Token);
        navigate("/");
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="flex w-full">
      <div className="w-500 bg-white text-2xl flex items-center"
      
      >
        <span className="px-5">
          <img src="/src/helpers/logo-01.png"className="w-40 mb-5" />
          <p>Bienvenue chez <strong>Graphics System</strong></p>
          <p>Creez vos ordres de fabrications et consultez-les si besoin</p>
        </span>
      </div>
      <form
      action=""
      onSubmit={onSubmit}
      className="flex flex-col w-500 items-center h-[100vh] justify-center"
      style={{backgroundImage:"url('/src/helpers/ChatGPT Image 16 sept. 2025, 16_36_53.png')"}}
    >
      <div>
      </div>
      <div className="w-100 flex flex-col shadow-sm border border-white ">
        <h1 className="shadow-md p-5 text-2xl font-bold text-white border border-b-white">Login</h1>
        <div className="p-5 flex flex-col gap-5"> 
          <input 
          className="input input-sm w-full inset-shadow-sm bg-transparent" 
          name="email" 
          type="email"
          placeholder="Email"
          value={login.email}
          onChange={handleChange}
          />
          <input 
          className="input input-sm w-full inset-shadow-sm bg-transparent" 
          name="password" 
          type="password"
          placeholder="Password"
          value={login.password}
          onChange={handleChange}
          />
        </div>
        <h1 className="text-sm text-yellow-500 px-5"><Link>Je veux m'inscrire</Link></h1>
        <button className="btn btn-sm bg-black text-white font-semibold m-5 shadow-md">Soumettre</button>
      </div>
    </form>
    </div>
  );
}
