import React, { useEffect, useState } from "react";
import axios from "axios";
import { X } from "lucide-react";

const Test = () => {
  const [operations, setOperations] = useState([]);
  const [matieresDisponibles, setMatieresDisponibles] = useState([]);
  const [selectedOps, setSelectedOps] = useState([]);
  const [loading, setLoading] = useState(false);

  // Charger opérations et matières depuis API
  useEffect(() => {
    axios
      .get("http://localhost:3000/operation")
      .then((res) => setOperations(res.data))
      .catch((err) => console.error("Erreur fetch operations:", err));

    axios
      .get("http://localhost:3000/matiere")
      .then((res) => setMatieresDisponibles(res.data))
      .catch((err) => console.error("Erreur fetch matieres:", err));
  }, []);

  // Ajouter une opération avec matières vides
  const addOperation = (operationId) => {
    const op = operations.find((o) => o.id === operationId);
    if (!op) return;

    if (selectedOps.find((o) => o.operation === op.name)) return;

    setSelectedOps([...selectedOps, { operation: op.name, matieres: [] }]);
  };

  const removeOperation = (operationName) => {
    setSelectedOps(selectedOps.filter((op) => op.operation !== operationName));
  };

  // Ajouter ou mettre à jour une matière dans une opération
  const addMatiere = (operationName, matId, quantite) => {
    const mat = matieresDisponibles.find((m) => m.id === matId);
    if (!mat) return;

    setSelectedOps((prev) =>
      prev.map((op) =>
        op.operation === operationName
          ? {
              ...op,
              matieres: [
                ...op.matieres.filter((m) => m.name !== mat.name),
                { name: mat.name, quantite }
              ]
            }
          : op
      )
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedOps.length === 0) return alert("⚠️ Ajoutez au moins une opération");

    const newRecord = { id: Date.now().toString(), Op: selectedOps };

    try {
      setLoading(true);
      await axios.post("http://localhost:3000/operationsMatieres", newRecord);
      setSelectedOps([]);
      alert("✅ Opérations + matières enregistrées !");
    } catch (err) {
      console.error(err);
      alert("❌ Erreur lors de l'enregistrement");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-2">
        <select
          onChange={(e) => addOperation(e.target.value)}
          className="select select-sm w-full my-2" 
        >
          <option className="text-center">-- Choisir une Operation --</option>
          {operations.map((op) => (
            <option key={op.id} value={op.id}>
              {op.name}
            </option>
          ))}
        </select>
      </div>

      {selectedOps.map((op) => (
        <div key={op.operation} className="mb-5 border border-neutral-300 shadow-sm">
          <h3 className="font-semibold flex items-center justify-between shadow-sm p-2">{op.operation}
            <button className="btn btn-sm btn-circle btn-ghost text-red-500" onClick={()=>{removeOperation(op.operation)}}><X/></button>
          </h3>

          {matieresDisponibles.map((mat) => {
            const matExist = op.matieres.find((m) => m.name === mat.name);
            return (
              <div key={mat.id} className="p-2">
                <span className="text-neutral-600 flex justify-between items-center">
                  {mat.name}
                  <input
                  type="number"
                  min="0"
                  value={matExist?.quantite || 0}
                  onChange={(e) =>
                    addMatiere(op.operation, mat.id, Number(e.target.value))
                  }
                  className="input input-sm bg-white border border-neutral-300 mt-2 w-50"
                />
                </span>
              </div>
            );
          })}
        </div>
      ))}

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="btn btn-sm bg-black text-white w-full"
      >
        {loading ? "Enregistrement..." : "Enregistrer"}
      </button>
    </div>
  );
};

export default Test;
