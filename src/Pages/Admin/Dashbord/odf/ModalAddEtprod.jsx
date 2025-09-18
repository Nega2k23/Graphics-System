import { Check, CornerDownLeft, Plus, Trash2, X } from 'lucide-react'
import AddOperation from './AddOperation';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Test from './Test';
import ListTest from './ListTest';

export default function ModalAddEtprod() {
    const [visibo,setVisibo] = useState(true);
    const [allActivite,setAllActivite] = useState([])
    const [etape,SetEtape] = useState({
        nomEtape:"",
        activite:"",
        operationsMatieres:[]
    })
    useEffect(()=>{
        axios.get(`http://localhost:3000/activite`)
        .then((res)=>{
            setAllActivite(res.data)
        })
    },[])
    useEffect(()=>{
        axios.get(`http://localhost:3000/operationsMatieres`)
        .then((res)=>{
        [...etape.operationsMatieres]=[...res.data]
        })
    })
    const handleChange = (e) =>{
        const {name,value} = e.target;
        SetEtape({...etape, [name]: value});
    }
   
    const addEtape = (e)=>{
        e.preventDefault();
        axios.post(`http://localhost:3000/etapeProd`,etape)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
        SetEtape("")
    }
  return (
    <div>
        <dialog id="my_modal_1" className="modal overflow-y-scroll">
            <div >
                <div className='modal-box w-300 bg-white flex flex-col gap-5'>
                    <div className='form-header flex justify-between items-center'>
                        <h1 className='font-semibold text-2xl'>Création étape de production</h1>
                        <div className='flex gap-5 items-center'>
                            <button className='btn btn-circle btn-sm btn-ghost text-green-500 tooltip-bottom tooltip' data-tip="Valider" onClick={addEtape}><Check/></button>
                            <button aria-label="close" className="btn btn-sm btn-circle btn-ghost text-red-500 tooltip-bottom tooltip" data-tip="Fermer"  onClick={(e)=> {e.preventDefault(); document.getElementById("my_modal_1").close()}}><X/></button>
                        </div>
                    </div>
                    <div className='form-content grid grid-cols-2 gap-2'>
                        <input 
                        type="text" 
                        name='nomEtape'
                        className='input input-sm w-full inset-shadow-sm' 
                        placeholder='Nom Etape Production'
                        value={etape.nomEtape}
                        onChange={handleChange}
                         />
                        <select
                            name="activite"
                            className="input input-sm w-full inset-shadow-sm"
                            value={etape.activite}
                            onChange={handleChange}
                        >
                            <option className='text-center'>---Choississez une Activite---</option>
                            {
                                allActivite.filter((a)=> a.name).map((act)=>(
                                    <option key={act.id}>{act.name}</option>
                                ))
                            }
                        </select>
                    </div>
                    {
                        visibo ? (
                            <div className='border border-neutral-200 shadow-sm rounded-box'>
                                <span className='flex justify-between items-center shadow-sm p-5'>
                                    <h1 className='text-md font-semibold'>Listes OperationsMatieres</h1>
                                    <button className='btn btn-sm btn-circle bg-black text-white tooltip' data-tip="Add" onClick={() => setVisibo(false)}><Plus/></button>
                                </span>
                                <div className='text-center text-gray-500 p-5 italic'>
                                    <ListTest/>
                                </div>
                            </div>
                        ) :
                        <div className='border border-neutral-200 shadow-sm rounded-box'>
                                <span className='flex justify-between items-center shadow-sm p-5 '>
                                    <h1 className='text-md font-bold'>OperationsMatieres</h1>
                                    <button className='btn btn-sm btn-circle btn-ghost tooltip' data-tip="Retour a la liste" onClick={() => setVisibo(true)}><CornerDownLeft/></button>
                                </span>
                                <div className='p-5'>
                                    <Test/>
                                </div>
                            </div>
                    }
                </div>
            </div>
        </dialog>
    </div>
  )
}
