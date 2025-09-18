import React, { useEffect, useState } from "react";
import Filter from "../components/Filter";
import { Link } from "react-router-dom";
import axios from "axios";
import { Plus, SquarePen, Trash2, User, X } from "lucide-react";

export default function Users() {
  const [allUsers, setAllUsers] = useState([]);
  const [users, setUsers] = useState({
    id: "",
    name: "",
    adresse: "",
    service: "",
    password: "",
    dateRealisation: "",
  });
  const [editUsers, setEditUsers] = useState({
    id: "",
    name: "",
    adresse: "",
    service: "",
    password: "",
    dateRealisation: "",
  });

  useEffect(()=>{
          setEditUsers(users)
        },[users])
      
        const handleEdit = (id,name,adresse,service,password,dateRealisation) =>{
          setEditUsers({
              id: id,
              name:name,
              adresse: adresse,
              service: service,
              password: password,
              dateRealisation: dateRealisation,
          })
          document.getElementById("my_modal_1").showModal()
        } 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsers({ ...users, [name]: value });
  };

  const axiosData = async () =>{ 
    await axios.get(`http://localhost:3000/users`)
    .then((res)=>{
      console.log(res)
      setAllUsers(res.data)
    })}

  useEffect(()=>{
   axiosData()
  },[])

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:3000/users",users)
    .then((res)=>{
      console.log(res)
    })
    .catch(err=>console.log(err))
  };

  const onDelete = (id) => {
    axios.delete(`http://localhost:3000/users/${id}`,users)
   .then((res)=>{
    console.log(res)
    const supUsers=[...allUsers]
    setAllUsers(supUsers.filter((eco)=> eco.id !== id))
   })
   .catch(err=>console.log(err))
  };

  const onEdit = async (e) => {
      e.preventDefault()
        try {
            await axios.put(`http://localhost:3000/users/${editUsers.id}`,editUsers)
        }catch(err){
            console.log(err)
        }
    }

  
  return (
    <div className="Users px-2 flex gap-5 flex-col">
      <div className="pt-2">
        <div className="breadcrumbs text-sm flex ">
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
              <Link to="/Users">
                <User/>
                Users
              </Link>
            </li>
          </ul>
        </div>
      </div>
          
          <dialog id="my_modal_5" className="modal">
            <form method="dialog" className="modal-box flex flex-col gap-5 bg-white border-base-300 rounded-box w-300" onSubmit={handleSubmit}>
              
                <div className="flex justify-between items-center">
                  <h1 className="text-2xl font-bold">Ajouter User</h1>
                  <button className="btn btn-sm btn-circle btn-ghost text-red-500 tooltip tooltip-left" data-tip="Fermer" type="reset" onClick={()=>{document.getElementById("my_modal_5").close();}}><X/></button>
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
                    value={users.id}
                    onChange={handleChange}
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
                    value={users.name}
                    onChange={handleChange}
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
                    value={users.adresse}
                    onChange={handleChange}
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
                    value={users.service}
                    onChange={handleChange}
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
                    value={users.password}
                    onChange={handleChange}
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
                    value={users.dateRealisation}
                    onChange={handleChange}
                  />
                <div className="validator-hint">Error date</div>
                </span>
                <button className="btn btn-sm col-span-2 bg-black text-white" type="submit">
                  Soumettre
                </button>
              </div>
            </form>
          </dialog>
          <dialog id="my_modal_1" className="modal">
            <form method="dialog" className="modal-box flex flex-col gap-5 bg-white border-base-300 rounded-box w-300" onSubmit={onEdit}>
              
                <div className="flex justify-between items-center">
                  <h1 className="text-2xl font-bold">Ajouter User</h1>
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

        <div className="flex justify-between items-center bg-white p-5 rounded-box shadow-sm">
          <h1 className="font-bold text-sm text-yellow-400 ">
          LISTES USERS
        </h1>
        <Filter />
          <button
            className="btn bg-black btn-sm text-white font-bold shadow-sm"
            onClick={() => document.getElementById("my_modal_5").showModal()}
          ><Plus/>
            Ajouter Users
          </button>
        </div>
      <span className="list flex flex-col gap-2">
        
        <div className="overflow-x-auto rounded-box border border-base-content/5 bg-white shadow-sm">
          <table className="table text-center">
            <thead>
              <tr>
                <th>ID</th>
                <th>Avatar</th>
                <th>Nom</th>
                <th>Adresse</th>
                <th>Service</th>
                <th>Date Realisation</th>
                <th className="">Option</th>
              </tr>
            </thead>
            <tbody>
              {allUsers.map((item) => {
                return (
                  <tr key={item.id} className="hover:bg-base-100">
                    <td>{item.id}</td>
                    <td className="btn btn-circle bg-base-300 my-2">{item.name.charAt(0)}</td>
                    <td>{item.name}</td>
                    <td>{item.adresse}</td>
                    <td>{item.service}</td>
                    <td>{item.dateRealisation}</td>
                    <td className="flex justify-center gap-2">
                      <button
                        className="btn btn-sm btn-circle btn-ghost text-green-500 tooltip"
                        data-tip="Modifier"
                        onClick={()=>{handleEdit(
                          item.id,
                          item.name,
                          item.adresse,
                          item.service,
                          item.password,
                          item.dateRealisation,
                        )}}
                      >
                        <SquarePen/>
                      </button>
                      <button
                        className="btn btn-sm btn-circle btn-ghost text-red-500 tooltip"
                        data-tip="Supprimer"
                        onClick={() => {
                          onDelete(item.id);
                        }}
                      >
                        <Trash2/>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </span>
    </div>
  );
}
