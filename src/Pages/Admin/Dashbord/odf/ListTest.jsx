import React, { useEffect, useState } from "react";
import axios from "axios";
import { ClipboardPen, Pen, Save, SquarePen, Trash2, Undo2 } from "lucide-react";

const ListTest = () => {
  const [data, setData] = useState([]);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(false);

  // Charger les enregistrements OperationsMatieres
  const fetchData = () => {
    axios
      .get("http://localhost:3000/operationsMatieres")
      .then((res) => setData(res.data))
      .catch((err) => console.error("Erreur fetch OperationsMatieres:", err));
  };
  useEffect(()=>{
    fetchData()
  },[])
  // Supprimer un enregistrement complet
  const handleDelete = async (id) => {
    if (!window.confirm("❌ Supprimer cet enregistrement ?")) return;
    try {
      await axios.delete(`http://localhost:3000/operationsMatieres/${id}`);
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  // Modifier quantité
  const handleChangeQuantite = (recordId, opIndex, matIndex, value,e) => {
    e.preventDefault();
    setData((prev) =>
      prev.map((rec) =>
        rec.id === recordId
          ? {
              ...rec,
              Op: rec.Op.map((op, i) =>
                i === opIndex
                  ? {
                      ...op,
                      matieres: op.matieres.map((m, j) =>
                        j === matIndex ? { ...m, quantite: value } : m
                      )
                    }
                  : op
              )
            }
          : rec
      )
    );
  };

  // Sauvegarder les modifications
  const handleSave = async (record) => {
    try {
      setLoading(true);
      await axios.put(`http://localhost:3000/operationsMatieres/${record.id}`, record);
      setEditing(null);
      fetchData();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="">
      {/* Tableau des enregistrements */}
      {data.length === 0 ? (
        <p>Aucune donnée enregistrée.</p>
      ) : (
        <table className="border-collapse border-neutral-400 w-full overflow-y-scroll">
          <thead>
            <tr className="border border-neutral-300 p-2">
              <th className="border border-neutral-300 p-2">Opération</th>
              <th className=" border border-neutral-300 p-2">Matières</th>
              <th className="border border-neutral-300 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((record) =>
              record.Op.map((op, i) => (
                <tr key={`${record.id}-${i}`}>
                  <td className="border border-neutral-300 p-2">{op.operation}</td>
                  <td className="border border-neutral-300 p-2">
                    <ul>
                      {op.matieres.map((m, j) => (
                        <li key={j}>
                          {m.name} :{" "}
                          {editing === record.id ? (
                            <input
                              type="number"
                              min="0"
                              value={m.quantite}
                              onChange={(e) =>
                                handleChangeQuantite(
                                  record.id,
                                  i,
                                  j,
                                  Number(e.target.value)
                                )
                              }
                              className="w-16 border p-1"
                            />
                          ) : (
                            <strong>{m.quantite}</strong>
                          )}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="border border-neutral-300 p-2">
                    {editing === record.id ? (
                      <div className="flex justify-center gap-5">
                        <button
                          onClick={() => handleSave(record)}
                          disabled={loading}
                          className="btn btn-sm btn-circle btn-ghost text-blue-500 tooltip"
                          data-tip="Save"
                        >
                          <Save/>
                        </button>
                        <button
                          onClick={() => setEditing(null)}
                          className="btn btn-sm btn-circle btn-ghost text-neutral-500 tooltip"
                          data-tip="Back"
                        >
                          <Undo2/>
                        </button>
                      </div>
                    ) : (
                      <div className="flex justify-center gap-5">
                        <button
                          onClick={() => setEditing(record.id)}
                          className="btn btn-sm btn-circle btn-ghost text-green-500 tooltip"
                          data-tip="Modififer"
                        >
                          <SquarePen/>
                        </button>
                        <button
                          onClick={(e) =>{ e.preventDefault();handleDelete(record.id)}}
                          className="btn btn-sm btn-circle btn-ghost text-red-500 tooltip"
                          data-tip="Supprimer"
                        >
                          <Trash2/>
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ListTest;
