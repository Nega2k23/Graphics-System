import React, { useEffect, useState } from "react";
import Filter from "../components/Filter";
import { Link } from "react-router-dom";
import axios from "axios";
import { GlobeLock, Plus, SquarePen, Trash, Trash2 } from "lucide-react";

export default function EtProd() {
  const [allEtProd, setAllEtProd] = useState([]);
  const [allAct,setAllAct] = useState([])
  const [EtProd, setEtProd] = useState({
    id: "",
    name: "",
    tva:"",
    ttc:"",
    tsp:"",
    precompte:"",
    remise:"",
    selectOdf:"",
    selectAct:"",
    dateRealisation:""
  });
  const [editEtProd, setEditEtProd] = useState({
    id: "",
    name: "",
    tva:"",
    ttc:"",
    tsp:"",
    precompte:"",
    remise:"",
    selectOdf:"",
    selectAct:"",
    dateRealisation:""
  });

  axios.get("http://localhost:3000/activite")
  .then((res)=>{
    setAllAct(res.data)
  })

  const filterAct = allAct.filter((item)=>item.name)

  useEffect(()=>{
    setEditEtProd(EtProd)
  },[EtProd])

  const handleEdit = (id,name,tva,ttc,tsp,precompte,remise,selectOdf,selectAct,dateRealisation) =>{
    setEtProd({
      id:id,
      name:name,
      tva:tva,
      ttc:ttc,
      tsp:tsp,
      precompte:precompte,
      remise:remise,
      selectOdf:selectOdf,
      selectAct:selectAct,
      dateRealisation:dateRealisation
    })
    document.getElementById("my_modal_1").showModal()
  } 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEtProd({ ...EtProd, [name]: value });
  };
  const axiosData = async () =>{ 
    await axios.get(`http://localhost:3000/etapeProd`)
    .then((res)=>{
      console.log(res)
      setAllEtProd(res.data) })}

  useEffect(()=>{
   axiosData()
  },[])
  const handleSubmit = (e) => {

     e.preventDefault();
    axios.post(`http://localhost:3000/etapeProd/`,EtProd)
    .then((res)=>{
      console.log(res)
    })
    .catch(err=>console.log(err))
  }
  const onDelete = (id)=>{
   axios.delete(`http://localhost:3000/etapeProd/${id}`,EtProd)
   .then((res)=>{
    console.log(res)
    const supEtProd=[...allEtProd]
    setAllEtProd(supEtProd.filter((eco)=> eco.id !== id))
   })
  }

  const onEdit = async (e) => {
      e.preventDefault()
        try {
            await axios.put(`http://localhost:3000/etapeProd/${editEtProd.id}`,editEtProd)
        }catch(err){
            console.log(err)
        }
    }

  return (
    <div className="EtProd px-2 flex gap-5 flex-col">
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
              <Link to="/etapes_production">
                <GlobeLock/>
                Etape Production
              </Link>
            </li>
          </ul>
        </div>
      </div>
  
          <dialog id="my_modal_5" className="modal">
            <form method="dialog" className="h-[100%] overflow-y-auto" onSubmit={handleSubmit}>
              <fieldset className="fieldset bg-white border-base-300 rounded-box w-100 border p-4">
                <div className="fieldset-legend pb-8 underline underline-offset-1 text-2xl">
                  Ajouter Etape production
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
                    value={EtProd.id}
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
                    value={EtProd.name}
                    onChange={handleChange}
                  />
                </label>
                <div className="validator-hint">error nom</div>
    
                <label className="input validator w-[100%]">
                  <input
                    type="text"
                    required
                    placeholder="TVA"
                    pattern="[0-9,]+[%]+[0-9]*"
                    minlength="3"
                    maxlength="30"
                    name="tva"
                    value={EtProd.tva}
                    onChange={handleChange}
                  />
                </label>
                <div className="validator-hint">Error TVA</div>

                <label className="input validator w-[100%]">
                  <input
                    type="text"
                    required
                    placeholder="TTC"
                    pattern="[0-9,]+[%]+[0-9]*"
                    minlength="3"
                    maxlength="30"
                    name="ttc"
                    value={EtProd.ttc}
                    onChange={handleChange}
                  />
                </label>
                <div className="validator-hint">Error TTC</div>

                <label className="input validator w-[100%]">
                  <input
                    type="text"
                    required
                    placeholder="TSP"
                    pattern="[0-9,]+[%]+[0-9]*"
                    minlength="3"
                    maxlength="30"
                    name="tsp"
                    value={EtProd.tsp}
                    onChange={handleChange}
                  />
                </label>
                <div className="validator-hint">Error TSP</div>

                <label className="input validator w-[100%]">
                  <input
                    type="text"
                    required
                    placeholder="Precompte"
                    pattern="[0-9,]+[%]+[0-9]*"
                    minlength="3"
                    maxlength="30"
                    name="precompte"
                    value={EtProd.precompte}
                    onChange={handleChange}
                  />
                </label>
                <div className="validator-hint">Error Precompte</div>

                <label className="input validator w-[100%]">
                  <input
                    type="text"
                    required
                    placeholder="Remise"
                    pattern="[0-9,]+[%]+[0-9]*"
                    minlength="3"
                    maxlength="30"
                    name="remise"
                    value={EtProd.remise}
                    onChange={handleChange}
                  />
                </label>
                <div className="validator-hint">Error Remise</div>

                <select
                  className="select select-neutral w-[100%]"
                  name="selectOdf"
                  value={EtProd.selectOdf}
                  required
                  onChange={handleChange}
                >
                  <option className="text-neutral-400" selected>ODF</option>
                  <option>OdfN1</option>
                  <option>OdfN2</option>
                </select>
                <br />
                <select
                  defaultValue="Etapes de production"
                  className="select select-neutral w-[100%]"
                  name="selectAct"
                  value={EtProd.selectAct}
                  required
                  onChange={handleChange}
                >
                  <option className="text-neutral-400 " selected>Activite</option>
                  {
                    filterAct.map((item)=>{
                      return (
                        <option>{item.name}</option>
                      )
                    })
                  }
                </select>
                <br />
                <label className="input w-[100%]">
                  <input
                    type="date"
                    className="input"
                    required
                    name="dateRealisation"
                    value={EtProd.dateRealisation}
                    onChange={handleChange}
                  />
                </label>
                <button className="btn bg-green-400 text-white font-bold mt-4" type="submit">
                  Valider
                </button>
                <button type="reset" className="btn bg-red-400 text-white font-bold mt-4">
                  Annuler
                </button>
              </fieldset>
            </form>
          </dialog>
    
      <div className="flex justify-between items-center bg-white rounded-box p-5 shadow-md">
        <h1 className="font-bold text-sm text-yellow-400">
          LISTES ETAPES PRODUCTIONS
        </h1>
        <Filter />
        <button
            className="btn bg-black btn-sm text-white font-bold shadow-md"
            onClick={() => document.getElementById("my_modal_5").showModal()}
          ><Plus/>
            Ajouter Etape production
          </button>
      </div>

      <dialog id="my_modal_1" className="modal">
            <form method="dialog" className="h-[100%] overflow-y-auto" onSubmit={onEdit}>
              <fieldset className="fieldset bg-white border-base-300 rounded-box w-100 border p-4">
                <div className="fieldset-legend pb-8 underline underline-offset-1 text-2xl">
                  Modifier Etape production
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
                    value={editEtProd.id}
                    onChange={(e)=>{setEditEtProd((prev)=>({...prev,id:e.target.value}))}}
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
                    value={editEtProd.name}
                    onChange={(e)=>{setEditEtProd((prev)=>({...prev,name:e.target.value}))}}
                  />
                </label>
                <div className="validator-hint">error nom</div>
    
                <label className="input validator w-[100%]">
                  <input
                    type="text"
                    required
                    placeholder="TVA"
                    pattern="[0-9,]+[%]+[0-9]*"
                    minlength="3"
                    maxlength="30"
                    name="tva"
                    value={editEtProd.tva}
                    onChange={(e)=>{setEditEtProd((prev)=>({...prev,tva:e.target.value}))}}
                  />
                </label>
                <div className="validator-hint">Error TVA</div>

                <label className="input validator w-[100%]">
                  <input
                    type="text"
                    required
                    placeholder="TTC"
                    pattern="[0-9,]+[%]+[0-9]*"
                    minlength="3"
                    maxlength="30"
                    name="ttc"
                    value={editEtProd.ttc}
                    onChange={(e)=>{setEditEtProd((prev)=>({...prev,ttc:e.target.value}))}}
                  />
                </label>
                <div className="validator-hint">Error TTC</div>

                <label className="input validator w-[100%]">
                  <input
                    type="text"
                    required
                    placeholder="TSP"
                    pattern="[0-9,]+[%]+[0-9]*"
                    minlength="3"
                    maxlength="30"
                    name="tsp"
                    value={editEtProd.tsp}
                    onChange={(e)=>{setEditEtProd((prev)=>({...prev,tsp:e.target.value}))}}
                  />
                </label>
                <div className="validator-hint">Error TSP</div>

                <label className="input validator w-[100%]">
                  <input
                    type="text"
                    required
                    placeholder="Precompte"
                    pattern="[0-9,]+[%]+[0-9]*"
                    minlength="3"
                    maxlength="30"
                    name="precompte"
                    value={editEtProd.precompte}
                    onChange={(e)=>{setEditEtProd((prev)=>({...prev,precompte:e.target.value}))}}
                  />
                </label>
                <div className="validator-hint">Error Precompte</div>

                <label className="input validator w-[100%]">
                  <input
                    type="text"
                    required
                    placeholder="Remise"
                    pattern="[0-9,]+[%]+[0-9]*"
                    minlength="3"
                    maxlength="30"
                    name="remise"
                    value={editEtProd.remise}
                    onChange={(e)=>{setEditEtProd((prev)=>({...prev,remise:e.target.value}))}}
                  />
                </label>
                <div className="validator-hint">Error Remise</div>

                <select
                  className="select select-neutral w-[100%]"
                  name="selectOdf"
                  value={editEtProd.selectOdf}
                  required
                  onChange={(e)=>{setEditEtProd((prev)=>({...prev,selectOdf:e.target.value}))}}
                >
                  <option className="text-neutral-400" selected>ODF</option>
                  <option>OdfN1</option>
                  <option>OdfN2</option>
                </select>
                <br />
                <select
                  className="select select-neutral w-[100%]"
                  name="selectAct"
                  value={editEtProd.selectAct}
                  required
                  onChange={(e)=>{setEditEtProd((prev)=>({...prev,selectAct:e.target.value}))}}
                >
                  <option className="text-neutral-400" selected>Activite</option>
                  {
                    filterAct.map((item)=>{
                      return (
                        <option>{item.name}</option>
                      )
                    })
                  }
                </select>
                <br />
                <label className="input validator w-[100%]">
                  <input
                    type="date"
                    className="input"
                    required
                    name="dateRealisation"
                    value={editEtProd.dateRealisation}
                    onChange={(e)=>{setEditEtProd((prev)=>({...prev,dateRealisation:e.target.value}))}}
                  />
                </label>
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
                <th>TVA</th>
                <th>TTC</th>
                <th>TSP</th>
                <th>Precompte</th>
                <th>Remise</th>
                <th>Odf</th>
                <th>Activite</th>
                <th>DateRealisation</th>
                <th>Option</th>
              </tr>
            </thead>
            <tbody>
              {allEtProd.map((item) => {
                return (
                  <tr key={item.id} className="hover:bg-base-100">
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.tva}</td>
                    <td>{item.ttc}</td>
                    <td>{item.tsp}</td>
                    <td>{item.precompte}</td>
                    <td>{item.remise}</td>
                    <td>{item.selectOdf}</td>
                    <td>{item.selectAct}</td>
                    <td>{item.dateRealisation}</td>
                    <td className="flex justify-center gap-2">
                      <button
                        className="btn btn-circle btn-ghost btn-sm  font-bold text-green-500"
                        onClick={()=>{handleEdit(item.id,
                          item.name,
                          item.tva,
                          item.ttc,
                          item.tsp,
                          item.precompte,
                          item.remise,
                          item.selectOdf,
                          item.selectAct,
                          item.dateRealisation
                        )}}
                      >
                        <SquarePen/>
                      </button>
                      <button
                        className="btn btn-sm btn-circle btn-ghost font-bold text-red-500"
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
