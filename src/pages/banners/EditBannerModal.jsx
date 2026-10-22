export default function EditBannerModal({ banner, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
        <div className="px-6 py-4 border-b border-[#E4E7EC] flex items-center justify-between">
          <h3 className="font-heading font-600 text-[#1E293B]">Edit Banner</h3>
          <button onClick={onClose} className="text-[#64748B] hover:text-[#1E293B] text-xl leading-none">×</button>
        </div>
        <div className="p-6 space-y-4">
          <img src={banner.img} alt={banner.name} className="w-full h-40 object-cover rounded-xl" />
          <div>
            <label className="block text-xs font-500 text-[#64748B] mb-1">Campaign Name</label>
            <input defaultValue={banner.name} type="text" className="w-full px-3 py-2 text-sm border border-[#E4E7EC] rounded-xl focus:outline-none focus:border-[#13693A]" />
          </div>
          <div className="flex gap-3">
            <button onClick={onClose} className="flex-1 py-2.5 border border-[#E4E7EC] text-[#64748B] rounded-xl text-sm">Cancel</button>
            <button onClick={onClose} className="flex-1 py-2.5 bg-linear-to-r from-[#13693A] via-[#8cbf44] to-[#13693A]  text-white rounded-xl text-sm font-500">Save Changes</button>
          </div>
        </div>
      </div>
    </div>
  )
}