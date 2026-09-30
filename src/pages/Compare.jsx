import Breadcrumb from "../components/Breadcrumb";
import { products } from "../../public/products";
// const A=`../src/assets/`;
import SectionTitle from "../components/SectionTitle";
export default function ComparePage() {
  return (
    <main className="compare-page">
      <section className="compare-hero container">
        <Breadcrumb items={["Home", "Compare Tractors"]} />
        <h1>Compare Tractors</h1>
        <p>
          Compare specifications, features and prices
          <br />
          to choose the best tractor for your needs.
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
                <p>Tractor&nbsp; | &nbsp;{p.hp}</p>
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
              <div>
                {pair.map((p) => (
                  <div key={p.name}>
                    <span>{p.hp}</span>
                    <img src={p.image} alt={p.name} />
                    <small>{p.category}</small>
                    <h3>{p.name}</h3>
                  </div>
                ))}
                <b>VS</b>
              </div>
              <button>View Comparison →</button>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}