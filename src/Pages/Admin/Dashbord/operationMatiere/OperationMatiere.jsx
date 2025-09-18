import React, { useEffect, useState } from "react";
import Filter from "../components/Filter";
import { Link } from "react-router-dom";
import axios from "axios";
import { Cpu, Plus, SquarePen, Trash2 } from "lucide-react";

export default function OperationMatiere() {
  const [allOperationMatiere, setAllOperationMatiere] = useState([]);
  const [allEtape,setAllEtape] = useState([])
  const [OperationMatiere, setOperationMatiere] = useState({
    id: "",
    name: "",
    dateRealisation: "",
    select: "",
  });
  const [editOperationMatiere, setEditOperationMatiere] = useState({
    id: "",
    name: "",
    dateRealisation: "",
    select: "",
  });

  axios.get("http://localhost:3000/etapeProd")
    .then((res)=>{
      setAllEtape(res.data)
    })
    const filterEtape = allEtape.filter((item)=> item.name)

  useEffect(()=>{
          setEditOperationMatiere(OperationMatiere)
        },[OperationMatiere])
      
        const handleEdit = (id,name,dateRealisation,select) =>{
          setOperationMatiere({
              id: id,
              name: name,
              dateRealisation: dateRealisation,
              select: select,
          })
          document.getElementById("my_modal_1").showModal()
        } 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOperationMatiere({ ...OperationMatiere, [name]: value });
  };
  const axiosData = async () =>{ 
    await axios.get(`http://localhost:3000/operationMatiere`)
    .then((res)=>{
      console.log(res)
      setAllOperationMatiere(res.data) })}

  useEffect(()=>{
   axiosData()
  },[])
  const handleSubmit = (e) => {

     e.preventDefault();
    axios.post(`http://localhost:3000/operationMatiere/`,OperationMatiere)
    .then((res)=>{
      console.log(res)
    })
    .catch(err=>console.log(err))
  }
  const onDelete = (id)=>{
   axios.delete(`http://localhost:3000/operationMatiere/${id}`,OperationMatiere)
   .then((res)=>{
    console.log(res)
    const supOperationMatiere=[...allOperationMatiere]
    setAllOperationMatiere(supOperationMatiere.filter((eco)=> eco.id !== id))
   })
  }

  const onEdit = async (e) => {
      e.preventDefault()
        try {
            await axios.put(`http://localhost:3000/operationMatiere/${editOperationMatiere.id}`,editOperationMatiere)
        }catch(err){
            console.log(err)
        }
    }


  return (
    <div className="OperationMatiere p-2 flex gap-5 flex-col">
      <div>
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
              <Link to="/admin/OperationMatiere">
                <Cpu/>
                Operation Matiere
              </Link>
            </li>
          </ul>
        </div>
      </div>
          
          <dialog id="my_modal_5" className="modal">
            <form method="dialog"  onSubmit={handleSubmit}>
              <fieldset className="fieldset bg-white border-base-300 rounded-box w-100 border p-4">
                <div className="fieldset-legend pb-8 underline underline-offset-1 text-2xl">
                  Ajouter OperationMatiere
                </div>

                <label className="input validator w-[100%]">
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
                    value={OperationMatiere.id}
                    onChange={handleChange}
                  />
                </label>
                <div className="validator-hint">error id</div>

                <label className="input validator w-[100%]">
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
                    value={OperationMatiere.name}
                    onChange={handleChange}
                  />
                </label>
                <div className="validator-hint">error nom</div>

                <label className="input validator w-[100%]">
                  <input
                    type="date"
                    className="input"
                    required
                    name="dateRealisation"
                    value={OperationMatiere.dateRealisation}
                    onChange={handleChange}
                  />
                </label>
                <br />

                <select
                  className="select select-neutral w-[100%]"
                  name="select"
                  value={OperationMatiere.select}
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
                <br />

                <button className="btn bg-green-400 text-white font-bold" type="submit">
                  Valider
                </button>
                <button type="reset" className="btn bg-red-400 text-white font-bold mt-4">
                  Annuler
                </button>
              </fieldset>
            </form>
          </dialog>

      <div className="flex justify-between items-center gap-2 bg-white rounded-box p-5 shadow-md">
        <h1 className="font-bold text-sm text-yellow-400">
          LISTES OPERATIONS MATIERES
        </h1>
        <Filter />
        <button
            className="btn bg-black btn-sm text-white font-bold shadow-md"
            onClick={() => document.getElementById("my_modal_5").showModal()}
          ><Plus/>
            Ajouter OperationMatiere
          </button>
      </div>

      <dialog id="my_modal_1" className="modal">
            <form method="dialog" onSubmit={onEdit}>
              <fieldset className="fieldset bg-white border-base-300 rounded-box w-100 border p-4">
                <div className="fieldset-legend pb-8 underline underline-offset-1 text-2xl">
                  Modifier OperationMatiere
                </div>

                <label className="input validator w-[100%]">
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
                    value={editOperationMatiere.id}
                    onChange={(e)=>{setEditOperationMatiere((prev)=>({...prev,id:e.target.value}))}}
                  />
                </label>
                <div className="validator-hint">error id</div>

                <label className="input validator w-[100%]">
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
                    value={editOperationMatiere.name}
                    onChange={(e)=>{setEditOperationMatiere((prev)=>({...prev,name:e.target.value}))}}
                  />
                </label>
                <div className="validator-hint">error nom</div>

                <label className="input validator w-[100%]">
                  <input
                    type="date"
                    className="input"
                    required
                    name="dateRealisation"
                    value={editOperationMatiere.dateRealisation}
                    onChange={(e)=>{setEditOperationMatiere((prev)=>({...prev,dateRealisation:e.target.value}))}}
                  />
                </label>
                <br />

                <select
                  className="select select-neutral w-[100%]"
                  name="select"
                  value={editOperationMatiere.select}
                  required
                  onChange={(e)=>{setEditOperationMatiere((prev)=>({...prev,select:e.target.value}))}}
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
                <br />

                <button className="btn bg-blue-400 text-white font-bold mt-4" type="submit">
                  Update
                </button>
                <button type="reset" className="btn bg-red-400 text-white font-bold mt-4">
                  Annuler
                </button>
              </fieldset>
            </form>
          </dialog>

      <span className="list flex flex-col gap-2">
        <div className="overflow-x-auto rounded-box border border-base-content/5 bg-white shadow-md">
          <table className="table text-center">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nom</th>
                <th>Date Realisation</th>
                <th>Etapes de production</th>
                <th>Option</th>
              </tr>
            </thead>
            <tbody>
              {allOperationMatiere.map((item) => {
                return (
                  <tr key={item.id} className="hover:bg-base-100">
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.dateRealisation}</td>
                    <td>{item.select}</td>
                    <td className="flex justify-center gap-2">
                      <button
                        className="btn btn-sm btn-circle btn-ghost text-green-500"
                        onClick={()=>{handleEdit(
                          item.id,
                          item.name,
                          item.dateRealisation,
                          item.select,
                        )}}
                      >
                        <SquarePen/>
                      </button>
                      <button
                        className="btn btn-sm btn-circle btn-ghost text-red-500"
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
