import axios from 'axios';
import { Plus, X } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import ModalAddEtprod from './ModalAddEtprod';

export default function AddEtprod({setToggle}) {
    const [etapes, setEtapes] = useState([]);

    const [nameEtape,setNameEtape] = useState("");
    const [selectedActivite,SetselectedActivite] = useState("");
    const [Operations,setOperations] = useState([])

    const [activites, setActivites] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/etapeProd')
            .then(response => {
                setEtapes(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the etapes!', error);
            });
        },[])
        axios.get(`http://localhost:3000/activite`)
            .then(response => {
                setActivites(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the activites!', error);
            });

  return (
    <div className="Etprod mt-5">
                    <div className="Etprod-header flex justify-between items-center p-5 bg-base-200 shadow-md">
                        <h1 className="font-bold">Etape de production</h1>
                        <div className="flex items-center gap-10">
                            <button className="btn btn-sm bg-blue-600 text-white" onClick={()=> document.getElementById("my_modal_1").showModal()}><Plus/>Creer Etape production</button>
                            <button className="btn btn-circle btn-ghost text-red-500" onClick={()=>{setToggle(false)}}><X/></button>
                        </div>
                    </div>
                    <div className="Etprod-content">
                        {
                            etapes.map((etape)=>(
                                <div key={etape.id}>
                                    <h2>{etape.name}</h2>
                                    <p>Activité: {etape.selectAct}</p>
                                    <p>Opérations:</p>
                                    <ul>
                                        
                                    </ul>
                                </div>
                            ))
                        }
                    </div>
                    <ModalAddEtprod id="my_modal_1" activites={activites} nameEtape={nameEtape} setNameEtape={setNameEtape} selectedActivite={selectedActivite} SetselectedActivite={SetselectedActivite} Operations={Operations} setOperations={setOperations} />
    </div>
  )
}
