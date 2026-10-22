import { useState,useEffect } from 'react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts'
import { Package, Users, TrendingUp, ArrowUpRight, ArrowDownRight, Calendar, BookOpen } from 'lucide-react'
import ProfileSidebar from '../../components/profile/ProfileSidebar'

const barData = [
  { name: 'Mahindra 575', leads: 42 },
  { name: 'Swaraj 744', leads: 38 },
  { name: 'John Deere 5050', leads: 29 },
  { name: 'Sonalika 750', leads: 24 },
  { name: 'TAFE 45', leads: 18 },
  { name: 'Eicher 557', leads: 15 },
]

const pieData = [
  { name: 'Tractors', value: 45, color: '#13693A' },
  { name: 'Implements', value: 25, color: '#8CBF44' },
  { name: 'Harvesters', value: 15, color: '#5AAE3B' },
  { name: 'Irrigation', value: 10, color: '#F59E0B' },
  { name: 'Seeds', value: 5, color: '#64748B' },
]

const schemes = [
  {
    id: 1,
    title: 'PM-KISAN Samman Nidhi Yojana 2025',
    desc: 'Financial support of ₹6,000/year to small and marginal farmers in three equal installments.',
    state: 'All India',
    date: '15 Jul 2025',
    img: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=220&fit=crop&auto=format',
  },
  {
    id: 2,
    title: 'Kisan Credit Card Scheme — Special Drive',
    desc: 'Collateral-free credit up to ₹1.6 lakh for crop cultivation and allied activities.',
    state: 'Maharashtra',
    date: '01 Aug 2025',
    img: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=400&h=220&fit=crop&auto=format',
  },
  {
    id: 3,
    title: 'Sub-Mission on Agricultural Mechanisation',
    desc: 'Subsidy up to 50% on farm machinery for small/marginal farmers and SCs/STs.',
    state: 'Punjab, Haryana',
    date: '10 Aug 2025',
    img: 'https://images.unsplash.com/photo-1560493676-04071c5f467b?w=400&h=220&fit=crop&auto=format',
  },
]

const kpiCards = [
  {
    label: 'Total Products',
    value: '148',
    change: '+12%',
    up: true,
    icon: <Package size={22} />,
    color: '#13693A',
    bg: '#e8f5ee',
  },
  {
    label: 'Total Leads',
    value: '1,247',
    change: '+23%',
    up: true,
    icon: <Users size={22} />,
    color: '#8CBF44',
    bg: '#f0f7e6',
  },
  {
    label: 'Total Sales',
    value: '₹84.2L',
    change: '-4%',
    up: false,
    icon: <TrendingUp size={22} />,
    color: '#5AAE3B',
    bg: '#eef7e8',
  },
]

export default function Dashboard() {
    useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [startDate, setStartDate] = useState('2025-07-01')
  const [endDate, setEndDate] = useState('2025-08-04')

  return (
    <main className="profile-page">
      <ProfileSidebar />

      <section className="profile-content space-y-6">
        {/* Date Filter */}
        <div className="flex flex-wrap items-center gap-3 bg-white rounded-2xl px-5 py-4 border border-[#E4E7EC] shadow-sm">
          <Calendar size={18} className="text-[#13693A]" />
          <span className="text-sm font-500 text-[#64748B]">Date Range:</span>
          <input
            type="date"
            value={startDate}
            onChange={e => setStartDate(e.target.value)}
            className="text-sm border border-[#E4E7EC] rounded-lg px-3 py-1.5 text-[#1E293B] focus:outline-none focus:border-[#13693A] focus:ring-2 focus:ring-[#13693A]/10"
          />
          <span className="text-[#64748B] text-sm">to</span>
          <input
            type="date"
            value={endDate}
            onChange={e => setEndDate(e.target.value)}
            className="text-sm border border-[#E4E7EC] rounded-lg px-3 py-1.5 text-[#1E293B] focus:outline-none focus:border-[#13693A] focus:ring-2 focus:ring-[#13693A]/10"
          />
          <button className="px-4 py-1.5 bg-linear-to-tl from-[#13693A] via-[#8cbf44] to-[#13693A] text-white text-sm rounded-lg hover:bg-[#0e4f2c] font-500">
            Apply
          </button>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {kpiCards.map(card => (
            <div key={card.label} className="bg-white rounded-2xl p-5 border border-[#E4E7EC] shadow-sm hover:shadow-md group">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: card.bg, color: card.color }}>
                  {card.icon}
                </div>
                <span className={`flex items-center gap-1 text-xs font-600 px-2 py-1 rounded-full ${card.up ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-500'}`}>
                  {card.up ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                  {card.change}
                </span>
              </div>
              <p className="font-heading font-700 text-2xl text-[#1E293B] mb-1">{card.value}</p>
              <p className="text-sm text-[#64748B]">{card.label}</p>
            </div>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          {/* Bar Chart */}
          <div className="lg:col-span-3 bg-white rounded-2xl p-5 border border-[#E4E7EC] shadow-sm">
            <div className="mb-4">
              <h3 className="font-heading font-600 text-[#1E293B] text-base">Leads by Product</h3>
              <p className="text-xs text-[#64748B]">Total enquiries per product this period</p>
            </div>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={barData} barSize={28}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E4E7EC" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#64748B' }} tickLine={false} axisLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#64748B' }} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{ borderRadius: 12, border: '1px solid #E4E7EC', boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }}
                  cursor={{ fill: '#F6F9F7' }}
                />
                <Bar dataKey="leads" fill="#13693A" radius={[6, 6, 0, 0]}>
                  {barData.map((_, i) => (
                    <Cell key={i} fill={i % 2 === 0 ? '#13693A' : '#8CBF44'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Chart */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-5 border border-[#E4E7EC] shadow-sm">
            <div className="mb-4">
              <h3 className="font-heading font-600 text-[#1E293B] text-base">Product Categories</h3>
              <p className="text-xs text-[#64748B]">Distribution by category</p>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={55} outerRadius={80} paddingAngle={3} dataKey="value">
                  {pieData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #E4E7EC' }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-1 mt-2">
              {pieData.map(d => (
                <div key={d.name} className="flex items-center gap-1.5 text-xs text-[#64748B]">
                  <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: d.color }} />
                  {d.name}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Schemes */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <BookOpen size={18} className="text-[#13693A]" />
              <h3 className="font-heading font-600 text-[#1E293B] text-base">Upcoming Government Schemes</h3>
            </div>
            <button className="text-sm text-[#13693A] font-500 hover:underline">View All</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {schemes.map(s => (
              <div key={s.id} className="bg-white rounded-2xl overflow-hidden border border-[#E4E7EC] shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
                <div className="h-36 bg-[#F6F9F7] overflow-hidden">
                  <img src={s.img} alt={s.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] bg-[#e8f5ee] text-[#13693A] rounded-full px-2 py-0.5 font-600 uppercase tracking-wide">{s.state}</span>
                    <span className="text-[10px] text-[#64748B]">{s.date}</span>
                  </div>
                  <h4 className="font-heading font-600 text-sm text-[#1E293B] mb-2 line-clamp-2">{s.title}</h4>
                  <p className="text-xs text-[#64748B] mb-3 line-clamp-2">{s.desc}</p>
                  <button className="text-xs text-[#13693A] font-600 hover:underline flex items-center gap-1">
                    Read More →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}