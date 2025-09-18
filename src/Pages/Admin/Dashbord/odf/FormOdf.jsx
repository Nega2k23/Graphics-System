import { Plus, X } from "lucide-react";
import { useState } from "react";
import AddEtprod from "./AddEtprod";
import axios from "axios";

export default function FormOdf({onAdd}) {
    const [clients, setClients] = useState([]);

    axios.get(`http://localhost:3000/clients/`)
    .then((res)=>{
        setClients(res.data);
    })
    .catch((err)=>{
        console.log(err);
    });

    const [formData, setFormData] = useState({
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
    tva: "",
    ttc: "",
    tsp: "",
    remise: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) =>{

    e.preventDefault();

    axios.post(`http://localhost:3000/Odf`,formData)
    .then((res)=>{
    onAdd(res.data);
    })
    .catch((err)=>{console.log(err)})

    setFormData("");
  }


  return (
    <div className=" mx-auto p-6 bg-white rounded-box shadow-sm">
      <form  className="grid grid-cols-2 gap-4">
        {/* Nom Client */}
        <div>
          <select
            name="nomClient"
            value={formData.nomClient}
            onChange={handleChange}
            className="input input-sm w-full"
          >
            <option value="">---Choississez un client---</option>
            {
                clients.map((client) => (
                    <option key={client.id}>{client.name}</option>
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
            value={formData.numeroDossier}
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
            value={formData.dateOuverture}
            onChange={handleChange}
            className="input input-sm w-full"
          />
        </div>

        <div>
          <input
            type="date"
            title="Date de Creation"
            name="dateCreation"
            value={formData.dateCreation}
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
            value={formData.numeroCreation}
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
            value={formData.quantiteCommande}
            onChange={handleChange}
            className="input input-sm w-full"
          />
        </div>

        <div>
          <input
            type="number"
            placeholder="Quantite Livree"
            name="quantiteLivree"
            value={formData.quantiteLivree}
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
            value={formData.dateLivraison}
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
            value={formData.designation}
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
            value={formData.numeroUsine}
            onChange={handleChange}
            className="input input-sm w-full"
          />
        </div>

        {/* Observation */}
        <div className="col-span-2">
          <textarea
            name="observation"
            placeholder="Observation"
            value={formData.observation}
            onChange={handleChange}
            className="input input-sm h-20 w-full pt-2"
          />
        </div>
       
         <button className="btn bg-green-400 text-white btn-sm" onSubmit={handleSubmit} >Save</button>
      </form>
      </div>
  );
}
