import { useState } from 'react'
import { Eye, Phone, MapPin, Clock } from 'lucide-react'
import ProfileSidebar from '../../components/profile/ProfileSidebar'
import LeadViewModal from './LeadViewModal'
import UpdateStatusModal from './UpdateStatusModal'
import { typeColors } from './leadConstants'
import { useEffect } from 'react'
const newLeads = [
  { id: 1, buyer: 'Ramesh Kumar', mobile: '9876543210', language: 'Hindi', address: 'Nagpur, Maharashtra', type: 'Hot', product: 'Mahindra 575 DI', brand: 'Mahindra', searchSince: '3 days ago', timeline: 'Within 1 week' },
  { id: 2, buyer: 'Sukhwinder Singh', mobile: '9812345678', language: 'Punjabi', address: 'Ludhiana, Punjab', type: 'Warm', product: 'Swaraj 744 FE', brand: 'Swaraj', searchSince: '1 week ago', timeline: 'Within 1 month' },
  { id: 3, buyer: 'Gopal Das', mobile: '9765432100', language: 'Hindi', address: 'Jaipur, Rajasthan', type: 'Cold', product: 'TAFE 45 DI', brand: 'TAFE', searchSince: '2 weeks ago', timeline: '2-3 months' },
]

export default function NewLeads() {
  const [subTab, setSubTab] = useState('today') // 'today' | 'unattended'
  const [viewLead, setViewLead] = useState(null)
  const [updateModal, setUpdateModal] = useState(false)
     useEffect(() => {
                window.scrollTo(0, 0);
              }, []);
  return (
    <main className="profile-page">
      <ProfileSidebar />

      {viewLead && (
        <LeadViewModal
          lead={viewLead}
          onClose={() => setViewLead(null)}
          onUpdate={() => { setViewLead(null); setUpdateModal(true) }}
        />
      )}
      {updateModal && <UpdateStatusModal onClose={() => setUpdateModal(false)} />}

      <section className="profile-content space-y-4">
        <div className="flex gap-2">
          {['today', 'unattended'].map(st => (
            <button
              key={st}
              onClick={() => setSubTab(st)}
              className={`px-4 py-1.5 text-sm rounded-lg border font-500 ${subTab === st ? 'border-[#13693A] text-[#13693A] bg-[#e8f5ee]' : 'border-[#E4E7EC] text-[#64748B]'}`}
            >
              {st === 'today' ? "Today's Leads" : 'Unattended'}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {newLeads.map(lead => (
            <div key={lead.id} className="bg-white rounded-2xl border border-[#E4E7EC] shadow-sm p-4 flex flex-wrap items-center gap-4 hover:shadow-md transition-all">
              <div className="flex-1 min-w-48">
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-heading font-600 text-[#1E293B] text-sm">{lead.buyer}</p>
                  <span className={`px-2 py-0.5 text-xs font-600 rounded-full ${typeColors[lead.type]}`}>{lead.type}</span>
                </div>
                <p className="text-xs text-[#64748B] flex items-center gap-1"><Phone size={11} /> {lead.mobile}</p>
                <p className="text-xs text-[#64748B] flex items-center gap-1 mt-0.5"><MapPin size={11} /> {lead.address}</p>
              </div>
              <div className="text-xs text-[#64748B] hidden sm:block">
                <p><span className="text-[#1E293B] font-500">Product:</span> {lead.product}</p>
                <p className="mt-0.5"><span className="text-[#1E293B] font-500">Language:</span> {lead.language}</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 text-xs text-[#64748B]">
                  <Clock size={12} /> {lead.searchSince}
                </div>
                <button
                  onClick={() => setViewLead(lead)}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-linear-to-l from-[#13693A] to-[#8cbf44]  text-white text-xs rounded-lg hover:bg-[#0e4f2c] font-500"
                >
                  <Eye size={13} /> View
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}