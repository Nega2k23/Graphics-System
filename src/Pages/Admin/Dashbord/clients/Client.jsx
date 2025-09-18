import React, { useEffect, useState } from 'react'
import Filter from '../components/Filter'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { PersonStanding, Plus, SquarePen, Trash2, X } from 'lucide-react'

export default function Client() {
  const [allClient,setAllClient] = useState([])
  const [client,setClient] = useState({
    id:"",
    name:"",
    adresse:"",
    contact:""
  })

  const [editClient,setEditClient] = useState({
    id:"",
    name:"",
    adresse:"",
    contact:""
  })
  // const onChangeSearch = (e) =>{
  //   setSearch(e.target.value)
  // }
  // const filter = allClient.filter((i)=>i.name.toLowerCase().includes(search.toLowerCase()))

  useEffect(()=>{
    setEditClient(client)
  },[client])


  useEffect(()=>{
   axiosData()
  },[])
   

    const axiosData = async () =>{ 
    await axios.get(`http://localhost:3000/clients`)
    .then((res)=>{
      console.log(res)
      setAllClient(res.data)
    })}
  const handleChange = (e) =>
  {
    
    const {name,value} = e.target;
    setClient({...client,[name]:value})
  }

  const handleSubmit = (e) => {

     e.preventDefault();
     axios.post(`http://localhost:3000/clients/`,client)
    .then((res)=>{
      console.log(res)
    })
    .catch(err=>console.log(err))
  }
  const onDelete = (id)=>{
   axios.delete(`http://localhost:3000/clients/${id}`,client)
   .then((res)=>{
    console.log(res)
    const supClient=[...allClient]
    setClient(supClient.filter((eco)=> eco.id !== id))
   })
  }


  

const onEdit = async (e) => {
      e.preventDefault()

        try {
            await axios.put(`http://localhost:3000/clients/${editClient.id}`,editClient)
        }catch(err){
            console.log(err)
        }
    }

   const handleEdit = (id,name,adresse,contact) =>{
    setEditClient({
      id:id,
      name:name,
      adresse:adresse,
      contact:contact
    })
    document.getElementById('my_modal_1').showModal();
  }

  return (
    <div className='client px-2 flex gap-5 flex-col'>
      <div className='pt-2'>
        <div className="breadcrumbs text-sm flex">
  <ul>
    <li>
      <Link to="/" >
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
    <li className='text-yellow-400'>
      <Link to="/client">
        <PersonStanding/>
        Client
      </Link>
    </li>
  </ul>
        </div>
      </div>

          <dialog id="my_modal_5" className="modal">
            
            <form method='dialog' className='modal-box w-300 bg-white flex flex-col gap-5' onSubmit={handleSubmit}>
                <div className="flex justify-between items-center">
                 <h1 className='text-2xl font-bold'> Ajouter Client</h1>
                 <button type='reset' className='btn btn-circle btn-sm btn-ghost text-red-500 tooltip tooltip-left' data-tip="Fermer" onClick={()=>{document.getElementById("my_modal_5").close();}}><X/></button>
                </div>
                <div className='grid grid-cols-2 gap-2'>
                  <span>
<label className="input input-sm validator w-full inset-shadow-sm">
  <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <g
      strokeLinejoin="round"
      strokeLinecap="round"
      strokeWidth="2.5"
      fill="none"
      stroke="currentColor"
    >
      <path
        d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"
      ></path>
      <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
    </g>
  </svg>
  <input
    type="number"
    required
    placeholder="ID"
    pattern="[0-100]*"
    minlength="3"
    maxlength="30"
    name='id'
    value={client.id}
    onChange={handleChange}
  />
</label>
<div className='validator-hint'>error id</div>
                  </span>
                  <span>
<label className="input input-sm validator w-full inset-shadow-sm">
  <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
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
    name='name'
    value={client.name}
    onChange={handleChange}
  />
</label>
<div className='validator-hint'>error Username</div>
                  </span>
                  <span>
<label className="input input-sm validator w-full inset-shadow-sm">
  <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
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
  <input type="email" placeholder="mail@site.com" pattern='[a-z-0-9]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}' required name='adresse' value={client.adresse} onChange={handleChange} />
</label>            
<div className="validator-hint hidden">Enter valid email address</div>
                  </span>
                  <span>
<label className="input input-sm validator w-full inset-shadow-sm">
  <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
    <g fill="none">
      <path
        d="M7.25 11.5C6.83579 11.5 6.5 11.8358 6.5 12.25C6.5 12.6642 6.83579 13 7.25 13H8.75C9.16421 13 9.5 12.6642 9.5 12.25C9.5 11.8358 9.16421 11.5 8.75 11.5H7.25Z"
        fill="currentColor"
      ></path>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6 1C4.61929 1 3.5 2.11929 3.5 3.5V12.5C3.5 13.8807 4.61929 15 6 15H10C11.3807 15 12.5 13.8807 12.5 12.5V3.5C12.5 2.11929 11.3807 1 10 1H6ZM10 2.5H9.5V3C9.5 3.27614 9.27614 3.5 9 3.5H7C6.72386 3.5 6.5 3.27614 6.5 3V2.5H6C5.44771 2.5 5 2.94772 5 3.5V12.5C5 13.0523 5.44772 13.5 6 13.5H10C10.5523 13.5 11 13.0523 11 12.5V3.5C11 2.94772 10.5523 2.5 10 2.5Z"
        fill="currentColor"
      ></path>
    </g>
  </svg>
  <input
    type="tel"
    className="tabular-nums"
    required
    placeholder="Phone"
    pattern="[0-9]*"
    minlength="10"
    maxlength="10"
    name='contact'
    value={client.contact}
    onChange={handleChange}
  />
</label>
<div className="validator-hint">error contact</div>
                  </span>
                  
                      <button className="btn btn-sm bg-black text-white col-span-2" type='submit'>Soumettre</button>                  
                </div>
              
            </form>
          </dialog>
          <dialog id="my_modal_1" className="modal">
            
            <form method='dialog' className='modal-box w-300 bg-white flex flex-col gap-5' onSubmit={onEdit}>
                <div className="flex justify-between items-center">
                 <h1 className='text-2xl font-bold'> Modifier Client</h1>
                 <button type='reset' className='btn btn-circle btn-sm btn-ghost text-red-500 tooltip tooltip-left' data-tip="Fermer" onClick={()=>{document.getElementById("my_modal_1").close();}}><X/></button>
                </div>
                <div className='grid grid-cols-2 gap-2'>
                  <span>
<label className="input input-sm validator w-full inset-shadow-sm">
  <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <g
      strokeLinejoin="round"
      strokeLinecap="round"
      strokeWidth="2.5"
      fill="none"
      stroke="currentColor"
    >
      <path
        d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"
      ></path>
      <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
    </g>
  </svg>
  <input
    type="number"
    required
    placeholder="ID"
    pattern="[0-100]*"
    minlength="3"
    maxlength="30"
    name='id'
    value={editClient.id}
    onChange={(e)=>{setEditClient((prev)=>({...prev,id:e.target.value}))}}
  />
</label>
<div className='validator-hint'>error id</div>
                  </span>
                  <span>
<label className="input input-sm validator w-full inset-shadow-sm">
  <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
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
    name='name'
    value={editClient.name}
    onChange={(e)=>{setEditClient((prev)=>({...prev,name:e.target.value}))}}
  />
</label>
<div className='validator-hint'>error Username</div>
                  </span>
                  <span>
<label className="input input-sm validator w-full inset-shadow-sm">
  <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
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
  <input type="email" placeholder="mail@site.com" pattern='[a-z-0-9]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}' required name='adresse' 
  value={editClient.adresse}
  onChange={(e)=>{setEditClient((prev)=>({...prev,adresse:e.target.value}))}} />
</label>            
<div className="validator-hint hidden">Enter valid email address</div>
                  </span>
                  <span>
<label className="input input-sm validator w-full inset-shadow-sm">
  <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
    <g fill="none">
      <path
        d="M7.25 11.5C6.83579 11.5 6.5 11.8358 6.5 12.25C6.5 12.6642 6.83579 13 7.25 13H8.75C9.16421 13 9.5 12.6642 9.5 12.25C9.5 11.8358 9.16421 11.5 8.75 11.5H7.25Z"
        fill="currentColor"
      ></path>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6 1C4.61929 1 3.5 2.11929 3.5 3.5V12.5C3.5 13.8807 4.61929 15 6 15H10C11.3807 15 12.5 13.8807 12.5 12.5V3.5C12.5 2.11929 11.3807 1 10 1H6ZM10 2.5H9.5V3C9.5 3.27614 9.27614 3.5 9 3.5H7C6.72386 3.5 6.5 3.27614 6.5 3V2.5H6C5.44771 2.5 5 2.94772 5 3.5V12.5C5 13.0523 5.44772 13.5 6 13.5H10C10.5523 13.5 11 13.0523 11 12.5V3.5C11 2.94772 10.5523 2.5 10 2.5Z"
        fill="currentColor"
      ></path>
    </g>
  </svg>
  <input
    type="tel"
    className="tabular-nums"
    required
    placeholder="Phone"
    pattern="[0-9]*"
    minlength="10"
    maxlength="10"
    name='contact'
    value={editClient.contact}
    onChange={(e)=>{setEditClient((prev)=>({...prev,contact:e.target.value}))}}
  />
</label>
<div className="validator-hint">error contact</div>
                  </span>
                  
                      <button className="btn btn-sm btn-primary text-white col-span-2" type='submit'>Update</button>                  
                </div>
              
            </form>
          </dialog>
          
    <div className='flex justify-between items-center rounded-box bg-white p-5 shadow-sm'>
      <h1 className='font-bold text-sm text-yellow-400'>
        LISTES CLIENTS
        </h1>
        <Filter/>
        <button className="btn bg-black btn-sm text-white font-bold shadow-sm" onClick={()=>document.getElementById('my_modal_5').showModal()}><Plus/>Ajouter Client</button>
    </div>
      <span className='list flex flex-col gap-2'>
        <div className="overflow-x-auto rounded-box border border-base-content/5 bg-white shadow-sm">
  <table className="table text-center">
    <thead>
      <tr>
        <th>ID</th>
        <th>Nom</th>
        <th>Adresse</th>
        <th>Contact</th>
        <th>Option</th>
      </tr>
    </thead>
    <tbody>
      {
        allClient.map((item)=>{
          return (

          <tr key={item.id} className='hover:bg-neutral-200'>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>{item.adresse}</td>
            <td>{item.contact}</td>
            <td className='flex justify-center gap-2'>
              <button className='btn btn-sm btn-circle btn-ghost text-green-500 tooltip' data-tip="Modifier" onClick={()=>{handleEdit(item.id,item.name,item.adresse,item.contact)}}><SquarePen/></button>
              <button className='btn btn-sm btn-circle btn-ghost text-red-500 tooltip' data-tip="Supprimer" onClick={()=>{onDelete(item.id)}}><Trash2/></button>
            </td>
          </tr>
          
        )})
      }      
    </tbody>
  </table>
</div>
      </span>
    </div>
  )
}
