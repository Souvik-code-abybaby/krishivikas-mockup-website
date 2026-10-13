import { useState } from 'react'
import { Edit2, Users } from 'lucide-react'
import ProfileSidebar from '../../components/profile/ProfileSidebar'
import EditBannerModal from './EditBannerModal'
import { useEffect } from 'react'
const bannerList = [
  { id: 1, name: 'Kharif Season 2025', reach: '10K+', img: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=200&h=100&fit=crop&auto=format' },
  { id: 2, name: 'Monsoon Irrigation Offer', reach: '1K+', img: 'https://images.unsplash.com/photo-1560493676-04071c5f467b?w=200&h=100&fit=crop&auto=format' },
  { id: 3, name: 'New Mahindra Arrivals', reach: '500+', img: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=200&h=100&fit=crop&auto=format' },
]

const reachColors = {
  '50+': 'bg-gray-100 text-gray-600',
  '100+': 'bg-blue-50 text-blue-600',
  '500+': 'bg-amber-50 text-amber-600',
  '1K+': 'bg-green-50 text-green-700',
  '10K+': 'bg-purple-50 text-purple-700',
}

export default function BannerList() {
     useEffect(() => {
                    window.scrollTo(0, 0);
                  }, []);
  const [editBanner, setEditBanner] = useState(null)

  return (
    <main className="profile-page">
      <ProfileSidebar />

      {editBanner && <EditBannerModal banner={editBanner} onClose={() => setEditBanner(null)} />}

      <section className="profile-content">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {bannerList.map(b => (
            <div key={b.id} className="bg-white rounded-2xl border border-[#E4E7EC] shadow-sm overflow-hidden hover:shadow-md transition-all">
              <div className="h-40 bg-[#F6F9F7]">
                <img src={b.img} alt={b.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-4 flex items-center justify-between">
                <div>
                  <p className="font-heading font-600 text-sm text-[#1E293B] mb-1">{b.name}</p>
                  <div className="flex items-center gap-1.5">
                    <Users size={12} className="text-[#64748B]" />
                    <span className={`text-xs font-600 px-2 py-0.5 rounded-full ${reachColors[b.reach] || 'bg-gray-100 text-gray-600'}`}>
                      {b.reach} Reach
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setEditBanner(b)}
                  className="flex items-center gap-1.5 px-3 py-1.5 border border-[#E4E7EC] rounded-lg text-xs text-[#64748B] hover:border-[#13693A] hover:text-[#13693A] font-500"
                >
                  <Edit2 size={12} /> Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}