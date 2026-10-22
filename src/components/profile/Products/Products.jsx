import { useState } from 'react'
import { Search, Download, Edit2, Trash2, Package, CheckCircle, XCircle } from 'lucide-react'
import ProfileSidebar from '../ProfileSidebar'
import { useEffect } from 'react'
const products = [
  { id: 1, name: 'Mahindra 575 DI', brand: 'Mahindra', contact: '9876543210', price: '₹6,50,000', status: 'Active', img: 'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?w=60&h=60&fit=crop&auto=format' },
  { id: 2, name: 'Swaraj 744 FE', brand: 'Swaraj', contact: '9812345678', price: '₹5,80,000', status: 'Active', img: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=60&h=60&fit=crop&auto=format' },
  { id: 3, name: 'John Deere 5050 D', brand: 'John Deere', contact: '9898989898', price: '₹8,25,000', status: 'Sold Out', img: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=60&h=60&fit=crop&auto=format' },
  { id: 4, name: 'Sonalika DI 750 III', brand: 'Sonalika', contact: '9765432100', price: '₹4,95,000', status: 'Active', img: 'https://images.unsplash.com/photo-1560493676-04071c5f467b?w=60&h=60&fit=crop&auto=format' },
  { id: 5, name: 'TAFE 45 DI', brand: 'TAFE', contact: '9001234567', price: '₹4,20,000', status: 'Active', img: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=60&h=60&fit=crop&auto=format' },
  { id: 6, name: 'Eicher 557', brand: 'Eicher', contact: '9123456780', price: '₹5,10,000', status: 'Sold Out', img: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=60&h=60&fit=crop&auto=format' },
]

export default function Products() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('All')

  const filtered = products.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.brand.toLowerCase().includes(search.toLowerCase())
    const matchFilter = filter === 'All' || p.status === filter
    return matchSearch && matchFilter
  })

  const total = products.length
  const active = products.filter(p => p.status === 'Active').length
  const soldOut = products.filter(p => p.status === 'Sold Out').length
 useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <main className="profile-page">
      <ProfileSidebar />

      <section className="profile-content space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'Total Products', value: total, color: '#13693A', bg: '#e8f5ee', icon: <Package size={20} /> },
            { label: 'Active Products', value: active, color: '#16A34A', bg: '#dcfce7', icon: <CheckCircle size={20} /> },
            { label: 'Sold Out', value: soldOut, color: '#64748B', bg: '#f1f5f9', icon: <XCircle size={20} /> },
          ].map(s => (
            <div key={s.label} className="bg-white rounded-2xl p-4 border border-[#E4E7EC] shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: s.bg, color: s.color }}>
                {s.icon}
              </div>
              <div>
                <p className="font-heading font-700 text-2xl text-[#1E293B]">{s.value}</p>
                <p className="text-xs text-[#64748B]">{s.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Toolbar */}
        <div className="bg-white rounded-2xl p-4 border border-[#E4E7EC] shadow-sm flex flex-wrap items-center gap-3">
          <div className="flex-1 min-w-48 relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B]" />
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-sm border border-[#E4E7EC] rounded-xl text-[#1E293B] focus:outline-none focus:border-[#13693A] focus:ring-2 focus:ring-[#13693A]/10"
            />
          </div>
          <div className="flex items-center gap-2">
            {['All', 'Active', 'Sold Out'].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 text-xs font-500 rounded-lg border ${filter === f ? 'bg-linear-to-bl from-[#13693A] via-[#8cbf44] to-[#13693A] text-white ' : 'border-[#E4E7EC] text-[#64748B] hover:border-[#13693A] hover:text-[#13693A]'}`}
              >
                {f}
              </button>
            ))}
          </div>
          <button className="flex items-center gap-2 px-3 py-2 text-sm border border-[#E4E7EC] rounded-xl text-[#64748B] hover:border-[#13693A] hover:text-[#13693A]">
            <Download size={14} /> Export
          </button>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-[#E4E7EC] shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-[#F6F9F7] border-b border-[#E4E7EC]">
                  {['Product', 'Brand', 'Contact', 'Price', 'Status', 'Actions'].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-heading font-600 text-[#64748B] uppercase tracking-wide whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map(p => (
                  <tr key={p.id} className="border-b border-[#E4E7EC] last:border-0 hover:bg-[#F6F9F7] transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl overflow-hidden bg-[#F6F9F7] flex-shrink-0">
                          <img src={p.img} alt={p.name} className="w-full h-full object-cover" />
                        </div>
                        <span className="text-sm font-500 text-[#1E293B] whitespace-nowrap">{p.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-[#64748B]">{p.brand}</td>
                    <td className="px-4 py-3 text-sm text-[#64748B]">{p.contact}</td>
                    <td className="px-4 py-3 text-sm font-600 text-[#1E293B]">{p.price}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2.5 py-1 text-xs font-600 rounded-full ${p.status === 'Active' ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                        {p.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button className="p-1.5 rounded-lg hover:bg-blue-50 text-[#64748B] hover:text-blue-600">
                          <Edit2 size={14} />
                        </button>
                        <button className="p-1.5 rounded-lg hover:bg-red-50 text-[#64748B] hover:text-[#DC2626]">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filtered.length === 0 && (
            <div className="text-center py-12 text-[#64748B]">
              <Package size={32} className="mx-auto mb-2 opacity-30" />
              <p className="text-sm">No products found</p>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}