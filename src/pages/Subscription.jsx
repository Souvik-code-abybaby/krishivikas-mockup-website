import { useState } from "react";
import {
  Download,
  RotateCcw,
  CheckCircle,
  Package,
  Zap,
  Image,
} from "lucide-react";
import ProfileSidebar from "../components/profile/ProfileSidebar";
import { useEffect } from "react";
const subscriptions = [
  {
    id: 1,
    pkg: "Gold Plan",
    mrp: "₹12,000",
    purchased: "₹9,999",
    discount: "₹2,001",
    daysLeft: 142,
    status: "Active",
  },
  {
    id: 2,
    pkg: "Silver Plan",
    mrp: "₹6,000",
    purchased: "₹5,499",
    discount: "₹501",
    daysLeft: 0,
    status: "Expired",
  },
];

const plans = [
  {
    name: "Silver",
    duration: "6 Months",
    price: "₹5,499",
    products: 50,
    boosts: 5,
    banners: 3,
    popular: false,
    color: "#64748B",
  },
  {
    name: "Gold",
    duration: "12 Months",
    price: "₹9,999",
    products: 150,
    boosts: 15,
    banners: 10,
    popular: true,
    color: "#13693A",
  },
  {
    name: "Platinum",
    duration: "24 Months",
    price: "₹17,999",
    products: 500,
    boosts: 50,
    banners: 30,
    popular: false,
    color: "#8CBF44",
  },
];

