import axios from 'axios';
import { X } from 'lucide-react'
import React, { useEffect, useState } from 'react'

export default function ModalEditOdf({odf,onEdit}) {

    const [editOdf,setEditOdf] = useState({
        nomClient: "",
        numeroDossier: "",
        dateOuverture: "",
        dateCreation: "",
        numeroCreation: "",
        quantiteCommande: "",
        quantiteLivree: "",
        dateLivraison: "",
        designation: "",
        numeroUsine: "",
        observation: "",
        etapeProd:[]
      })
      useEffect(()=>{
        setEditOdf(odf);
      },[odf])
    
  const [clients, setClients] = useState([]);
  
  useEffect(()=>{
      axios
      .get(`http://localhost:3000/clients`)
      .then((res) => {
        setClients(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    },[])
    const handleOnEdit = (e) =>{
        e.preventDefault();
        onEdit(editOdf);
    }
  return (
    <div>
      <dialog id='my_modal_2' className='modal'>
        <form action="method" className='modal-box w-full flex flex-col gap-5 bg-white' onSubmit={handleOnEdit}>
            <div className='form-header flex justify-between items-center'>
                <h1 className='text-2xl font-bold'>Modifier Information de base</h1>
                <button className='btn btn-ghost btn-sm btn-circle text-red-500 tooltip tooltip-left' data-tip="Fermer" onClick={(e)=>{e.preventDefault();document.getElementById("my_modal_2").close();}}><X/></button>
            </div>
            <div className='grid grid-cols-2 gap-2'>
                {/* Nom Client */}
              <div>
                <select
                  name="nomClient"
                  value={editOdf.nomClient}
                  onChange={(e)=>{setEditOdf((prev)=>({...prev,nomClient:e.target.value}))}}
                  className="input input-sm w-full"
                >
                  <option value="">---Choississez un client---</option>
                  {
                    clients.filter((item)=>item.name).map((items)=>(
                      <option>{items.name}</option>
                    ))
                  }
                </select>
              </div>

              {/* Numéro Dossier */}
              <div>
                <input
                  placeholder="Numéro Dossier"
                  type="text"
                  name="numeroDossier"
                  value={editOdf.numeroDossier}
                  onChange={(e)=>{setEditOdf((prev)=>({...prev,numeroDossier:e.target.value}))}}
                  className="input input-sm w-full"
                />
              </div>

              {/* Dates */}
              <div>
                <input
                  type="date"
                  title="Date d'ouverture"
                  name="dateOuverture"
                  value={editOdf.dateOuverture}
                  onChange={(e)=>{setEditOdf((prev)=>({...prev,dateOuverture:e.target.value}))}}
                  className="input input-sm w-full"
                />
              </div>

              <div>
                <input
                  type="date"
                  title="Date de Creation"
                  name="dateCreation"
                  value={editOdf.dateCreation}
                  onChange={(e)=>{setEditOdf((prev)=>({...prev,dateCreation:e.target.value}))}}
                  className="input input-sm w-full"
                />
              </div>

              {/* Numéro Création */}
              <div>
                <input
                  type="text"
                  placeholder="Numéro Création"
                  name="numeroCreation"
                  value={editOdf.numeroCreation}
                  onChange={(e)=>{setEditOdf((prev)=>({...prev,numeroCreation:e.target.value}))}}
                  className="input input-sm w-full"
                />
              </div>

              {/* Quantités */}
              <div>
                <input
                  type="number"
                  placeholder="Quantite Commande"
                  name="quantiteCommande"
                  value={editOdf.quantiteCommande}
                  onChange={(e)=>{setEditOdf((prev)=>({...prev,quantiteCommande:e.target.value}))}}
                  className="input input-sm w-full"
                />
              </div>

              <div>
                <input
                  type="number"
                  placeholder="Quantite Livree"
                  name="quantiteLivree"
                  value={editOdf.quantiteLivree}
                  onChange={(e)=>{setEditOdf((prev)=>({...prev,quantiteLivree:e.target.value}))}}
                  className="input input-sm w-full"
                />
              </div>

              {/* Date Livraison */}
              <div>
                <input
                  type="date"
                  title="Date de Livraison"
                  name="dateLivraison"
                  value={editOdf.dateLivraison}
                  onChange={(e)=>{setEditOdf((prev)=>({...prev,dateLivraison:e.target.value}))}}
                  className="input input-sm w-full"
                />
              </div>

              {/* Designation */}
              <div>
                <input
                  type="text"
                  placeholder="Designation"
                  name="designation"
                  value={editOdf.designation}
                  onChange={(e)=>{setEditOdf((prev)=>({...prev,designation:e.target.value}))}}
                  className="input input-sm w-full"
                />
              </div>

              {/* Numéro Usine */}
              <div>
                <input
                  type="text"
                  placeholder="Numéro Usine"
                  name="numeroUsine"
                  value={editOdf.numeroUsine}
                  onChange={(e)=>{setEditOdf((prev)=>({...prev,numeroUsine:e.target.value}))}}
                  className="input input-sm w-full"
                />
              </div>

              {/* Observation */}
              <div className="col-span-2">
                <textarea
                  name="observation"
                  placeholder="Observation"
                  value={editOdf.observation}
                  onChange={(e)=>{setEditOdf((prev)=>({...prev,observation:e.target.value}))}}
                  className="input input-sm h-20 w-full pt-2"
                />
              </div>
              <button className='btn btn-sm btn-primary col-span-2 text-white'>Update</button>
            </div>
        </form>
      </dialog>
    </div>
  )
}
