import { Search, Download } from 'lucide-react'
import ProfileSidebar from '../../components/profile/ProfileSidebar'
import { typeColors } from './leadConstants'
import { useEffect } from 'react'
const leadList = [
  { id: 1, buyer: 'Ramesh Kumar', model: 'Mahindra 575 DI', status: 'Active', type: 'Hot', date: '04 Aug 2025' },
  { id: 2, buyer: 'Sukhwinder Singh', model: 'Swaraj 744 FE', status: 'Follow Up', type: 'Warm', date: '03 Aug 2025' },
  { id: 3, buyer: 'Gopal Das', model: 'TAFE 45 DI', status: 'Closed', type: 'Cold', date: '01 Aug 2025' },
  { id: 4, buyer: 'Vikas Sharma', model: 'John Deere 5050 D', status: 'Active', type: 'Hot', date: '31 Jul 2025' },
]

export default function LeadList() {
         useEffect(() => {
                    window.scrollTo(0, 0);
                  }, []);
  return (
    <main className="profile-page">
      <ProfileSidebar />

      <section className="profile-content space-y-4">
        <div className="bg-white rounded-2xl border border-[#E4E7EC] shadow-sm p-4 flex flex-wrap gap-3">
          <div className="relative flex-1 min-w-40">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B]" />
            <input type="text" placeholder="Search leads..." className="w-full pl-9 pr-3 py-2 text-sm border border-[#E4E7EC] rounded-xl focus:outline-none focus:border-[#13693A]" />
          </div>
          {['Model', 'Status', 'Type', 'Date'].map(f => (
            <select key={f} className="text-sm border border-[#E4E7EC] rounded-xl px-3 py-2 text-[#64748B] bg-white focus:outline-none focus:border-[#13693A]">
              <option>{f}</option>
            </select>
          ))}
          <button className="flex items-center gap-2 px-3 py-2 text-sm border border-[#E4E7EC] rounded-xl text-[#64748B] hover:border-[#13693A] hover:text-[#13693A]">
            <Download size={14} /> Export CSV
          </button>
        </div>

        <div className="bg-white rounded-2xl border border-[#E4E7EC] shadow-sm overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-[#F6F9F7] border-b border-[#E4E7EC]">
                {['Buyer', 'Product Model', 'Lead Type', 'Status', 'Date'].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-heading font-600 text-[#64748B] uppercase tracking-wide whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {leadList.map(l => (
                <tr key={l.id} className="border-b border-[#E4E7EC] last:border-0 hover:bg-[#F6F9F7]">
                  <td className="px-4 py-3 text-sm font-500 text-[#1E293B]">{l.buyer}</td>
                  <td className="px-4 py-3 text-sm text-[#64748B]">{l.model}</td>
                  <td className="px-4 py-3"><span className={`px-2.5 py-1 text-xs font-600 rounded-full ${typeColors[l.type]}`}>{l.type}</span></td>
                  <td className="px-4 py-3">
                    <span className={`px-2.5 py-1 text-xs font-600 rounded-full ${l.status === 'Active' ? 'bg-green-50 text-green-700' : l.status === 'Closed' ? 'bg-gray-100 text-gray-500' : 'bg-amber-50 text-amber-600'}`}>{l.status}</span>
                  </td>
                  <td className="px-4 py-3 text-sm text-[#64748B]">{l.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  )
}