import axios from 'axios'
import React, { useState } from 'react'
import { accoutService } from './accoutService'
import { useNavigate } from 'react-router-dom';

export default function Sign() {
    let navigate = useNavigate();
    const [sign,setSign] = useState({
        username:"",
        email:"",
        password:""
    })

    const onSubmit = (e) =>{
        e.preventDefautl()
        axios.post("http://localhost:3000/sign",sign)
        .then((res)=>{
            accoutService.saveToken(res.data)
            navigate('/')
        }).catch((err)=>console.log(err))
    
    }
    const onChange = (e) => {
    setSign({ ...sign, [e.target.name]: e.target.value });
  };
  return (
    <form
      action=""
      onSubmit={onSubmit}
      className="flex flex-col items-center h-[100vh] justify-center"
    >
      <img src="/src/helpers/logo-01.png"className="w-50" />
      <fieldset className="fieldset bg-white border-base-300 rounded-box border p-4 w-[50%]">
        <legend className="fieldset-legend text-3xl font-bold">Sign</legend>

        <label className="label">Username</label>
        <input
          type="text"
          className="input w-[100%]"
          name="username"
          value={sign.username}
          onChange={onChange}
          placeholder="Username"
          />

        <label className="label">Email</label>
        <input
          type="email"
          className="input w-[100%]"
          name="email"
          value={sign.email}
          onChange={onChange}
          placeholder="Email"
        />

        <label className="label">Password</label>
        <input
          type="password"
          className="input w-[100%]"
          name="password"
          value={sign.password}
          onChange={onChange}
          placeholder="Password"
        />

        <button className="btn bg-green-400 text-white font-bold mt-4 shadow-md" type="submit">
          Login
        </button>
      </fieldset>
    </form>
  )
}
