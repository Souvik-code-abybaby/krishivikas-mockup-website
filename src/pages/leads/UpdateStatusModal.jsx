import { useState } from 'react'

export default function UpdateStatusModal({ onClose }) {
  const [followUp, setFollowUp] = useState(null) // 'yes' | 'no' | null
  const [outcome, setOutcome] = useState('')

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
        <div className="px-6 py-4 border-b border-[#E4E7EC] flex items-center justify-between">
          <h3 className="font-heading font-600 text-[#1E293B]">Update Lead Status</h3>
          <button onClick={onClose} className="text-[#64748B] hover:text-[#1E293B] text-xl leading-none">×</button>
        </div>
        <div className="p-6 space-y-4">
          <p className="text-sm font-500 text-[#1E293B]">Follow Up Required?</p>
          <div className="flex gap-3">
            {['yes', 'no'].map(opt => (
              <button
                key={opt}
                onClick={() => setFollowUp(opt)}
                className={`flex-1 py-2.5 rounded-xl text-sm font-500 border ${followUp === opt ? 'bg-[#13693A] text-white border-[#13693A]' : 'border-[#E4E7EC] text-[#64748B] hover:border-[#13693A]'}`}
              >
                {opt === 'yes' ? 'Yes' : 'No'}
              </button>
            ))}
          </div>

          {followUp === 'yes' && (
            <div className="space-y-3">
              {['Lead Type', 'Delivery Time', 'Buyer Requirement Days'].map(label => (
                <div key={label}>
                  <label className="block text-xs font-500 text-[#64748B] mb-1">{label}</label>
                  <input type="text" placeholder={`Enter ${label}`} className="w-full px-3 py-2 text-sm border border-[#E4E7EC] rounded-xl focus:outline-none focus:border-[#13693A]" />
                </div>
              ))}
              <div>
                <label className="block text-xs font-500 text-[#64748B] mb-1">Remarks</label>
                <textarea rows={2} placeholder="Add remarks..." className="w-full px-3 py-2 text-sm border border-[#E4E7EC] rounded-xl focus:outline-none focus:border-[#13693A] resize-none" />
              </div>
            </div>
          )}

          {followUp === 'no' && (
            <div className="space-y-3">
              <p className="text-xs text-[#64748B]">Select outcome:</p>
              <div className="flex gap-3">
                {['Sold', 'Wrong Lead'].map(opt => (
                  <button
                    key={opt}
                    onClick={() => setOutcome(opt)}
                    className={`flex-1 py-2 rounded-xl text-sm font-500 border ${outcome === opt ? 'bg-[#13693A] text-white border-[#13693A]' : 'border-[#E4E7EC] text-[#64748B]'}`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
              {outcome === 'Sold' && (
                <label className="flex flex-col items-center justify-center gap-2 h-24 border-2 border-dashed border-[#E4E7EC] rounded-xl cursor-pointer hover:border-[#13693A] transition-all">
                  <span className="text-xs text-[#64748B]">Upload proof image</span>
                  <input type="file" accept="image/*" className="hidden" />
                </label>
              )}
              {outcome === 'Wrong Lead' && (
                <textarea rows={2} placeholder="Add remarks about wrong lead..." className="w-full px-3 py-2 text-sm border border-[#E4E7EC] rounded-xl focus:outline-none focus:border-[#13693A] resize-none" />
              )}
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <button onClick={onClose} className="flex-1 py-2.5 border border-[#E4E7EC] text-[#64748B] rounded-xl text-sm hover:border-[#13693A]">Cancel</button>
            <button className="flex-1 py-2.5 bg-[#13693A] text-white rounded-xl text-sm font-500 hover:bg-[#0e4f2c]">Save</button>
          </div>
        </div>
      </div>
    </div>
  )
}