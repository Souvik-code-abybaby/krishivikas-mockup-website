import { useState } from 'react'
import Breadcrumb from '../components/Breadcrumb';
const A=`../assets/`;
import Icon from '../components/Icon';
import ProductCard from '../components/ProductCard';
import { products } from '../../public/products';
import redTractor  from "../assets/red-tractor.jpg"
import greenTractor  from "../assets/green-tractor.jpg"
import tractorField  from "../assets/tractor-field.jpg"
import { useNavigate } from 'react-router-dom';
export default function ProductPage({ setPage }) {
  const navigate=useNavigate();
  const [thumb, setThumb] = useState(0);
  const [tab, setTab] = useState("Overview");
  const imgs = [
    redTractor,
    greenTractor,
    redTractor,tractorField
  ];
  return (
    <main className="container product-page">
      <Breadcrumb items={["Home", "Tractors", "Eicher 380"]} />
      <section className="product-detail">
        <div className="gallery">
          <div className="gallery-main">
            <img src={imgs[thumb]} alt="Eicher 380 tractor" />
          
          </div>
          <div className="thumbs">
            {imgs.map((img, i) => (
              <button
                className={i === thumb ? "active" : ""}
                onClick={() => setThumb(i)}
                key={i}
              >
                <img src={img} alt={`Tractor view ${i + 1}`} />
              </button>
            ))}
          </div>
        </div>
        <div className="product-info">
          <h1>Eicher 380</h1>
          <p>Tractor</p>
          <div className="detail-price">
            ₹ 5,80,000 
          </div>
          <div className="spec-highlights">
            <div>
              <b>◉</b>
              <span>
                <strong>40 HP</strong>
                <small>Power</small>
              </span>
            </div>
            <div>
              <b>◉</b>
              <span>
                <strong>4 Cylinder</strong>
                <small>Engine</small>
              </span>
            </div>
            <div>
              <b>◉</b>
              <span>
                <strong>Gear Drive</strong>
                <small>Transmission</small>
              </span>
            </div>
          </div>
          <dl>
            <div>
              <dt>Brand</dt>
              <dd>Eicher</dd>
            </div>
            <div>
              <dt>Model</dt>
              <dd>380</dd>
            </div>
            <div>
              <dt>Fuel Type</dt>
              <dd>Diesel</dd>
            </div>
          </dl>
          <div className="detail-actions">
            <button className="primary"> Contact Seller</button>
            <button className="outline" onClick={()=>navigate("/compare")}>
              ↻ Compare
            </button>
          </div>
        </div>
      </section>
      <div className="detail-tabs">
        {[
          "Overview",
          "Features",
          "Specifications",
          "Seller Info",
          "Reviews",
        ].map((t) => (
          <button
            className={tab === t ? "active" : ""}
            onClick={() => setTab(t)}
            key={t}
          >
            {t}
          </button>
        ))}
      </div>
      <section className="detail-bottom">
        <div className="overview">
          <h2>{tab}</h2>
          <p>
            Eicher 380 is a powerful and reliable tractor, ideal for small and
            medium-sized farms. It offers excellent fuel efficiency and
            durability.
          </p>
          <h3>Key Features</h3>
          {[
            "High fuel efficiency",
            "Strong build quality",
            "Low maintenance",
            "Suitable for multiple implements",
          ].map((x) => (
            <div className="feature" key={x}>
              <span>✓</span>
              {x}
            </div>
          ))}
        </div>
        <aside className="support-cards">
          {/* <button onClick={() => setPage("emi")}>
            <span className="support-icon">
              <Icon name="calculator" />
            </span>
            <span>
              <strong>EMI Calculator</strong>
              <small>Plan your purchase</small>
            </span>
            <b onClick={()=>navigate("/emi")}>Check EMI →</b>
          </button> */}
          <div>
            <h3>
              Compare with Similar Tractors{" "}
              <button onClick={() => setPage("compare")}>View All →</button>
            </h3>
            <div className="similar">
              <ProductCard product={products[1]} compact />
              <ProductCard product={products[2]} compact />
            </div>
          </div>
        </aside>
      </section>
       {/* <Footer setPage={setPage} /> */}
    </main>
  );
}