import React, { useEffect, useState } from "react";
import Filter from "../components/Filter";
import { Link } from "react-router-dom";
import axios from "axios";
import { Handshake, Plus, SquarePen, Trash2, X } from "lucide-react";

export default function Operation() {
  const [allOperation, setAllOperation] = useState([]);
  const [allOpm, setAllOpm] = useState([])
  const [Operation, setOperation] = useState({
    id: "",
    name: "",
    dateRealisation: "",
    observation: "",
    select: "",
  });
  const [editOperation, setEditOperation] = useState({
    id: "",
    name: "",
    dateRealisation: "",
    observation: "",
    select: "",
  });

  const filterOpm = allOpm.filter((item)=>item.name)

  useEffect(()=>{
    axios.get("http://localhost:3000/operationMatiere")
  .then((res)=>{
    setAllOpm(res.data)
  })
  },[])

  useEffect(()=>{
        setEditOperation(Operation)
      },[Operation])
    
      const handleEdit = (id,name,dateRealisation,select,observation) =>{
        setEditOperation({
            id: id,
            name: name,
            dateRealisation: dateRealisation,
            select: select,
            observation: observation,
        })
        document.getElementById("my_modal_1").showModal()
      } 
    

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOperation({ ...Operation, [name]: value });
  };
  const axiosData = async () =>{ 
    await axios.get(`http://localhost:3000/operation`)
    .then((res)=>{
      console.log(res)
      setAllOperation(res.data) })}

  useEffect(()=>{
   axiosData()
  },[])
  const handleSubmit = (e) => {

     e.preventDefault();
    axios.post(`http://localhost:3000/operation/`,Operation)
    .then((res)=>{
      console.log(res)
    })
    .catch(err=>console.log(err))
  }
  const onDelete = (id)=>{
   axios.delete(`http://localhost:3000/operation/${id}`,Operation)
   .then((res)=>{
    console.log(res)
    const supOperation=[...allOperation]
    setAllOperation(supOperation.filter((eco)=> eco.id !== id))
   })
  }

  const onEdit = async (e) => {
      e.preventDefault()
        try {
            await axios.put(`http://localhost:3000/operation/${editOperation.id}`,editOperation)
        }catch(err){
            console.log(err)
        }
    }

  return (
    <div className="Operation px-2 flex gap-5 flex-col">
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
              <Link to="/Operation">
                <Handshake/>
                Operation
              </Link>
            </li>
          </ul>
        </div>
      </div>
      
          <dialog id="my_modal_5" className="modal">
            <form method="dialog" className="modal-box flex flex-col gap-5 bg-white border-base-300 rounded-box w-300" onSubmit={handleSubmit}>
              <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Ajouter Operation</h1>
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
                    value={Operation.id}
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
                    value={Operation.name}
                    onChange={handleChange}
                  />
                </label>
                <div className="validator-hint">error nom</div>
                </span>
                <span>
                  <input
                    type="date"
                    className="input input-sm inset-shadow-sm validator"
                    required
                    name="dateRealisation"
                    value={Operation.dateRealisation}
                    onChange={handleChange}
                  />
                  <div className="validator-hint">Error Date</div>
                </span>
                <select
                  className="select select-sm inset-shadow-sm w-[100%]"
                  name="select"
                  value={Operation.select}
                  required
                  onChange={handleChange}
                >
                  <option className="text-neutral-400" selected>OperationMatiere</option>
                  {
                    filterOpm.map((item)=>{
                      return (
                        <option>{item.name}</option>
                      )
                    })
                  }
                </select>
                <span className="col-span-2">
                <textarea
                  className="input input-sm h-20 pt-2 w-[100%] validator"
                  required
                  minLength={10}
                  name="observation"
                  value={Operation.observation}
                  onChange={handleChange}
                  placeholder="Entrez vos observations ici"
                 />                
                </span>
                <button className="btn btn-sm col-span-2 bg-black text-white font-bold mt-4" type="submit">
                  Soumettre
                </button>
                </div>
            </form>
          </dialog>
          <dialog id="my_modal_1" className="modal">
            <form method="dialog" className="modal-box flex flex-col gap-5 bg-white border-base-300 rounded-box w-300" onSubmit={onEdit}>
              <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Modifier Operation</h1>
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
                    value={editOperation.id}
                    onChange={(e)=>{setEditOperation((prev)=>({...prev,id:e.target.value}))}}
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
                    value={editOperation.name}
                    onChange={(e)=>{setEditOperation((prev)=>({...prev,name:e.target.value}))}}
                  />
                </label>
                <div className="validator-hint">error nom</div>
                </span>
                <span>
                  <input
                    type="date"
                    className="input input-sm inset-shadow-sm validator"
                    required
                    name="dateRealisation"
                    value={editOperation.dateRealisation}
                    onChange={(e)=>{setEditOperation((prev)=>({...prev,dateRealisation:e.target.value}))}}
                  />
                  <div className="validator-hint">Error Date</div>
                </span>
                <select
                  className="select validator select-sm inset-shadow-sm w-[100%]"
                  name="select"
                  value={editOperation.select}
                    onChange={(e)=>{setEditOperation((prev)=>({...prev,select:e.target.value}))}}
                >
                  <option className="text-neutral-400" selected>OperationMatiere</option>
                  {
                    filterOpm.map((item)=>{
                      return (
                        <option>{item.name}</option>
                      )
                    })
                  }
                </select>
                <span className="col-span-2">
                <textarea
                  className="input input-sm h-20 pt-2 w-[100%] validator"
                  required
                  minLength={10}
                  name="observation"
                  value={editOperation.observation}
                    onChange={(e)=>{setEditOperation((prev)=>({...prev,observation:e.target.value}))}}
                  placeholder="Entrez vos observations ici"
                 />                
                </span>
                <button className="btn btn-sm col-span-2 btn-primary text-white font-bold mt-4" type="submit">
                  Update
                </button>
                </div>
            </form>
          </dialog>

      <div className="flex justify-between items-center bg-white rounded-box p-5 shadow-sm">
        <h1 className="font-bold text-sm text-yellow-400">
          LISTES OPERATIONS
        </h1>
        <Filter />
        <button
            className="btn btn-sm bg-black text-white font-bold shadow-sm"
            onClick={() => document.getElementById("my_modal_5").showModal()}
          > <Plus/>
            Ajouter Operation
          </button>
      </div>

      <span className="list flex flex-col gap-2">
        <div className="overflow-x-auto rounded-box border border-base-content/5 bg-white shadow-sm">
          <table className="table text-center">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nom</th>
                <th>Date Realisation</th>
                <th>Observations</th>
                <th>Option</th>
              </tr>
            </thead>
            <tbody>
              {allOperation.map((item) => {
                return (
                  <tr key={item.id} className="hover:bg-base-100">
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.dateRealisation}</td>
                    <td className="text-justify">{item.observation}</td>
                    <td className="flex justify-center gap-2">
                      <button
                        className="btn btn-sm btn-circle btn-ghost text-green-500 tooltip"
                        data-tip="Modifier"
                        onClick={()=>{handleEdit(
                          item.id,
                          item.name,
                          item.dateRealisation,
                          item.select,
                          item.observation,
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
