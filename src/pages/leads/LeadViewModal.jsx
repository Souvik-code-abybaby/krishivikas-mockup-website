export default function LeadViewModal({ lead, onClose, onUpdate }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg">
        <div className="px-6 py-4 border-b border-[#E4E7EC] flex items-center justify-between">
          <h3 className="font-heading font-600 text-[#1E293B]">Lead Details</h3>
          <button onClick={onClose} className="text-[#64748B] hover:text-[#1E293B] text-xl leading-none">×</button>
        </div>
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            {[
              ['Buyer Name', lead.buyer],
              ['Mobile', lead.mobile],
              ['Language', lead.language],
              ['Address', lead.address],
              ['Brand Preference', lead.brand],
              ['Product Interested', lead.product],
              ['Searching Since', lead.searchSince],
              ['Purchase Timeline', lead.timeline],
            ].map(([k, v]) => (
              <div key={k} className="bg-[#F6F9F7] rounded-xl p-3">
                <p className="text-xs text-[#64748B] mb-0.5">{k}</p>
                <p className="text-sm font-500 text-[#1E293B]">{v}</p>
              </div>
            ))}
          </div>
          <button
            onClick={onUpdate}
            className="w-full py-2.5 bg-[#13693A] text-white rounded-xl text-sm font-500 hover:bg-[#0e4f2c]"
          >
            Update Status
          </button>
        </div>
      </div>
    </div>
  )
}