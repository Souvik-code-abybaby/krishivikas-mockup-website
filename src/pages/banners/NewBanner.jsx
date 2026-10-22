import { useState } from 'react'
import { Upload } from 'lucide-react'
import ProfileSidebar from '../../components/profile/ProfileSidebar'
import { useEffect } from 'react'
const states = ['All India', 'Maharashtra', 'Punjab', 'Haryana', 'Uttar Pradesh']
const languages = ['Hindi', 'Punjabi', 'Marathi', 'Gujarati', 'Tamil']
const categories = ['Seasonal Offer', 'New Arrival', 'Festival Sale', 'Discount', 'Brand Promotion']

export default function NewBanner() {
     useEffect(() => {
                        window.scrollTo(0, 0);
                      }, []);
  const [file, setFile] = useState(null)

  return (
    <main className="profile-page">
      <ProfileSidebar />

      <section className="profile-content">
        <div className="bg-white rounded-2xl border border-[#E4E7EC] shadow-sm p-6 space-y-5 max-w-xl">
          <h3 className="font-heading font-600 text-[#1E293B]">Create New Banner</h3>

          <label className="flex flex-col items-center justify-center gap-3 h-44 border-2 border-dashed border-[#E4E7EC] rounded-2xl cursor-pointer hover:border-[#13693A] hover:bg-[#F6F9F7] transition-all">
            {file ? (
              <img src={URL.createObjectURL(file)} alt="Preview" className="w-full h-full object-cover rounded-2xl" />
            ) : (
              <>
                <div className="w-12 h-12 rounded-xl bg-[#F6F9F7] flex items-center justify-center">
                  <Upload size={22} className="text-[#13693A]" />
                </div>
                <p className="text-sm text-[#64748B]">Click to upload banner image</p>
                <p className="text-xs text-[#64748B]/60">PNG, JPG up to 5MB (1200×400 recommended)</p>
              </>
            )}
            <input type="file" accept="image/*" className="hidden" onChange={e => setFile(e.target.files?.[0] || null)} />
          </label>

          <div>
            <label className="block text-xs font-500 text-[#64748B] mb-1.5">Campaign Name</label>
            <input type="text" placeholder="e.g., Kharif Season 2025 Offer" className="w-full px-3 py-2.5 text-sm border border-[#E4E7EC] rounded-xl focus:outline-none focus:border-[#13693A] focus:ring-2 focus:ring-[#13693A]/10" />
          </div>

          <div>
            <label className="block text-xs font-500 text-[#64748B] mb-1.5">Promotional Category</label>
            <select className="w-full px-3 py-2.5 text-sm border border-[#E4E7EC] rounded-xl bg-white focus:outline-none focus:border-[#13693A]">
              <option value="">Select Category</option>
              {categories.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-500 text-[#64748B] mb-1.5">State</label>
              <select className="w-full px-3 py-2.5 text-sm border border-[#E4E7EC] rounded-xl bg-white focus:outline-none focus:border-[#13693A]">
                {states.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-500 text-[#64748B] mb-1.5">Language</label>
              <select className="w-full px-3 py-2.5 text-sm border border-[#E4E7EC] rounded-xl bg-white focus:outline-none focus:border-[#13693A]">
                {languages.map(l => <option key={l}>{l}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-500 text-[#64748B] mb-1.5">District</label>
              <input type="text" placeholder="Enter district" className="w-full px-3 py-2.5 text-sm border border-[#E4E7EC] rounded-xl focus:outline-none focus:border-[#13693A]" />
            </div>
          </div>

          <button className="w-full py-2.5 bg-linear-to-l from-[#13693A] via-[#8cbf44] to-[#13693A] text-white rounded-xl text-sm font-500 hover:bg-[#0e4f2c]">
            Submit Banner
          </button>
        </div>
      </section>
    </main>
  )
}