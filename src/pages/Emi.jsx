import { useState } from "react";
import { useMemo } from "react";
import InnerHero from "../components/InnerHero";
import { useEffect } from "react";
export default function EMIPage() {
  const [amount, setAmount] = useState(500000);
  const [rate, setRate] = useState(8.5);
  const [years, setYears] = useState(5);
  const [tab, setTab] = useState("Tractor");
      useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
  const emi = useMemo(() => {
    const r = rate / 12 / 100,
      n = years * 12;
    return Math.round(
      (amount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1),
    );
  }, [amount, rate, years]);
  return (
    <main className="container emi-page">
      <InnerHero
        title="EMI Calculator"
        text="Easy monthly plans for your farming needs."
      />
      <section className="calculator-card">
        <div className="calculator-tabs">
          {["Tractor", "Commercial Vehicle", "Others"].map((t) => (
            <button
              className={tab === t ? "active" : ""}
              onClick={() => setTab(t)}
              key={t}
            >
              {t}
            </button>
          ))}
        </div>
        <label>
          Loan Amount (₹)
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
          />
        </label>
        <label>
          Interest Rate (%)
          <input
            type="number"
            step=".1"
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
          />
        </label>
        <label>
          Tenure (Years)
          <div className="tenure">
            <input
              type="range"
              min="1"
              max="10"
              value={years}
              onChange={(e) => setYears(Number(e.target.value))}
            />
            <input
              type="number"
              min="1"
              max="10"
              value={years}
              onChange={(e) => setYears(Number(e.target.value))}
            />
          </div>
        </label>
        <div className="emi-result">
          <span>Monthly EMI</span>
          <strong>₹ {emi.toLocaleString("en-IN")}</strong>
        </div>
        <button
          className="primary full"
          onClick={() => {
            setAmount(500000);
            setRate(8.5);
            setYears(5);
          }}
        >
          Calculate Again
        </button>
      </section>
         
    </main>
  );
}