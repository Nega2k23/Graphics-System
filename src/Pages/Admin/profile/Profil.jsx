import React, {  useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { accoutService } from '../../Authentication/login/accoutService'
import { ClipboardEdit, ClipboardPen, CornerDownLeft, Ellipsis, PowerOff, User2, X } from 'lucide-react'

export default function Profil() {
  const [allUser,setAllUser] = useState([])
  const [editUsers, setEditUsers] = useState({
      id: "",
      name: "",
      adresse: "",
      service: "",
      password: "",
      dateRealisation: "",
    });
  useEffect(()=>{
    axios.get(`http://localhost:3000/users/3`)
  .then((res)=>{
    setAllUser(res.data)
  })
  .catch((err)=>{console.log(err)})
  },[])

  const onEdit = (e) =>{
    e.preventDefault()
    axios.put(`http://localhost:3000/users/3`,editUsers)
    .then((res)=>{console.log(res)})
    .catch((err)=>{console.log(err)})
  } 

  const handleEdit = (id,name,adresse,service,password,dateRealisation) =>{
    setEditUsers({
      id:id,
      name:name,
      adresse:adresse,
      service:service,
      password:password,
      dateRealisation:dateRealisation
    })
    document.getElementById('my_modal_1').showModal();
  }
  
  let navigate = useNavigate()
  const logout = () =>{
    accoutService.logout()
    navigate("/auth")
  }

  return (
    <div className='p-2 flex flex-col gap-5'>
        <div className="breadcrumbs text-sm flex">
          <ul>
            <li>
              <Link to="/">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="h-4 w-4 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  ></path>
                </svg>
                Dashbord
              </Link>
            </li>
            <li className="text-yellow-400">
              <Link to="/profile">
                <User2/>
                Profil
              </Link>
            </li>
          </ul>
        </div>
        
        <div className='profil bg-white'>
          <div className='profil-header shadow-sm p-5 flex justify-between'>
            <span className='flex gap-2'>
              <div className='flex relative'>
              <h1 className='btn btn-sm btn-circle bg-base-200'>G</h1>
              <span className="badge badge-xs bg-green-300 z-0 indicator-item absolute top-0 right-[-5px]"></span>
              </div>
              <h1 className='flex gap-2 items-center font-bold'>{allUser.name} |<strong className='text-sm text-neutral-400 italic'>{allUser.service}</strong></h1>
            </span>
            <div className="dropdown dropdown-end">
              <button tabIndex={0} className='btn btn-sm btn-circle btn-ghost'><Ellipsis/></button>
              <ul tabIndex={0} className="dropdown-content mt-5 menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                <li onClick={()=>{handleEdit(
                  allUser.id,
                  allUser.name,
                  allUser.adresse,
                  allUser.service,
                  allUser.password,
                  allUser.dateRealisation
                )}}><a><ClipboardPen/>Modifier Profil</a></li>
                <li><Link to="/"><CornerDownLeft/>Retour au Dashbord</Link></li>
                <li><Link to="/auth" onClick={logout}><PowerOff/>Deconnexion</Link></li>
              </ul>
            </div>
          </div>
          <div className='profil-content pb-2'>

            <div className='grid grid-cols-2 gap-10 text-neutral-500 border border-neutral-200 shadow-sm p-5 m-5'>
              <span>Nom de Compte : {allUser.name}</span>
              <span>Adresse email : {allUser.adresse}</span>
              <span>Service : {allUser.service}</span>
              <span>Numero de telephone :</span>
              <span>Mot de passe : {allUser.password}</span>
              <span>Date de creation du compte : {allUser.dateRealisation}</span>
            </div>
          </div>
          </div>
          <dialog id="my_modal_1" className="modal">
            <form method="dialog" className="modal-box flex flex-col gap-5 bg-white border-base-300 rounded-box w-300" onSubmit={onEdit}>
              
                <div className="flex justify-between items-center">
                  <h1 className="text-2xl font-bold">Modifier Profil</h1>
                  <button className="btn btn-sm btn-circle btn-ghost text-red-500 tooltip tooltip-left" data-tip="Fermer" type="reset" onClick={()=>{document.getElementById("my_modal_1").close();}}><X/></button>
                </div>
              <div className="grid grid-cols-2 gap-2">
                <span>
                <label className="input input-sm inset-shadow-sm validator w-[100%]">
                  <svg
                    className="h-[1em] opacity-50"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <g
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="2.5"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
                      <circle
                        cx="16.5"
                        cy="7.5"
                        r=".5"
                        fill="currentColor"
                      ></circle>
                    </g>
                  </svg>
                  <input
                    type="number"
                    required
                    placeholder="ID"
                    pattern="[0-100]*"
                    minlength="3"
                    maxlength="30"
                    name="id"
                    value={editUsers.id}
                    onChange={(e)=>{setEditUsers((prev)=>({...prev,id:e.target.value}))}}
                  />
                </label>
                <div className="validator-hint">error id</div>
                </span>
                <span>
                <label className="input input-sm inset-shadow-sm validator w-[100%]">
                  <svg
                    className="h-[1em] opacity-50"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <g
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="2.5"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </g>
                  </svg>
                  <input
                    type="text"
                    required
                    placeholder="Username"
                    pattern="[A-Za-z][A-Za-z0-9\-]*"
                    minlength="3"
                    maxlength="30"
                    name="name"
                    value={editUsers.name}
                    onChange={(e)=>{setEditUsers((prev)=>({...prev,name:e.target.value}))}}
                  />
                </label>
                <div className="validator-hint">error Username</div>
                </span>
                <span>
                <label className="input input-sm inset-shadow-sm validator w-[100%]">
                  <svg
                    className="h-[1em] opacity-50"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <g
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="2.5"
                      fill="none"
                      stroke="currentColor"
                    >
                      <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                    </g>
                  </svg>
                  <input
                    type="email"
                    placeholder="mail@site.com"
                    pattern="[a-z-0-9]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                    required
                    name="adresse"
                    value={editUsers.adresse}
                    onChange={(e)=>{setEditUsers((prev)=>({...prev,adresse:e.target.value}))}}
                  />
                </label>
                <div className="validator-hint hidden">
                  Enter valid email address
                </div>
                </span>
                <span>
                <label className="input input-sm inset-shadow-sm validator w-[100%]">
                  <svg
                    className="h-[1em] opacity-50"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <g
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="2.5"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </g>
                  </svg>
                  <input
                    type="text"
                    required
                    placeholder="Service"
                    pattern="[A-Za-z ][ A-Za-z0-9\-]*"
                    minlength="3"
                    maxlength="30"
                    name="service"
                    value={editUsers.service}
                    onChange={(e)=>{setEditUsers((prev)=>({...prev,service:e.target.value}))}}
                  />
                </label>
                <div className="validator-hint">error Service</div>
                </span>
                <span>
                <label className="input input-sm inset-shadow-sm validator w-[100%]">
                  <svg
                    className="h-[1em] opacity-50"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <g
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="2.5"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
                      <circle
                        cx="16.5"
                        cy="7.5"
                        r=".5"
                        fill="currentColor"
                      ></circle>
                    </g>
                  </svg>
                  <input
                    type="password"
                    required
                    placeholder="Password"
                    minlength="8"
                    pattern="[0-9]*"
                    name="password"
                    value={editUsers.password}
                    onChange={(e)=>{setEditUsers((prev)=>({...prev,password:e.target.value}))}}
                  />
                </label>
                <div className="validator-hint">
                  remplissez correctement ce champ
                </div>
                </span>
                <span>
                  <input
                    type="date"
                    className="input input-sm inset-shadow-sm validator w-[100%]"
                    required
                    name="dateRealisation"
                    value={editUsers.dateRealisation}
                    onChange={(e)=>{setEditUsers((prev)=>({...prev,dateRealisation:e.target.value}))}}
                  />
                <div className="validator-hint">Error date</div>
                </span>
                <button className="btn btn-sm col-span-2 btn-primary text-white" type="submit">
                  Update
                </button>
              </div>
            </form>
          </dialog>
    </div>
  )
}
