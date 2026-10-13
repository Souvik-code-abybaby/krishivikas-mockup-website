import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import ProfileSidebar from '../../components/profile/ProfileSidebar'
import { useEffect } from 'react'
const followUpLeads = [
  {
    id: 1, buyer: 'Vikas Sharma', product: 'John Deere 5050 D', timeline: [
      { date: '02 Aug 2025', status: 'Called', remark: 'Buyer showed interest, needs financing info.' },
      { date: '28 Jul 2025', status: 'WhatsApp', remark: 'Sent product brochure and pricing details.' },
      { date: '22 Jul 2025', status: 'First Contact', remark: 'Lead received from platform.' },
    ]
  },
  {
    id: 2, buyer: 'Anita Patel', product: 'Sonalika DI 750 III', timeline: [
      { date: '03 Aug 2025', status: 'Site Visit', remark: 'Buyer visited our dealership, interested in demo.' },
      { date: '01 Aug 2025', status: 'Called', remark: 'Discussed trade-in option.' },
    ]
  },
]

export default function FollowUp() {
  const [expanded, setExpanded] = useState([])

  const toggleExpanded = (id) =>
    setExpanded(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])
     useEffect(() => {
                window.scrollTo(0, 0);
              }, []);
  return (
    <main className="profile-page">
      <ProfileSidebar />

      <section className="profile-content space-y-3">
        {followUpLeads.map(lead => (
          <div key={lead.id} className="bg-white rounded-2xl border border-[#E4E7EC] shadow-sm overflow-hidden">
            <button
              onClick={() => toggleExpanded(lead.id)}
              className="w-full flex items-center justify-between px-5 py-4 hover:bg-[#F6F9F7] transition-colors"
            >
              <div className="text-left">
                <p className="font-heading font-600 text-[#1E293B] text-sm">{lead.buyer}</p>
                <p className="text-xs text-[#64748B]">{lead.product}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-[#64748B]">{lead.timeline.length} interactions</span>
                {expanded.includes(lead.id) ? <ChevronUp size={16} className="text-[#64748B]" /> : <ChevronDown size={16} className="text-[#64748B]" />}
              </div>
            </button>
            {expanded.includes(lead.id) && (
              <div className="px-5 pb-4">
                <div className="relative pl-4 border-l-2 border-[#E4E7EC] space-y-4">
                  {lead.timeline.map((t, i) => (
                    <div key={i} className="relative">
                      <div className="absolute -left-[21px] top-1 w-3 h-3 rounded-full border-2 border-[#13693A] bg-white" />
                      <div className="bg-[#F6F9F7] rounded-xl p-3">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-600 text-[#13693A]">{t.status}</span>
                          <span className="text-xs text-[#64748B]">{t.date}</span>
                        </div>
                        <p className="text-sm text-[#1E293B]">{t.remark}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </section>
    </main>
  )
}