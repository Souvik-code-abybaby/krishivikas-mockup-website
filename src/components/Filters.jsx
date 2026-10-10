import { useState } from "react";
export default function Filters({ onApply }) {
  const [dirty, setDirty] = useState(false);
  return (<>
<aside className="filters" onChange={() => setDirty(true)}>
      <h2>Filters</h2>
      <fieldset>
        <legend>Category</legend>
        {[
          "All Tractors",
          "Compact Tractors",
          "Utility Tractors",
          "4WD Tractors",
          "High HP Tractors",
        ].map((x, i) => (
          <label key={x}>
            <input type="checkbox" defaultChecked={i === 0} /> {x}
          </label>
        ))}
      </fieldset>
      <fieldset>
        <legend>
          Brand 
        </legend>
        {["John Deere", "Mahindra", "Swaraj", "New Holland", "Eicher"].map(
          (x) => (
            <label key={x}>
              <input type="checkbox" /> {x}
            </label>
          ),
        )}
        <button>View More</button>
      </fieldset>
      <fieldset>
        <legend>Price Range</legend>
        <input type="range" min="0" max="100" defaultValue="100" />
        <div className="range-values">
          <span>₹ 0</span>
          <span>₹ 5,00,000+</span>
        </div>
      </fieldset>
      <fieldset>
        <legend>
          Power (HP) 
        </legend>
        {["Below 20", "20 - 30", "31 - 50", "51 - 75", "Above 75"].map((x) => (
          <label key={x}>
            <input type="checkbox" /> {x}
          </label>
        ))}
      </fieldset>
    </aside>
    {dirty && (
  <div className="filter-apply">
    <button
      type="button"
      className="primary full"
      onClick={() => {
        setDirty(false);
        onApply?.();
      }}
    >
      Apply Filters
    </button>
  </div>
)}
</>
  );
}