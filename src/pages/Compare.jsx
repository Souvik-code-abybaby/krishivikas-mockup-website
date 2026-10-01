import Breadcrumb from "../components/Breadcrumb";
import { products } from "../../public/products";
// const A=`../src/assets/`;
import SectionTitle from "../components/SectionTitle";
export default function ComparePage() {
  return (
    <main className="compare-page">
      <section className="compare-hero container">
        <Breadcrumb items={["Home", "Compare Categories"]} />
        <h1>Compare Categories</h1>
        <p>
          Compare specifications, features and prices
          <br />
          to choose the best category for your needs.
        </p>
      </section>
      <section className="compare-selector container">
        {[products[0], products[1]].map((p, i) => (
          <article className="selector-panel" key={p.name}>
            <header>
              <h2>◉ Tractor {i + 1}</h2>
              <button>↻ Change</button>
            </header>
            <div className="selector-body">
              <div className="select-fields">
                <label>
                  Select Category
                  <select>
                    <option>Tractor</option>
                  </select>
                </label>
                <label>
                  Select Brand
                  <select>
                    <option>{i ? "Swaraj" : "Eicher"}</option>
                  </select>
                </label>
                <label>
                  Select Model
                  <select>
                    <option>{i ? "735 FE" : "380"}</option>
                  </select>
                </label>
              </div>
              <div className="selected-product">
                <img src={p.image} alt={p.name} />
                <h3>{p.name}</h3>
                <p>Tractor</p>
              </div>
            </div>
          </article>
        ))}
        <span className="vs">VS</span>
      </section>
      <section className="container popular-compare">
        <SectionTitle title="Popular Tractor Comparison" />
        <div className="comparison-grid">
          {[
            [products[0], products[1]],
            [products[2], products[3]],
          ].map((pair, i) => (
            <article className="comparison-card" key={i}>
              <div className="">
                {pair.map((p) => (
                  <div>    <div key={p.name}>
                    {/* <span>{p.hp}</span> */}
                    <img src={p.image} alt={p.name} />
                    <div className="flex flex-col items-start"><small>{p.category}</small>
                    <p className="text-xs">{p.name}</p></div>
                    
                  </div></div>
              
                ))}
                <b className="bg-[#13693A]">VS</b>
              </div>
              <button className="hover:bg-green-800/80 bg-green-700">View Comparison</button>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}