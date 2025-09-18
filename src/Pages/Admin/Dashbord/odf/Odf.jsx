import { ClipboardPen, CornerDownLeft, Download, Factory, Plus, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Filter from "../components/Filter";
import FormOdf from "./FormOdf";
import axios from "axios";
export default function Odf() {
  const [visible, setVisible] = useState(false);

  const [dataOdf, setDataOdf] = useState([]);

  const [clients, setClients] = useState([]);

   const [odf, setOdf] = useState({
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
  });

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

  useEffect(() => {
    axiosData()
  },[]);

  useEffect(()=>{
    axios.get(`http://localhost:3000/etapeProd`)
    .then((res)=>{
      [...odf.etapeProd] = [...res.data]
    })
    .catch((err)=>console.log(err))
  })
  const axiosData = async () =>{
    await axios.get(`http://localhost:3000/odf`)
    .then((res)=>{
      setDataOdf(res.data)
    }).catch((err)=>console.log(err))
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOdf({ ...odf, [name]: value });
  };

  const onAdd = (e) => {
    e.preventDefault()
    axios
      .post(`http://localhost:3000/odf/`, odf)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    setOdf("");
  };

  const onDelete = (id) =>{
    axios.delete(`http://localhost:3000/odf/${id}`, odf)
    .then((res)=>{
      res.filter((sup)=> sup.id !== id)
    })
  }
  return (
    <div className="Odf px-2 flex gap-5 flex-col">
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
              <Link to="/ordre_de_fabrication">
                <Factory/>
                Ordre de Fabrication
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="Odf-header flex justify-between gap-8 items-center p-5 bg-white rounded-box shadow-sm">
        {visible ? (
          <h1 className=" text-yellow-400 font-bold text-sm">
            CREATION D'ORDRE DE FABRICATION
          </h1>
        ) : (
          <h1 className="text-yellow-400 font-bold text-sm">ORDRE DE FABRICATION</h1>
        )}
        <Filter />
        {visible ? (
          <button
            className="btn bg-black btn-sm text-white"
            onClick={() => {
              setVisible(false);
            }}
          >
            <CornerDownLeft/>
            Back
          </button>
        ) : (
          <button
            className="btn bg-black btn-sm text-white"
            onClick={() => {
              setVisible(true);
            }}
          >
            <Plus /> Creer Ordre de fabrication
          </button>
        )}
      </div>
      <div className="Odf-content">
        {visible ? (
          <div className=" mx-auto p-6 bg-white rounded-box shadow-sm" >
            <form className="grid grid-cols-2 gap-4" onSubmit={onAdd}>
              {/* Nom Client */}
              <div>
                <select
                  name="nomClient"
                  value={odf.nomClient}
                  onChange={handleChange}
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
                  value={odf.numeroDossier}
                  onChange={handleChange}
                  className="input input-sm w-full"
                />
              </div>

              {/* Dates */}
              <div>
                <input
                  type="date"
                  title="Date d'ouverture"
                  name="dateOuverture"
                  value={odf.dateOuverture}
                  onChange={handleChange}
                  className="input input-sm w-full"
                />
              </div>

              <div>
                <input
                  type="date"
                  title="Date de Creation"
                  name="dateCreation"
                  value={odf.dateCreation}
                  onChange={handleChange}
                  className="input input-sm w-full"
                />
              </div>

              {/* Numéro Création */}
              <div>
                <input
                  type="text"
                  placeholder="Numéro Création"
                  name="numeroCreation"
                  value={odf.numeroCreation}
                  onChange={handleChange}
                  className="input input-sm w-full"
                />
              </div>

              {/* Quantités */}
              <div>
                <input
                  type="number"
                  placeholder="Quantite Commande"
                  name="quantiteCommande"
                  value={odf.quantiteCommande}
                  onChange={handleChange}
                  className="input input-sm w-full"
                />
              </div>

              <div>
                <input
                  type="number"
                  placeholder="Quantite Livree"
                  name="quantiteLivree"
                  value={odf.quantiteLivree}
                  onChange={handleChange}
                  className="input input-sm w-full"
                />
              </div>

              {/* Date Livraison */}
              <div>
                <input
                  type="date"
                  title="Date de Livraison"
                  name="dateLivraison"
                  value={odf.dateLivraison}
                  onChange={handleChange}
                  className="input input-sm w-full"
                />
              </div>

              {/* Designation */}
              <div>
                <input
                  type="text"
                  placeholder="Designation"
                  name="designation"
                  value={odf.designation}
                  onChange={handleChange}
                  className="input input-sm w-full"
                />
              </div>

              {/* Numéro Usine */}
              <div>
                <input
                  type="text"
                  placeholder="Numéro Usine"
                  name="numeroUsine"
                  value={odf.numeroUsine}
                  onChange={handleChange}
                  className="input input-sm w-full"
                />
              </div>

              {/* Observation */}
              <div className="col-span-2">
                <textarea
                  name="observation"
                  placeholder="Observation"
                  value={odf.observation}
                  onChange={handleChange}
                  className="input input-sm h-20 w-full pt-2"
                />
              </div>

              <button
                className="btn bg-black text-white btn-sm col-span-2"
                type="submit"
              >
                Enregistrer
              </button>
            </form>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {dataOdf.map((items) => (
              <div key={items.id} className="flex items-center justify-between p-5 border border-neutral-300 bg-white shadow-sm rounded-box">
                <div className="">
                  <span className="flex items-center gap-2">
                  <h1>{items.nomClient} | </h1>
                  <h2 className="text-neutral-400">{items.numeroDossier}</h2>
                </span>
                <h2 className="text-neutral-500">{items.observation}</h2>
                </div>
                <div className="flex gap-5">
                  <button className="btn btn-sm btn-circle btn-ghost tooltip" data-tip="Telecharger"><Download/></button>
                  <button className="btn btn-sm btn-circle btn-ghost text-neutral-500 tooltip" data-tip="Details"><Link to={`/ordre_de_fabrication/details_Ordre_de_fabrication/${items.id}`}><ClipboardPen/></Link></button>
                  <button className="btn btn-sm btn-circle btn-ghost text-red-500 tooltip" data-tip="Supprimer" onClick={()=>{onDelete(items.id)}}><Trash2/></button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
