import { useState } from "react";
import Hero from "../components/Hero";
import CategorySearchForm from "../components/CategorySearchForm";
import SectionTitle from "../components/SectionTitle";
import { products } from "../../public/products";
import ProductCard from "../components/ProductCard";
import Icon from "../components/Icon";
import Rating from "../components/Rating";
import Footer from "../components/Footer/Footer";
import { useSelector } from "react-redux";
const A = `../src/assets/`;
import { useQuery } from "@tanstack/react-query";
import { getCategoryList } from "../services/api/categoryApi";
import { useNavigate } from "react-router-dom";
import farmerField from "../assets/farmer-field.jpg";
import redTractor from "../assets/red-tractor.jpg";
import cropSeedling from "../assets/crop-seedling.jpg";
import sprayerField from "../assets/sprayer-field.jpg";
import farmerRice from "../assets/farmer-rice.jpg";
import FaqSection from "../components/faqSection";
export default function HomePage({ setPage }) {
  const navigate=useNavigate();
  const DEFAULT_TOKEN = "39767|0Lh5B3iICCyTLnDHhGwFeytBbGTLfKOzU7JliXc81e43c3e1"
    const token = useSelector((state) => state.auth.token)? useSelector((state) => state.auth.token):DEFAULT_TOKEN;
  const categoryIcons = ["◉", "▰", "❧", "⌇", "▱", "⌁", "◍"];
    const {
    data: categoryList,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["category-list", 1, token], // Add the languageId to the queryKey for better cache management
    queryFn: () => getCategoryList(1, token), // Pass a function that calls getCategoryList
  });
  // const categories = [
  //   "Tractor",
  //   "Commercial Vehicle",
  //   "Seeds",
  //   "Pesticides",
  //   "Fertilizers",
  //   "Implements",
  //   "Tyres",
  // ];
  const reels = [
    [farmerField, "How to Improve Soil Health", "2:30", "12.5K"],
    [redTractor, "Tractor Maintenance Tips", "2:17", "24.8K"],
    [cropSeedling, "Best Seeds for Higher Yield", "2:30", "18.5K"],
    [sprayerField, "Pesticide Spraying Techniques", "3:45", "11.2K"],
    [farmerRice, "Fertilizer Guide for Crops", "2:45", "16.7K"],
  ];
  const [faq, setFaq] = useState(null);
  const faqs = [
    "How do I place an order on Krishi Vikas?",
    "How can I track my order?",
    "What are the payment options available?",
    "What is the return and refund policy?",
    "Do you provide EMI on tractors and vehicles?",
    "How do I become a seller on Krishi Vikas?",

  ];
  const categories = categoryList ?? [];
  console.log(categories)
  return (
    <>
      <main className="container home-page">
        <div className="relative">
          <Hero>
            <div className="hero-content">
              <span className="eyebrow">New Season, Better Yield</span>
              <h1>
                Powering Your
                <br />
                <em>Farming Dreams</em>
              </h1>
              <p>
                Discover the best farm machinery and agricultural products at
                competitive prices.
              </p>
              <button className="primary" onClick={() => setPage("tractors")}>
                Explore Now <span>→</span>
              </button>
            </div>
            <div className="dots">
              <span></span>
              <span></span>
              <span className="on"></span>
              <span></span>
            </div>
          </Hero>

          <CategorySearchForm />
        </div>

    <section>
  <SectionTitle title="Categories" />
  <div className="category-grid">
    {isLoading && <p>Loading categories...</p>}
    {isError && <p>Could not load categories.</p>}

    {categories.map((c) => (
      <button
        className="category-card"
        key={c.category_id}
        onClick={() => navigate("/category")}
      >
        <img
          src={c.category_icon}
          alt={c.category_name}
          className="category-img"
          loading="lazy"
        />
        <strong>{c.category_name}</strong>
      </button>
    ))}
  </div>
</section>
        <section>
          <SectionTitle title="Our Recommendations" />
          <div className="product-strip">
            {products.slice(0, 5).map((p) => (
              <ProductCard
                key={p.name}
                product={p}
                compact
                onOpen={() => setPage("product")}
                onClick={()=>navigate("/category")}
              />
            ))}
          </div>
        </section>

        <section className="compare-promo">
          <div>
            <span>SMART FARMING STARTS HERE</span>
            <h2>Compare. Choose. Grow.</h2>
            <p>
              Use our compare feature to find the best option for your needs.
            </p>
            <button className="light-btn" onClick={() => setPage("compare")}>
              Compare Now →
            </button>
          </div>
          <div className="promo-features">
            <div>
              <Icon name="calculator" />
              <b>EMI Calculator</b>
              <small>Plan your purchase</small>
            </div>
            <div>
              <Icon name="grid" />
              <b>Wide Range</b>
              <small>Top brands & models</small>
            </div>
            <div>
              <Icon name="check" />
              <b>Trusted Sellers</b>
              <small>Safe & secure</small>
            </div>
          </div>
        </section>

        <section>
          {/* <SectionTitle icon="star" title="Best Deals" /> */}
           <SectionTitle  title="Best Deals" />
          <div className="product-strip">
            {products.slice(0, 5).map((p) => (
              <ProductCard
                key={p.name}
                product={p}
                boosted
                onOpen={() => setPage("product")}
              />
            ))}
          </div>
        </section>

        <section>
          {/* <SectionTitle icon="play" title="Watch & Learn (YT Reels)" /> */}
          <SectionTitle  title="Watch & Learn (YT Reels)" />
          <div className="reels">
            {reels.map(([image, title, time, views]) => (
              <article className="reel" key={title}>
                <img src={image} alt="" />
                <div className="reel-shade"></div>
                <button aria-label={`Play ${title}`}>
                  <Icon name="play" size={38} />
                </button>
                <span className="duration">{time}</span>
                <div>
                  <h3>{title}</h3>
                  <small>● {views} views</small>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="seasonal">
          <div>
            <span>Seasonal Offer</span>
            <h2>
              Get the Best Deals on
              <br />
              Tractors & Farm Equipment
            </h2>
            <p>
              Higher productivity&nbsp; | &nbsp;Better returns&nbsp; |
              &nbsp;Stronger India
            </p>
          </div>
          <strong>
            UP TO
            <br />
            <b>₹50,000</b>
            <br />
            OFF
          </strong>
          <button onClick={() => setPage("tractors")}>Shop Now →</button>
        </section>

        <section>
          {/* <SectionTitle icon="user" title="Discoveries For You" /> */}
          <SectionTitle  title="Discoveries For You" />
          <div className="seller-grid">
            {[
              "Sharma Agro Traders",
              "Green Farm Solutions",
              "Singh Tractors",
              "Kisan Seva Kendra",
            ].map((name, i) => (
              <article className="seller-card" key={name}>
                <div className="avatar">{name[0]}</div>
                <div>
                  <h3>
                    {name} <span>✓</span>
                  </h3>
                  <p>
                    {
                      [
                        "Jaipur, Rajasthan",
                        "Indore, Madhya Pradesh",
                        "Lucknow, Uttar Pradesh",
                        "Patna, Bihar",
                      ][i]
                    }
                  </p>
                  <Rating value={`4.${7 - i}`} />
                  <small>{56 - i * 6} products</small>
                </div>
                <button className="primary full">View Profile</button>
              </article>
            ))}
          </div>
        </section>

        <slide>
          {/* <SectionTitle title="Frequently Asked Questions" /> */}
          {/* <div className="faq-grid"> */}
            {/* {faqs.map((q, i) => (
              <button
                className={`faq ${faq === i ? "open" : ""}`}
                key={q}
                onClick={() => setFaq(faq === i ? null : i)}
              >
                <span>
                  {q}
                  {faq === i && (
                    <small>
                      Our support team will help you with every step.
                    </small>
                  )}
                </span>
       
              </button>
            ))} */}
            <FaqSection/>
          {/* </div> */}
        </slide>

      
      </main>

    </>
  );
}