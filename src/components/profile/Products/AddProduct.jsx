import { useState } from 'react'
import { Tractor, Wrench, Droplets, Wheat, Upload, FileSpreadsheet, FileText, PlayCircle, CheckCircle } from 'lucide-react'

const categories = [
  { id: 'tractor', label: 'Tractors', icon: <Tractor size={28} /> },
  { id: 'implement', label: 'Implements', icon: <Wrench size={28} /> },
  { id: 'irrigation', label: 'Irrigation', icon: <Droplets size={28} /> },
  { id: 'seeds', label: 'Seeds & Crops', icon: <Wheat size={28} /> },
]

const states = ['Maharashtra', 'Punjab', 'Haryana', 'Uttar Pradesh', 'Madhya Pradesh', 'Rajasthan', 'Gujarat']

export default function AddProduct() {
  const [tab, setTab] = useState('single') // 'single' | 'multiple'
  const [selectedCat, setSelectedCat] = useState('')
  const [form, setForm] = useState({ name: '', brand: '', model: '', price: '', description: '', year: '', state: '', district: '', area: '', tehsil: '' })
  const [frontImg, setFrontImg] = useState(null)
  const [backImg, setBackImg] = useState(null)
  const [multiCat, setMultiCat] = useState('')
  const [excelFile, setExcelFile] = useState(null)
  const [zipFile, setZipFile] = useState(null)
  const [verificationStatus, setVerificationStatus] = useState('idle') // 'idle' | 'pending' | 'verified'

  const handleMultiSubmit = () => {
    setVerificationStatus('pending')
    setTimeout(() => setVerificationStatus('verified'), 3000)
  }

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="bg-white rounded-2xl border border-[#E4E7EC] shadow-sm p-1 flex gap-1 w-fit">
        {['single', 'multiple'].map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-6 py-2.5 rounded-xl text-sm font-500 transition-all ${tab === t ? 'bg-[#13693A] text-white shadow-sm' : 'text-[#64748B] hover:text-[#13693A]'}`}
          >
            {t === 'single' ? 'Single Product' : 'Multiple Products'}
          </button>
        ))}
      </div>

      {tab === 'single' ? (
        <div className="space-y-5">
          {/* Category Selection */}
          {!selectedCat ? (
            <div className="bg-white rounded-2xl border border-[#E4E7EC] shadow-sm p-6">
              <h3 className="font-heading font-600 text-[#1E293B] mb-4">Select Product Category</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {categories.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCat(cat.id)}
                    className="flex flex-col items-center gap-3 p-5 rounded-2xl border-2 border-[#E4E7EC] hover:border-[#13693A] hover:bg-[#F6F9F7] text-[#64748B] hover:text-[#13693A] transition-all group"
                  >
                    <div className="w-14 h-14 rounded-xl bg-[#F6F9F7] group-hover:bg-[#e8f5ee] flex items-center justify-center">
                      {cat.icon}
                    </div>
                    <span className="text-sm font-500">{cat.label}</span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-[#E4E7EC] shadow-sm p-6">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-heading font-600 text-[#1E293B]">Product Details — {categories.find(c => c.id === selectedCat)?.label}</h3>
                <button onClick={() => setSelectedCat('')} className="text-xs text-[#64748B] hover:text-[#13693A] underline">← Change Category</button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  ['name', 'Product Name', 'text'],
                  ['brand', 'Brand', 'text'],
                  ['model', 'Model Number', 'text'],
                  ['price', 'Price (₹)', 'number'],
                  ['year', 'Manufacturing Year', 'number'],
                  ['tehsil', 'Tehsil', 'text'],
                ].map(([key, label, type]) => (
                  <div key={key}>
                    <label className="block text-xs font-500 text-[#64748B] mb-1.5">{label}</label>
                    <input
                      type={type}
                      value={form[key]}
                      onChange={e => setForm({ ...form, [key]: e.target.value })}
                      placeholder={`Enter ${label}`}
                      className="w-full px-3 py-2.5 text-sm border border-[#E4E7EC] rounded-xl text-[#1E293B] focus:outline-none focus:border-[#13693A] focus:ring-2 focus:ring-[#13693A]/10"
                    />
                  </div>
                ))}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-500 text-[#64748B] mb-1.5">Description</label>
                  <textarea
                    value={form.description}
                    onChange={e => setForm({ ...form, description: e.target.value })}
                    placeholder="Enter product description..."
                    rows={3}
                    className="w-full px-3 py-2.5 text-sm border border-[#E4E7EC] rounded-xl text-[#1E293B] focus:outline-none focus:border-[#13693A] focus:ring-2 focus:ring-[#13693A]/10 resize-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-500 text-[#64748B] mb-1.5">State</label>
                  <select
                    value={form.state}
                    onChange={e => setForm({ ...form, state: e.target.value })}
                    className="w-full px-3 py-2.5 text-sm border border-[#E4E7EC] rounded-xl text-[#1E293B] focus:outline-none focus:border-[#13693A] bg-white"
                  >
                    <option value="">Select State</option>
                    {states.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-500 text-[#64748B] mb-1.5">District</label>
                  <input
                    type="text"
                    value={form.district}
                    onChange={e => setForm({ ...form, district: e.target.value })}
                    placeholder="Enter district"
                    className="w-full px-3 py-2.5 text-sm border border-[#E4E7EC] rounded-xl text-[#1E293B] focus:outline-none focus:border-[#13693A] focus:ring-2 focus:ring-[#13693A]/10"
                  />
                </div>
              </div>

              {/* Image Upload */}
              <div className="grid grid-cols-2 gap-4 mt-4">
                {[
                  { label: 'Front Image', file: frontImg, setter: setFrontImg },
                  { label: 'Back Image', file: backImg, setter: setBackImg },
                ].map(({ label, file, setter }) => (
                  <div key={label}>
                    <label className="block text-xs font-500 text-[#64748B] mb-1.5">{label}</label>
                    <label className="flex flex-col items-center justify-center gap-2 h-28 border-2 border-dashed border-[#E4E7EC] rounded-xl cursor-pointer hover:border-[#13693A] hover:bg-[#F6F9F7] transition-all">
                      <Upload size={20} className="text-[#64748B]" />
                      <span className="text-xs text-[#64748B]">{file ? file.name : 'Click to upload'}</span>
                      <input type="file" accept="image/*" className="hidden" onChange={e => setter(e.target.files?.[0] || null)} />
                    </label>
                  </div>
                ))}
              </div>

              <div className="flex gap-3 mt-5">
                <button className="flex-1 py-2.5 bg-[#13693A] text-white rounded-xl text-sm font-500 hover:bg-[#0e4f2c]">
                  Submit Product
                </button>
                <button className="flex-1 py-2.5 border border-[#13693A] text-[#13693A] rounded-xl text-sm font-500 hover:bg-[#F6F9F7]">
                  Submit & Add Another
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-[#E4E7EC] shadow-sm p-6 space-y-4">
            <h3 className="font-heading font-600 text-[#1E293B]">Bulk Product Upload</h3>

            {/* Category */}
            <div>
              <label className="block text-xs font-500 text-[#64748B] mb-1.5">Product Category</label>
              <select
                value={multiCat}
                onChange={e => setMultiCat(e.target.value)}
                className="w-full sm:w-64 px-3 py-2.5 text-sm border border-[#E4E7EC] rounded-xl text-[#1E293B] focus:outline-none focus:border-[#13693A] bg-white"
              >
                <option value="">Select Category</option>
                {categories.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
              </select>
            </div>

            {/* Download templates */}
            <div className="flex flex-wrap gap-3">
              <button className="flex items-center gap-2 px-4 py-2 text-sm border border-[#E4E7EC] rounded-xl hover:border-[#DC2626] hover:text-[#DC2626] text-[#64748B] font-500">
                <FileText size={16} /> Download Sample PDF
              </button>
              <button className="flex items-center gap-2 px-4 py-2 text-sm border border-[#E4E7EC] rounded-xl hover:border-[#16A34A] hover:text-[#16A34A] text-[#64748B] font-500">
                <FileSpreadsheet size={16} /> Download Sample Excel
              </button>
            </div>

            {/* YouTube Tutorial */}
            <div className="flex items-center gap-3 p-3 rounded-xl bg-red-50 border border-red-100">
              <div className="w-10 h-10 rounded-lg bg-red-500 flex items-center justify-center flex-shrink-0">
                <PlayCircle size={18} className="text-white" />
              </div>
              <div>
                <p className="text-sm font-500 text-[#1E293B]">How to upload multiple products?</p>
                <p className="text-xs text-[#64748B]">Watch our step-by-step tutorial on YouTube</p>
              </div>
              <button className="ml-auto text-xs text-red-600 font-600 hover:underline whitespace-nowrap">Watch Now</button>
            </div>

            {/* File uploads */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: 'Upload Excel File (.xlsx)', file: excelFile, setter: setExcelFile, accept: '.xlsx,.xls', icon: <FileSpreadsheet size={22} className="text-green-600" /> },
                { label: 'Upload Images ZIP', file: zipFile, setter: setZipFile, accept: '.zip', icon: <Upload size={22} className="text-[#13693A]" /> },
              ].map(({ label, file, setter, accept, icon }) => (
                <div key={label}>
                  <label className="block text-xs font-500 text-[#64748B] mb-1.5">{label}</label>
                  <label className="flex flex-col items-center justify-center gap-2 h-32 border-2 border-dashed border-[#E4E7EC] rounded-xl cursor-pointer hover:border-[#13693A] hover:bg-[#F6F9F7] transition-all">
                    {icon}
                    <span className="text-xs text-[#64748B]">{file ? file.name : 'Click to upload'}</span>
                    <input type="file" accept={accept} className="hidden" onChange={e => setter(e.target.files?.[0] || null)} />
                  </label>
                </div>
              ))}
            </div>

            <button
              onClick={handleMultiSubmit}
              disabled={verificationStatus === 'pending'}
              className="w-full py-2.5 bg-[#13693A] text-white rounded-xl text-sm font-500 hover:bg-[#0e4f2c] disabled:opacity-60 disabled:cursor-not-allowed"
            >
              Submit for Verification
            </button>
          </div>

          {/* Verification Status */}
          {verificationStatus !== 'idle' && (
            <div className={`rounded-2xl border p-4 flex items-center gap-3 ${
              verificationStatus === 'pending' ? 'bg-amber-50 border-amber-200' : 'bg-green-50 border-green-200'
            }`}>
              {verificationStatus === 'pending' ? (
                <>
                  <div className="w-8 h-8 rounded-full border-2 border-amber-400 border-t-transparent animate-spin" />
                  <div>
                    <p className="font-500 text-sm text-amber-800">Pending Verification</p>
                    <p className="text-xs text-amber-600">Your products are under review. You'll be notified once verified.</p>
                  </div>
                </>
              ) : (
                <>
                  <CheckCircle size={28} className="text-green-600 flex-shrink-0" />
                  <div>
                    <p className="font-500 text-sm text-green-800">Verification Complete!</p>
                    <p className="text-xs text-green-600">Your products have been verified and are now live.</p>
                  </div>
                  <button className="ml-auto px-4 py-1.5 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 font-500">
                    Add More
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}