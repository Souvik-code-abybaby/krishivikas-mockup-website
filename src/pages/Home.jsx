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
import IffcoBanner from "../components/IffcoBanner";
import { dealers } from "../assets/data/dealers";
import { useEffect } from "react";
import { dealerSlug } from "./Dealer";
export default function HomePage({ setPage }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const navigate = useNavigate();
  const DEFAULT_TOKEN =
    "39767|0Lh5B3iICCyTLnDHhGwFeytBbGTLfKOzU7JliXc81e43c3e1";
  const token = useSelector((state) => state.auth.token)
    ? useSelector((state) => state.auth.token)
    : DEFAULT_TOKEN;
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
  console.log(categories);
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
        <section> <SectionTitle title="Nearby Digital Ducans" className="mt-4" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 mt-5">
  {dealers.map((d) => (
    <article
      key={d.name}
      className="group relative aspect-[3/4] overflow-hidden rounded-2xl shadow-lg transition duration-300 hover:-translate-y-0.5 hover:shadow-2xl cursor-pointer"
     onClick={() => navigate(`/dealer/${dealerSlug(d)}`)}
    >
      {/* Picture */} 
      <img
        src={d.image}
        alt={d.name}
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
      />

      {/* Dark fade so the info stays readable */}
      <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/55 to-transparent to-55%" />

      {/* Verified badge */}


      {/* Floating info panel */}
      <div className="absolute inset-x-3 bottom-2  z-10 rounded-xl  p-3.5 ">
        <h3 className="mb-1 text-base font-semibold text-white">
          {d.name}
        </h3>
        <p className="mb-2 text-[13px] text-gray-200">{d.city}</p>

        {/* <div className="mb-2.5 flex items-center justify-between">
          <Rating value={d.rating} />
          <small className="text-gray-500">{d.products} products</small>
        </div> */}

      </div>
    </article>
  ))}
</div></section>
    

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
          <SectionTitle title="Best Deals" />
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
        <IffcoBanner/>
    <section>
          {/* <SectionTitle icon="user" title="Discoveries For You" /> */}
          
          <SectionTitle title="Our Recommendations" />
          <div className="product-strip">
            {products.slice(0, 5).map((p) => (
              <ProductCard
                key={p.name}
                product={p}
                compact
                onOpen={() => setPage("product")}
                onClick={() => navigate("/category")}
              />
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
          {/* <SectionTitle icon="play" title="Watch & Learn (YT Reels)" /> */}
          <SectionTitle title="Watch & Learn" onClick="https://www.youtube.com/@JoinKrishiVikas"/>
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
          <FaqSection />
          {/* </div> */}
        </slide>
      </main>
    </>
  );
}