export default function Subscription() {
  const [renewOpen, setRenewOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("");
  const [paymentOpen, setPaymentOpen] = useState(false);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <main className="profile-page">
      <ProfileSidebar />

      {renewOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[95vh] overflow-y-auto scrollbar-none">
            <div className="px-6 py-4 border-b border-[#E4E7EC] flex items-center justify-between sticky top-0 bg-white z-20">
              <h3 className="font-heading font-600 text-[#1E293B] ">
                Choose Subscription Plan
              </h3>
              <button
                onClick={() => setRenewOpen(false)}
                className="text-[#64748B] hover:text-[#1E293B] text-xl leading-none"
              >
                ×
              </button>
            </div>
            {!paymentOpen ? (
              <div className="p-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {plans.map((plan) => (
                    <div
                      key={plan.name}
                      onClick={() => setSelectedPlan(plan.name)}
                      className={`relative rounded-2xl border-2 p-5 cursor-pointer transition-all ${selectedPlan === plan.name ? "border-[#13693A] bg-[#F6F9F7]" : "border-[#E4E7EC] hover:border-[#13693A]/40"} ${plan.popular ? "shadow-lg" : ""}`}
                    >
                      {plan.popular && (
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-[#13693A] text-white text-xs font-600 rounded-full whitespace-nowrap">
                          Most Popular
                        </div>
                      )}
                      <div className="text-center mb-4">
                        <p
                          className="font-heading font-700 text-xl"
                          style={{ color: plan.color }}
                        >
                          {plan.name}
                        </p>
                        <p className="text-xs text-[#64748B]">
                          {plan.duration}
                        </p>
                        <p className="font-heading font-800 text-3xl text-[#1E293B] mt-2">
                          {plan.price}
                        </p>
                      </div>
                      <div className="space-y-2.5">
                        {[
                          {
                            icon: <Package size={14} />,
                            text: `${plan.products} Products`,
                          },
                          {
                            icon: <Zap size={14} />,
                            text: `${plan.boosts} Boosts`,
                          },
                          {
                            icon: <Image size={14} />,
                            text: `${plan.banners} Banner Promotions`,
                          },
                        ].map((item, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-2 text-sm text-[#64748B]"
                          >
                            <span className="text-[#13693A]">{item.icon}</span>
                            {item.text}
                          </div>
                        ))}
                      </div>
                      {selectedPlan === plan.name && (
                        <div className="mt-3 flex items-center justify-center gap-1 text-xs text-[#13693A] font-600">
                          <CheckCircle size={14} /> Selected
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <button
                  disabled={!selectedPlan}
                  onClick={() => setPaymentOpen(true)}
                  className="mt-5 w-full py-3 bg-linear-to-r from-[#13693A] via-[#8cbf44] to-[#13693A] text-white rounded-xl font-500 hover:bg-[#0e4f2c] disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Proceed to Payment
                </button>
              </div>
            ) : (
              <div className="p-6 space-y-5">
                <div className="bg-[#F6F9F7] rounded-2xl p-4">
                  <p className="text-xs text-[#64748B] mb-1">Selected Plan</p>
                  <p className="font-heading font-700 text-lg text-[#1E293B]">
                    {selectedPlan} —{" "}
                    {plans.find((p) => p.name === selectedPlan)?.price}
                  </p>
                </div>
                <div className="space-y-3">
                  <p className="font-heading font-600 text-[#1E293B] text-sm">
                    Payment Details
                  </p>
                  {["Card Number", "Expiry (MM/YY)", "CVV"].map((f) => (
                    <div key={f}>
                      <label className="block text-xs font-500 text-[#64748B] mb-1">
                        {f}
                      </label>
                      <input
                        type="text"
                        placeholder={f}
                        className="w-full px-3 py-2.5 text-sm border border-[#E4E7EC] rounded-xl focus:outline-none focus:border-[#13693A]"
                      />
                    </div>
                  ))}
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setPaymentOpen(false)}
                    className="flex-1 py-2.5 border border-[#E4E7EC] text-[#64748B] rounded-xl text-sm"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => {
                      setRenewOpen(false);
                      setPaymentOpen(false);
                    }}
                    className="flex-1 py-2.5 bg-[#13693A] text-white rounded-xl text-sm font-500"
                  >
                    Confirm Payment
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <section className="profile-content">
        <div className="bg-white rounded-2xl border border-[#E4E7EC] shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-[#E4E7EC] bg-[#F6F9F7]">
            <h3 className="font-heading font-600 text-[#1E293B]">
              Subscription History
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#E4E7EC]">
                  {[
                    "Package",
                    "MRP",
                    "Purchased",
                    "Discount",
                    "Days Left",
                    "Invoice",
                    "Status",
                    "Action",
                  ].map((h) => (
                    <th
                      key={h}
                      className="text-left px-4 py-3 text-xs font-heading font-600 text-[#64748B] uppercase tracking-wide whitespace-nowrap"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {subscriptions.map((sub) => (
                  <tr
                    key={sub.id}
                    className="border-b border-[#E4E7EC] last:border-0 hover:bg-[#F6F9F7]"
                  >
                    <td className="px-4 py-4 text-sm font-600 text-[#1E293B]">
                      {sub.pkg}
                    </td>
                    <td className="px-4 py-4 text-sm text-[#64748B]">
                      {sub.mrp}
                    </td>
                    <td className="px-4 py-4 text-sm font-500 text-[#1E293B]">
                      {sub.purchased}
                    </td>
                    <td className="px-4 py-4 text-sm text-green-600 font-500">
                      {sub.discount}
                    </td>
                    <td className="px-4 py-4">
                      {sub.daysLeft > 0 ? (
                        <span className="text-sm font-500 text-[#1E293B]">
                          {sub.daysLeft} days
                        </span>
                      ) : (
                        <span className="text-sm text-[#DC2626]">Expired</span>
                      )}
                    </td>
                    <td className="px-4 py-4">
                      <button className="flex items-center gap-1.5 text-xs text-[#13693A] hover:underline font-500">
                        <Download size={12} /> Download
                      </button>
                    </td>
                    <td className="px-4 py-4">
                      <span
                        className={`px-2.5 py-1 text-xs font-600 rounded-full ${sub.status === "Active" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-600"}`}
                      >
                        {sub.status}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <button
                        onClick={() => setRenewOpen(true)}
                        className="flex items-center gap-1.5 px-3 py-1.5 [#13693A] bg-linear-to-r from-[#13693A] via-[#8cbf44] to-[#13693A] text-white text-xs rounded-lg hover:bg-[#0e4f2c] font-500"
                      >
                        <RotateCcw size={12} /> Renew
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </main>
  );
}
