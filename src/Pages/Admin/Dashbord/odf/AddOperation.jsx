import axios from "axios";
import { Plus, Trash, X } from "lucide-react";
import { useEffect, useState } from "react";

// const opera = [
//   {id: 1,name: "Opération N1", matieres: ["Fer", "Bois", "Plastique", "Spire", "Clou", "Fil"]},
//   { id: 2, name: "Opération 2", matieres: ["Coton", "Soie", "Laine"] },
//   { id: 3, name: "Opération 3", matieres: ["Cuivre", "Inox", "Aluminium"] },
// ];

export default function  AddOperation() {

  const [Opera,setOpera] = useState([])
  const [Op,setOp] = useState({
    operation:[],
    matieres:[]
  })

  useEffect(()=>{
    axios.get(`http://localhost:3000/operationsMatieres`)
    .then((res)=>{
      setOpera(res.data)
    })
  })
  
  useEffect(()=>{
    axios.get(`http://localhost:3000/operation`)
    .then((res)=>{
      [...Op.operation]=[...res.data]
    })
  })
  useEffect(()=>{
    axios.get(`http://localhost:3000/matiere`)
    .then((res)=>{
      [...Op.matieres]=[...res.data]
    })
  })
  // Ajouter une opération
  const addOperation = (e) => {
    e.preventDefault();
    setOpera([...Opera,{Op}])
  };
  const onAddOperation = (e) =>{
    e.preventDefault();
    axios.post(`http://localhost:3000/operationsMatieres`,{Op})
    .then((res)=>console.log(res))
    .catch((err)=>console.log(err))
  }

  // Supprimer une opération
  const removeOperation = (index) => {
    const updated = [...Opera];
    updated.splice(index, 1);
    setOpera(updated);
  };

  const removeMatiere = (opIndex, matiereIndex) => {
    const updated = [...Opera];
    updated[opIndex].matieres.splice(matiereIndex, 1);
    setOpera(updated);
  };

  // Changer d’opération
  const handleOperationChange = (index, value) => {
    const updated = [...Opera];
    updated[index].operationId = value;
    updated[index].matieres = []; // reset matières
    setOp(updated);
  };

  // Ajouter une matière avec quantité par défaut
  const addMatiere = (index, matiere) => {
    const updated = [...Opera];
    if (!updated[index].matieres.find((m) => m.nom === matiere)) {
      updated[index].matieres.push({ nom: matiere, quantite: 1 });
    }
    setOp(updated);
  };

  // Modifier la quantité
  const handleQuantiteChange = (opIndex, matiereIndex, value) => {
    const updated = [...Opera];
    updated[opIndex].matieres[matiereIndex].quantite = Number(value);
    setOp(updated);
  };


  return (
    <div className="">
      {/* Formulaire */}

      <div className="flex flex-col gap-5">
        <div className="flex justify-end">
          <button className="btn btn-sm bg-black text-white" onClick={addOperation}>
            <Plus />
            Add Operation
          </button>
        </div>
        {Opera.map((op, index) => {
          const selectedOp = Opera.find(
            (o) => o.id.toString() === op.operationId
          );

          return (
            <div
              key={index}
              className="border border-neutral-200 p-5 shadow-sm rounded-box"
            >
              {/* Choix de l’opération */}
              <select
                value={op.operationId}
                onChange={(e) => handleOperationChange(index, e.target.value)}
                className="select select-sm w-full"
              >
                <option>-- Sélectionner une opération --</option>
                {Opera.map((o) => (
                  <option key={o.id} value={o.id}>
                    {o.name}
                  </option>
                ))}
              </select>

              {/* Matières */}
              {selectedOp && (
                <div className="pt-2">
                  <div className="grid grid-cols-2 gap-2 pb-2">
                    {/* Matières déjà ajoutées avec quantités */}
                    {op.matieres.map((m, i) => (
                      <div  key={i}>
                        <span className="font-medium flex justify-between gap-2 items-center pb-1">{m.nom}
                          <button className="btn btn-sm btn-circle btn-ghost text-red-500" onClick={(e)=>{e.preventDefault();removeMatiere(index,i)}}><X/></button>
                        </span>
                        <input
                          type="number"
                          min="1"
                          value={m.quantite}
                          onChange={(e) =>
                            handleQuantiteChange(index, i, e.target.value)
                          }
                          className="input input-sm w-full "
                        />
                      </div>
                    ))}
                  </div>

                  {/* Boutons pour ajouter matières */}
                  <div className="flex gap-2 flex-wrap mt-2">
                    {selectedOp.matieres.map((m, i) => (
                      <button
                        key={i}
                        onClick={(e) => {
                          e.preventDefault();
                          addMatiere(index, m);
                        }}
                        className="bg-green-500 btn btn-sm text-white"
                      >
                        <Plus
                         /> {m}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Bouton supprimer opération */}
              <div className="flex justify-end">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    removeOperation(index);
                  }}
                  className="mt-3 btn btn-sm bg-red-500 text-white"
                >
                  Supprimer Operation
                </button>
              </div>
            </div>
          );
        })}
        <button className='btn bg-black text-white btn-sm mb-5' onClick={onAddOperation}>Enregistrer</button>
      </div>
    </div>
  );
}
