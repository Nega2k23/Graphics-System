
export default function Filter() {

  return (
    <div className="join">
  <div>
    <div>
      <input 
      className="input input-sm join-item inset-shadow-sm"
      placeholder="Search"      
        />
    </div>
  </div>
  <select className="select select-sm join-item inset-shadow-sm">
    <option value="">Filter</option>
    <option>Sci-fi</option>
    <option>Drama</option>
    <option>Action</option>
  </select>
  <div className="indicator">
    <button className="btn btn-sm join-item">Search</button>
  </div>
</div>
  )
}
