import { Backpack, ClipboardPen, CornerDownLeft, Factory, Plus } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import ModalAddEtprod from './ModalAddEtprod'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import ModalEditOdf from './ModalEditOdf'

export default function DetailOdf() {
  const {id} = useParams()
  const [dataOdf,setDataOdf] = useState([])
  const[etapeProd,setEtapeProd] = useState([])
  const [odf,setOdf] = useState({
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
    axios.get(`http://localhost:3000/odf/${id}`)
    .then((res)=>{
      setDataOdf(res.data)
    })
    .catch((err)=>console.log(err))
  },[id]);
  useEffect(()=>{
    axios.get(`http://localhost:3000/etapeProd`)
    .then((res)=>{
      setEtapeProd(res.data)
    })
    .catch((err)=>console.log(err))
  })

  const onEdit = (editOdf) =>{
    axios.put(`http://localhost:3000/odf/${id}`,editOdf)
    .then((res)=>console.log(res))
    .catch((err)=>console.log(err))
  }
  const handleEdit = (nomClient,numeroDossier,numeroCreation,numeroUsine,dateCreation,dateLivraison,dateOuverture,designation,observation,quantiteLivree,quantiteCommande)=>{
    setOdf({
      nomClient:nomClient,
      numeroDossier:numeroDossier,
      numeroCreation:numeroCreation,
      numeroUsine:numeroUsine,
      dateCreation:dateCreation,
      dateLivraison:dateLivraison,
      dateOuverture:dateOuverture,
      designation:designation,
      observation:observation,
      quantiteLivree:quantiteLivree,
      quantiteCommande:quantiteCommande
    })
    document.getElementById("my_modal_2").showModal();
  }
  return (
    <div className='px-2 flex flex-col gap-5'>
        <div className='pt-2'>
          <div className="breadcrumbs text-sm flex">
  <ul>
    <li>
      <Link to="/">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="h-4 w-4 stroke-current">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path>
        </svg>
        Dashbord
      </Link>
    </li>
    <li>
      <Link to="/ordre_de_fabrication">
        <Factory/>
        Ordre de fabrication
      </Link>
    </li>
    <li className='text-yellow-400'>
      <span className="inline-flex items-center gap-2">
        <ClipboardPen/>
        Details
      </span>
    </li>
  </ul>
          </div>
        </div>

        <div className='content bg-white'>
            <div className='header p-5 flex justify-between items-center shadow-sm'>
              <h1 className='text-sm'>Ordre de facture de Mr. <strong>{dataOdf.nomClient}</strong></h1>
              <Link to='/ordre_de_fabrication'><button className='btn btn-sm bg-black text-white'><CornerDownLeft/>Retour a la liste</button></Link>
            </div>
            <div className='infos flex flex-col border border-neutral-200 m-5'>
              <div className='flex justify-between items-center shadow-sm p-5'>
                <h1>Information de base</h1>
                <button className='btn btn-sm btn-primary text-white' onClick={()=>{
                    handleEdit(
                      dataOdf.nomClient,
                      dataOdf.numeroDossier,
                      dataOdf.numeroCreation,
                      dataOdf.numeroUsine,
                      dataOdf.dateCreation,
                      dataOdf.dateLivraison,
                      dataOdf.dateOuverture,
                      dataOdf.designation,
                      dataOdf.observation,
                      dataOdf.quantiteLivree,
                      dataOdf.quantiteCommande
                    )
                  }}>Update</button>
              </div>
              <div className='grid grid-cols-3 gap-5 text-neutral-500 text-sm text-left p-5'>
                <span className=' '>
                  Nom du Client : {dataOdf.nomClient}
                </span>
                <span className=''>
                  Numero de Dossier : {dataOdf.numeroDossier}
                </span>
                <span className=''>
                  Numero d'Usine : {dataOdf.numeroUsine}
                </span>
                <span className=''>
                  Date D'ouverture  : {dataOdf.dateOuverture}
                </span>
                <span className=''>
                  Date de Creation : {dataOdf.dateCreation}
                </span>
                <span className=''>
                  Date de Livraison : {dataOdf.dateLivraison}
                </span>
                <span className=''>
                  Numero Creation : {dataOdf.numeroCreation}
                </span>
                <span className=''>
                  Quantite Commande : {dataOdf.quantiteCommande}
                </span>
                <span className=''>
                  Quantite Livree : {dataOdf.quantiteLivree}
                </span>
                <span className=''>
                  Designation : {dataOdf.designation}
                </span>
                <span className='col-span-2'>
                  Observation : {dataOdf.observation}
                </span>
              </div>
            </div>
            <div className='etape m-5 border border-neutral-200'>
                <div className='header shadow-sm flex justify-between p-5'> 
                  <h1>Etape de Production</h1>
                  <button className='btn btn-sm bg-black text-white' onClick={()=>{document.getElementById("my_modal_1").showModal();}}><Plus/>Ajouter</button>
                </div>
                <div className='p-5'>
                  
                </div>
              </div>
        </div>
        <ModalEditOdf odf={odf}  onEdit={onEdit} id="my_modal_2"/>
        <ModalAddEtprod id="my_modal_1"/>
    </div>
  )
}
