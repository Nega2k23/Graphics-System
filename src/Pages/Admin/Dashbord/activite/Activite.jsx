import React, { useEffect, useState } from "react";
import Filter from "../components/Filter";
import { Link } from "react-router-dom";
import axios from "axios";
import { Activity, Plus, SquarePen, Trash2, X } from "lucide-react";
export default function Activite() {
  const [allActivite, setAllActivite] = useState([]);
  const [allEtape,setAllEtape] = useState([])
  const [activite, setActivite] = useState({
    id: "",
    name: "",
    montant: "",
    dateRealisation: "",
    select: "",
  });
  const [editActivite, setEditActivite] = useState({
    id: "",
    name: "",
    montant: "",
    dateRealisation: "",
    select: "",
  });

  useEffect(()=>{
    axios.get("http://localhost:3000/etapeProd")
  .then((res)=>{
    setAllEtape(res.data)
  })
  },[])
  const filterEtape = allEtape.filter((item)=> item.name)

  useEffect(()=>{
    setEditActivite(activite)
  },[activite])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setActivite({ ...activite, [name]: value });

  };
   const axiosData = async () =>{ 
    await axios.get(`http://localhost:3000/activite`)
    .then((res)=>{
      console.log(res)
      setAllActivite(res.data) })}

  useEffect(()=>{
   axiosData()
  },[])

  const handleSubmit = (e) => {

     e.preventDefault();
    axios.post(`http://localhost:3000/activite/`,activite)
    .then((res)=>{
      console.log(res)
    })
    .catch(err=>console.log(err))
    e.target.id.name.value=""
  }
  const onDelete = (id)=>{
   axios.delete(`http://localhost:3000/activite/${id}`,activite)
   .then((res)=>{
    console.log(res)
    const supActivite=[...allActivite]
    setAllActivite(supActivite.filter((eco)=> eco.id !== id))
   })
  }

  const onEdit = async (e) => {
      e.preventDefault()
        try {
            await axios.put(`http://localhost:3000/activite/${editActivite.id}`,editActivite)
        }catch(err){
            console.log(err)
        }
    }

   const handleEdit = (id,name,montant,dateRealisation,select) =>{
    setEditActivite({
      id:id,
      name:name,
      montant:montant,
      dateRealisation:dateRealisation,
      select:select
    })
   document.getElementById("my_modal_1").showModal()
  } 

  
  return (
    <div className="Activite text-sm px-2 flex gap-5 flex-col">
      <div className="pt-2">
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
              <Link to="/activite">
                <Activity/>
                Activite
              </Link>
            </li>
          </ul>
        </div>
      </div>
      
          <dialog id="my_modal_5" className="modal">
            <form method="dialog" className="modal-box flex flex-col gap-5 bg-white border-base-300 rounded-box w-300" onSubmit={handleSubmit}>
              
                <div className="flex justify-between items-center">
                  <h1 className="text-2xl font-bold">Ajouter Activite</h1>
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
                    value={activite.id}
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
                    placeholder="Name"
                    pattern="[A-Za-z][A-Za-z0-9\-]*"
                    minlength="3"
                    maxlength="30"
                    name="name"
                    value={activite.name}
                    onChange={handleChange}
                  />
                </label>
                <div className="validator-hint">error nom</div>
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
                    type="number"
                    required
                    placeholder="Montant"
                    pattern="[0-9]*"
                    minlength="3"
                    maxlength="30"
                    name="montant"
                    value={activite.montant}
                    onChange={handleChange}
                  />
                </label>
                <div className="validator-hint">error Montant</div>
                  </span>
                  <span>
                    <input
                    type="date"
                    className="input input-sm inset-shadow-sm validator w-[100%]"
                    required
                    name="dateRealisation"
                    value={activite.dateRealisation}
                    onChange={handleChange}
                  />
                  <div className="validator-hint">error date</div>
                  </span>
                <select
                  className="select select-sm inset-shadow-sm col-span-2 w-[100%]"
                  name="select"
                  value={activite.select}
                  required
                  onChange={handleChange}
                >
                  <option className="text-neutral-400" selected>Etape de production</option>
                    {
                      filterEtape.map((item)=>{
                        return(
                          <option>{item.name}</option>
                        )
                      })
                    }
                </select>

                <button className="btn mt-5 col-span-2 bg-black text-white font-bold" type="submit">
                  Soumetre
                </button>
              </div>
            </form>
          </dialog>
          <dialog id="my_modal_1" className="modal">
            <form method="dialog" className="modal-box flex flex-col gap-5 bg-white border-base-300 rounded-box w-300" onSubmit={onEdit}>
              
                <div className="flex justify-between items-center">
                  <h1 className="text-2xl font-bold">Modifier Activite</h1>
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
                    value={editActivite.id}
                    onChange={(e)=>{setEditActivite((prev)=>({...prev,id:e.target.value}))}}
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
                    placeholder="Name"
                    pattern="[A-Za-z][A-Za-z0-9\-]*"
                    minlength="3"
                    maxlength="30"
                    name="name"
                    value={editActivite.name}
                    onChange={(e)=>{setEditActivite((prev)=>({...prev,name:e.target.value}))}}
                  />
                </label>
                <div className="validator-hint">error nom</div>
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
                    type="number"
                    required
                    placeholder="Montant"
                    pattern="[0-9]*"
                    minlength="3"
                    maxlength="30"
                    name="montant"
                    value={editActivite.montant}
                    onChange={(e)=>{setEditActivite((prev)=>({...prev,montant:e.target.value}))}}
                  />
                </label>
                <div className="validator-hint">error Montant</div>
                  </span>
                  <span>
                    <input
                    type="date"
                    className="input input-sm inset-shadow-sm validator w-[100%]"
                    required
                    name="dateRealisation"
                    value={editActivite.dateRealisation}
                    onChange={(e)=>{setEditActivite((prev)=>({...prev,dateRealisation:e.target.value}))}}
                  />
                  <div className="validator-hint">error date</div>
                  </span>
                <select
                  className="select validator select-sm inset-shadow-sm col-span-2 w-[100%]"
                  name="select"
                  value={editActivite.select}
                    onChange={(e)=>{setEditActivite((prev)=>({...prev,select:e.target.value}))}}
                >
                  <option className="text-neutral-400" selected>Etape de production</option>
                    {
                      filterEtape.map((item)=>{
                        return(
                          <option>{item.name}</option>
                        )
                      })
                    }
                </select>

                <button className="btn mt-5 col-span-2 btn-primary text-white font-bold" type="submit">
                  Update
                </button>
              </div>
            </form>
          </dialog>
      <div className="flex justify-between items-center p-5 bg-white rounded-box shadow-sm">
        <h1 className="font-bold text-yellow-400">
          LISTES ACTIVITES 
        </h1>
        <Filter />
        <button
            className="btn btn-sm bg-black text-white font-bold shadow-sm"
            onClick={() => document.getElementById("my_modal_5").showModal()}
          ><Plus/>
            Ajouter Activite
          </button>
      </div>
      <span className="list flex flex-col gap-2">
        <div className="overflow-x-auto rounded-box border border-base-content/5 bg-white shadow-sm">
          <table className="table text-center">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nom</th>
                <th>Montant</th>
                <th>Date Realisation</th>
                <th>Etapes de production</th>
                <th>Option</th>
              </tr>
            </thead>
            <tbody>
              {allActivite.map((item) => {
                return (
                  <tr key={item.id} className="hover:bg-base-100">
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.montant}</td>
                    <td>{item.dateRealisation}</td>
                    <td>{item.select}</td>
                    <td className="flex justify-center gap-2">
                      <button
                        className="btn btn-sm btn-circle btn-ghost text-green-500 tooltip"
                        data-tip="Modifier"
                        onClick={()=>{handleEdit(item.id,item.name,item.montant,item.dateRealisation,item.select)}}
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
