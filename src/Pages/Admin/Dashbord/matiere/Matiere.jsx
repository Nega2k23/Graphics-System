import React, { useEffect, useState } from "react";
import Filter from "../components/Filter";
import { Link } from "react-router-dom";
import axios from "axios";
import { PackageSearch, Plus, SquareParking, SquarePen, Trash2, X } from "lucide-react";

export default function Matiere() {
  const [allMatiere, setAllMatiere] = useState([]);
  const [Matiere, setMatiere] = useState({
    id: "",
    name: "",
    format:"",
    prixUnitaire:"",
    quantite:"",
    montant:"",
  });
  const [editMatiere, setEditMatiere] = useState({
    id: "",
    name: "",
    format:"",
    prixUnitaire:"",
    quantite:"",
    montant:"",
  });

  useEffect(()=>{
      setEditMatiere(Matiere)
    },[Matiere])
  
    const handleEdit = (id,name,format,prixUnitaire,quantite,montant) =>{
      setEditMatiere({
          id: id,
          name: name,
          format:format,
          prixUnitaire:prixUnitaire,
          quantite:quantite,
          montant:montant
      })
      document.getElementById("my_modal_1").showModal()
    } 
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMatiere({ ...Matiere, [name]: value });
  };
  const axiosData = async () =>{ 
    await axios.get(`http://localhost:3000/matiere`)
    .then((res)=>{
      console.log(res)
      setAllMatiere(res.data) })}

  useEffect(()=>{
   axiosData()
  },[])
  const handleSubmit = (e) => {

     e.preventDefault();
    axios.post(`http://localhost:3000/matiere/`,Matiere)
    .then((res)=>{
      console.log(res)
    })
    .catch(err=>console.log(err))
  }
  const onDelete = (id)=>{
   axios.delete(`http://localhost:3000/matiere/${id}`,Matiere)
   .then((res)=>{
    console.log(res)
    const supMatiere=[...allMatiere]
    setAllMatiere(supMatiere.filter((eco)=> eco.id !== id))
   })
  }

  const onEdit = async (e) => {
      e.preventDefault()
        try {
            await axios.put(`http://localhost:3000/matiere/${editMatiere.id}`,editMatiere)
        }catch(err){
            console.log(err)
        }
    }

  return (
    <div className="Matiere px-2 flex gap-5 flex-col">
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
              <Link to="/matiere">
                <PackageSearch/>
                Matiere
              </Link>
            </li>
          </ul>
        </div>
      </div>
      
          <dialog id="my_modal_5" className="modal">
            <form method="dialog" className="modal-box flex flex-col gap-5 bg-white border-base-300 rounded-box w-300 border p-4" onSubmit={handleSubmit}>
                <div className="flex justify-between items-center">
                  <h1 className="text-2xl font-bold">Ajouter Matiere</h1>
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
                    value={Matiere.id}
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
                    value={Matiere.name}
                    onChange={handleChange}
                  />
                </label>
                <div className="validator-hint">error nom</div>
                </span>
                <span>
                <label className="input input-sm inset-shadow-sm validator w-[100%]">
                  <input
                    type="text"
                    required
                    placeholder="Format"
                    pattern="[0-9 ][ A-Za-z0-9\-]*"
                    minlength="3"
                    maxlength="30"
                    name="format"
                    value={Matiere.format}
                    onChange={handleChange}
                  />
                </label>
                <div className="validator-hint">Error format</div>
                </span>
                <span>
                <label className="input input-sm inset-shadow-sm validator w-[100%]">
                  <input
                    type="number"
                    required
                    placeholder="Prix unitaire"
                    pattern="[0-9]*"
                    minlength="3"
                    maxlength="30"
                    name="prixUnitaire"
                    value={Matiere.prixUnitaire}
                    onChange={handleChange}
                  />
                </label>
                <div className="validator-hint">Error Prix unitaire</div>
                </span>
                <span>
                <label className="input input-sm inset-shadow-sm validator w-[100%]">
                  <input
                    type="number"
                    required
                    placeholder="Quantite"
                    pattern="[0-9]*"
                    minlength="3"
                    maxlength="30"
                    name="quantite"
                    value={Matiere.quantite}
                    onChange={handleChange}
                  />
                </label>
                <div className="validator-hint">Error Quantite</div>
                </span>
                <span>
                <label className="input input-sm inset-shadow-sm validator w-[100%]">
                  <input
                    type="number"
                    required
                    placeholder="Montant"
                    pattern="[0-9]*"
                    minlength="3"
                    maxlength="30"
                    name="montant"
                    value={Matiere.montant}
                    onChange={handleChange}
                  />
                </label>
                <div className="validator-hint">Error Montant</div>
                </span>
                <button className="btn btn-sm col-span-2 bg-black text-white font-bold" type="submit">
                  Soumettre
                </button>
                </div>
            </form>
          </dialog>
          <dialog id="my_modal_1" className="modal">
            <form method="dialog" className="modal-box flex flex-col gap-5 bg-white border-base-300 rounded-box w-300 border p-4" onSubmit={onEdit}>
                <div className="flex justify-between items-center">
                  <h1 className="text-2xl font-bold">Modifier Matiere</h1>
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
                    value={editMatiere.id}
                    onChange={(e)=>{setEditMatiere((prev)=>({...prev,id:e.target.value}))}}
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
                    value={editMatiere.name}
                    onChange={(e)=>{setEditMatiere((prev)=>({...prev,name:e.target.value}))}}
                  />
                </label>
                <div className="validator-hint">error nom</div>
                </span>
                <span>
                <label className="input input-sm inset-shadow-sm validator w-[100%]">
                  <input
                    type="text"
                    required
                    placeholder="Format"
                    pattern="[0-9 ][ A-Za-z0-9\-]*"
                    minlength="3"
                    maxlength="30"
                    name="format"
                    value={editMatiere.format}
                    onChange={(e)=>{setEditMatiere((prev)=>({...prev,format:e.target.value}))}}
                  />
                </label>
                <div className="validator-hint">Error format</div>
                </span>
                <span>
                <label className="input input-sm inset-shadow-sm validator w-[100%]">
                  <input
                    type="number"
                    required
                    placeholder="Prix unitaire"
                    pattern="[0-9]*"
                    minlength="3"
                    maxlength="30"
                    name="prixUnitaire"
                    value={editMatiere.prixUnitaire}
                    onChange={(e)=>{setEditMatiere((prev)=>({...prev,prixUnitaire:e.target.value}))}}
                  />
                </label>
                <div className="validator-hint">Error Prix unitaire</div>
                </span>
                <span>
                <label className="input input-sm inset-shadow-sm validator w-[100%]">
                  <input
                    type="number"
                    required
                    placeholder="Quantite"
                    pattern="[0-9]*"
                    minlength="3"
                    maxlength="30"
                    name="quantite"
                    value={editMatiere.quantite}
                    onChange={(e)=>{setEditMatiere((prev)=>({...prev,quantite:e.target.value}))}}
                  />
                </label>
                <div className="validator-hint">Error Quantite</div>
                </span>
                <span>
                <label className="input input-sm inset-shadow-sm validator w-[100%]">
                  <input
                    type="number"
                    required
                    placeholder="Montant"
                    pattern="[0-9]*"
                    minlength="3"
                    maxlength="30"
                    name="montant"
                    value={editMatiere.montant}
                    onChange={(e)=>{setEditMatiere((prev)=>({...prev,montant:e.target.value}))}}
                  />
                </label>
                <div className="validator-hint">Error Montant</div>
                </span>
                <button className="btn btn-sm col-span-2 btn-primary text-white font-bold" type="submit">
                  Update
                </button>
                </div>
            </form>
          </dialog>
    
      <div className="flex justify-between items-center bg-white p-5 rounded-box shadow-sm">
        <h1 className="font-bold text-sm text-yellow-400">
          LISTES MATIERES
        </h1>
        <Filter />
        <button
            className="btn bg-black btn-sm text-white font-bold shadow-sm"
            onClick={() => document.getElementById("my_modal_5").showModal()}
          ><Plus/>
            Ajouter Matiere
          </button>
      </div>

      <span className="list flex flex-col gap-2">
        <div className="overflow-x-auto rounded-box border border-base-content/5 bg-white shadow-sm">
          <table className="table text-center">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nom</th>
                <th>Format</th>
                <th>Prix Unitaire</th>
                <th>Quantite</th>
                <th>Montant</th>
                <th>Option</th>
              </tr>
            </thead>
            <tbody>
              {allMatiere.map((item) => {
                return (
                  <tr key={item.id} className="hover:bg-base-100">
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.format}</td>
                    <td>{item.prixUnitaire}</td>
                    <td>{item.quantite}</td>
                    <td>{item.montant}</td>
                    <td className="flex justify-center gap-2">
                      <button
                        className="btn btn-sm btn-circle btn-ghost text-green-500 tooltip"
                        data-tip="Modifier"
                        onClick={()=>{handleEdit(item.id,item.name,item.format,item.prixUnitaire,item.quantite,item.montant)}}
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
