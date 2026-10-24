// import { useState, useEffect, useRef } from "react";
// import {
//   X,
//   Camera,
//   Smartphone,
//   User,
//   Home,
//   MapPin,
//   LocateFixed,
//   Store,
//   Check,
//   ChevronDown,
// } from "lucide-react";
// // import "./EditProfileModal.css";

// const OCCUPATIONS = ["Farmer", "Dealer", "Trader", "Mechanic", "Other"];
// const CATEGORIES = [
//   "Tractor",
//   "Commercial Vehicle",
//   "Seeds",
//   "Pesticides",
//   "Fertilizers",
//   "Harvester",
//   "Implements",
//   "Tyres",
// ];
// const CROPS = ["Rice", "Wheat", "Maize", "Barley"];
// const LAND_TYPES = ["Irrigated", "Rain-fed", "Mixed"];

// const toggle = (list, value) =>
//   list.includes(value) ? list.filter((v) => v !== value) : [...list, value];

// function ChipGroup({ options, selected, onToggle }) {
//   return (
//     <div className="ep-chips" role="group">
//       {options.map((opt) => {
//         const on = selected.includes(opt);
//         return (
//           <button
//             type="button"
//             key={opt}
//             className={`ep-chip ${on ? "on" : ""}`}
//             aria-pressed={on}
//             onClick={() => onToggle(opt)}
//           >
//             {on && <Check size={16} strokeWidth={3} />}
//             {opt}
//           </button>
//         );
//       })}
//     </div>
//   );
// }

// export default function EditProfileModal({ profile, onClose, onSave }) {
//   const [form, setForm] = useState({
//     name: "",
//     address: "",
//     pincode: "",
//     occupation: "",
//     categories: [],
//     crops: [],
//     landSize: "",
//     landType: "",
//     ...profile,
//   });
//   const [errors, setErrors] = useState({});
//   const firstField = useRef(null);

//   const set = (key, value) => {
//     setForm((f) => ({ ...f, [key]: value }));
//     setErrors((e) => ({ ...e, [key]: undefined }));
//   };

//   // Escape to close, lock page scroll while open, focus first field
//   useEffect(() => {
//     const onKey = (e) => e.key === "Escape" && onClose();
//     document.addEventListener("keydown", onKey);
//     const prev = document.body.style.overflow;
//     document.body.style.overflow = "hidden";
//     firstField.current?.focus();
//     return () => {
//       document.removeEventListener("keydown", onKey);
//       document.body.style.overflow = prev;
//     };
//   }, [onClose]);

//   const validate = () => {
//     const e = {};
//     if (!form.name.trim()) e.name = "Enter your name";
//     if (!/^\d{6}$/.test(form.pincode)) e.pincode = "Enter a 6-digit pincode";
//     if (!form.occupation) e.occupation = "Select your occupation";
//     if (!form.categories.length) e.categories = "Select at least one category";
//     setErrors(e);
//     return !Object.keys(e).length;
//   };

//   const submit = (e) => {
//     e.preventDefault();
//     if (!validate()) return;
//     onSave(form);
//     onClose();
//   };

//   const useMyLocation = () => {
//     if (!navigator.geolocation) return;
//     // Hook up your reverse-geocoding call here to fill address + pincode
//     navigator.geolocation.getCurrentPosition(
//       () => {},
//       () => {},
//     );
//   };

//   const initials = form.name
//     .split(" ")
//     .filter(Boolean)
//     .slice(0, 2)
//     .map((w) => w[0].toUpperCase())
//     .join("");

//   return (
//     <div
//       className="ep-overlay"
//       onMouseDown={(e) => e.target === e.currentTarget && onClose()}
//     >
//       <form
//         className="ep-modal"
//         role="dialog"
//         aria-modal="true"
//         aria-labelledby="ep-title"
//         onSubmit={submit}
//         noValidate
//       >
//         <header className="ep-header">
//           <h2 id="ep-title">Edit Profile</h2>
//           <button
//             type="button"
//             className="ep-close"
//             onClick={onClose}
//             aria-label="Close"
//           >
//             <X size={20} />
//           </button>
//         </header>

//         <div className="ep-body">
//           {/* Identity card */}
//           <div className="ep-card ep-identity">
//             <div className="ep-avatar">
//               {profile?.photo ? <img src={profile.photo} alt="" /> : initials}
//               <button
//                 type="button"
//                 className="ep-camera"
//                 aria-label="Change photo"
//               >
//                 <Camera size={14} />
//               </button>
//             </div>
//             <div className="ep-identity-info">
//               <strong>{form.name || "Your name"}</strong>
//               <span className="ep-phone">
//                 <Smartphone size={15} /> {profile?.phone || "+91 —"}
//               </span>
//               <span className="ep-badge">Independent Seller</span>
//             </div>
//           </div>

//           {/* Seller details */}
//           <div className="ep-card">
//             <div className="ep-section-head">
//               <span className="ep-section-icon">
//                 <Store size={22} />
//               </span>
//               <div>
//                 <h3>Seller Profile Details</h3>
//                 <p>Independent Seller details</p>
//               </div>
//             </div>

//             <label className="ep-label" htmlFor="ep-name">
//               Your Name
//             </label>
//             <div className={`ep-input ${errors.name ? "err" : ""}`}>
//               <User size={18} />
//               <input
//                 id="ep-name"
//                 ref={firstField}
//                 value={form.name}
//                 onChange={(e) => set("name", e.target.value)}
//                 placeholder="Enter your name"
//               />
//             </div>
//             {errors.name && <p className="ep-error">{errors.name}</p>}

//             <label className="ep-label" htmlFor="ep-address">
//               Address
//             </label>
//             <div className="ep-input ep-textarea">
//               <Home size={18} />
//               <textarea
//                 id="ep-address"
//                 rows={3}
//                 value={form.address}
//                 onChange={(e) => set("address", e.target.value)}
//                 placeholder="House no., street, city, state"
//               />
//             </div>

//             <label className="ep-label" htmlFor="ep-pin">
//               Pincode <span className="ep-req">*</span>
//             </label>
//             <div className={`ep-input ${errors.pincode ? "err" : ""}`}>
//               <MapPin size={18} />
//               <input
//                 id="ep-pin"
//                 inputMode="numeric"
//                 maxLength={6}
//                 value={form.pincode}
//                 onChange={(e) =>
//                   set("pincode", e.target.value.replace(/\D/g, ""))
//                 }
//                 placeholder="6-digit pincode"
//               />
//               <button
//                 type="button"
//                 className="ep-locate"
//                 onClick={useMyLocation}
//                 aria-label="Use my current location"
//               >
//                 <LocateFixed size={22} />
//               </button>
//             </div>
//             {errors.pincode && <p className="ep-error">{errors.pincode}</p>}

//             <label className="ep-label" htmlFor="ep-occ">
//               Occupation <span className="ep-req">*</span>
//             </label>
//             <div className={`ep-input ep-select ${errors.occupation ? "err" : ""}`}>
//               <select
//                 id="ep-occ"
//                 value={form.occupation}
//                 onChange={(e) => set("occupation", e.target.value)}
//               >
//                 <option value="">Select occupation</option>
//                 {OCCUPATIONS.map((o) => (
//                   <option key={o}>{o}</option>
//                 ))}
//               </select>
//               <ChevronDown size={20} />
//             </div>
//             {errors.occupation && (
//               <p className="ep-error">{errors.occupation}</p>
//             )}

//             <p className="ep-label">
//               Category you want to sell <span className="ep-req">*</span>
//             </p>
//             <ChipGroup
//               options={CATEGORIES}
//               selected={form.categories}
//               onToggle={(v) => set("categories", toggle(form.categories, v))}
//             />
//             {errors.categories && (
//               <p className="ep-error">{errors.categories}</p>
//             )}

//             <p className="ep-label">Which crop do you grow?</p>
//             <ChipGroup
//               options={CROPS}
//               selected={form.crops}
//               onToggle={(v) => set("crops", toggle(form.crops, v))}
//             />

//             <div className="ep-row">
//               <div>
//                 <label className="ep-label" htmlFor="ep-land">
//                   Enter land size here
//                 </label>
//                 <div className="ep-input">
//                   <input
//                     id="ep-land"
//                     inputMode="decimal"
//                     value={form.landSize}
//                     onChange={(e) =>
//                       set("landSize", e.target.value.replace(/[^\d.]/g, ""))
//                     }
//                     placeholder="Size here"
//                   />
//                 </div>
//               </div>
//               <div>
//                 <label className="ep-label" htmlFor="ep-landtype">
//                   Land Type
//                 </label>
//                 <div className="ep-input ep-select">
//                   <select
//                     id="ep-landtype"
//                     value={form.landType}
//                     onChange={(e) => set("landType", e.target.value)}
//                   >
//                     <option value="">Select</option>
//                     {LAND_TYPES.map((t) => (
//                       <option key={t}>{t}</option>
//                     ))}
//                   </select>
//                   <ChevronDown size={20} />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         <footer className="ep-footer">
//           <button type="submit" className="ep-save">
//             Save Changes
//           </button>
//         </footer>
//       </form>
//     </div>
//   );
// }
import { useState, useEffect, useRef, useCallback } from "react";
import {
  X,
  Camera,
  Smartphone,
  User,
  Home,
  MapPin,
  LocateFixed,
  Store,
  Check,
  ChevronDown,
  Image as ImageIcon,
  Trash2,
} from "lucide-react";
// import "./EditProfileModal.css";

const OCCUPATIONS = ["Farmer", "Dealer", "Trader", "Mechanic", "Other"];
const CATEGORIES = [
  "Tractor",
  "Commercial Vehicle",
  "Seeds",
  "Pesticides",
  "Fertilizers",
  "Harvester",
  "Implements",
  "Tyres",
];
const CROPS = ["Rice", "Wheat", "Maize", "Barley"];
const LAND_TYPES = ["Irrigated", "Rain-fed", "Mixed"];

const toggle = (list, value) =>
  list.includes(value) ? list.filter((v) => v !== value) : [...list, value];

function ChipGroup({ options, selected, onToggle }) {
  return (
    <div className="ep-chips" role="group">
      {options.map((opt) => {
        const on = selected.includes(opt);
        return (
          <button
            type="button"
            key={opt}
            className={`ep-chip ${on ? "on" : ""}`}
            aria-pressed={on}
            onClick={() => onToggle(opt)}
          >
            {on && <Check size={16} strokeWidth={3} />}
            {opt}
          </button>
        );
      })}
    </div>
  );
}

export default function EditProfileModal({ profile, onClose, onSave }) {
  const [form, setForm] = useState({
    name: "",
    address: "",
    pincode: "",
    occupation: "",
    categories: [],
    crops: [],
    landSize: "",
    landType: "",
    ...profile,
  });
  const [errors, setErrors] = useState({});
  const firstField = useRef(null);

  // ---- Profile photo: camera / gallery ----
  const [photo, setPhoto] = useState(profile?.photo || "");
  const [menuOpen, setMenuOpen] = useState(false);
  const [cameraOpen, setCameraOpen] = useState(false);
  const [photoError, setPhotoError] = useState("");
  const galleryRef = useRef(null);
  const cameraInputRef = useRef(null);
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const menuRef = useRef(null);

  const stopStream = useCallback(() => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
  }, []);

  const closeCamera = useCallback(() => {
    stopStream();
    setCameraOpen(false);
  }, [stopStream]);

  // Stop camera if the modal is closed while it is on
  useEffect(() => stopStream, [stopStream]);

  // Attach the stream to the <video> once it is rendered
  useEffect(() => {
    if (cameraOpen && videoRef.current && streamRef.current) {
      videoRef.current.srcObject = streamRef.current;
    }
  }, [cameraOpen]);

  // Close the photo menu on outside click
  useEffect(() => {
    if (!menuOpen) return;
    const onDown = (e) => {
      if (!menuRef.current?.contains(e.target)) setMenuOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [menuOpen]);

  const applyFile = (file) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setPhotoError("Choose an image file");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setPhotoError("Image must be under 5 MB");
      return;
    }
    setPhotoError("");
    const reader = new FileReader();
    reader.onload = () => {
      setPhoto(reader.result);
      setForm((f) => ({ ...f, photo: reader.result, photoFile: file }));
    };
    reader.readAsDataURL(file);
  };

  const onFileChange = (e) => {
    applyFile(e.target.files?.[0]);
    e.target.value = ""; // allow picking the same file again
  };

  const openGallery = () => {
    setMenuOpen(false);
    galleryRef.current?.click();
  };

  const openCamera = async () => {
    setMenuOpen(false);
    setPhotoError("");
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    // Phones/tablets: the native camera app via the capture attribute
    if (isTouch || !navigator.mediaDevices?.getUserMedia) {
      cameraInputRef.current?.click();
      return;
    }
    // Desktop: live camera preview
    try {
      streamRef.current = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
        audio: false,
      });
      setCameraOpen(true);
    } catch {
      setPhotoError("Camera is blocked or unavailable. Allow access or choose from gallery.");
    }
  };

  const snap = () => {
    const video = videoRef.current;
    if (!video?.videoWidth) return;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d").drawImage(video, 0, 0);
    canvas.toBlob(
      (blob) => {
        if (blob) {
          applyFile(new File([blob], "profile.jpg", { type: "image/jpeg" }));
        }
        closeCamera();
      },
      "image/jpeg",
      0.9,
    );
  };

  const removePhoto = () => {
    setMenuOpen(false);
    setPhoto("");
    setForm((f) => ({ ...f, photo: "", photoFile: null }));
  };

  const set = (key, value) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  // Escape to close, lock page scroll while open, focus first field
  useEffect(() => {
    const onKey = (e) => {
      if (e.key !== "Escape") return;
      if (cameraOpen) closeCamera();
      else if (menuOpen) setMenuOpen(false);
      else onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    firstField.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose, cameraOpen, menuOpen, closeCamera]);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Enter your name";
    if (!/^\d{6}$/.test(form.pincode)) e.pincode = "Enter a 6-digit pincode";
    if (!form.occupation) e.occupation = "Select your occupation";
    if (!form.categories.length) e.categories = "Select at least one category";
    setErrors(e);
    return !Object.keys(e).length;
  };

  const submit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSave(form);
    onClose();
  };

  const useMyLocation = () => {
    if (!navigator.geolocation) return;
    // Hook up your reverse-geocoding call here to fill address + pincode
    navigator.geolocation.getCurrentPosition(
      () => {},
      () => {},
    );
  };

  const initials = form.name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");

  return (
    <div
      className="ep-overlay"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <form
        className="ep-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="ep-title"
        onSubmit={submit}
        noValidate
      >
        <header className="ep-header">
          <h2 id="ep-title">Edit Profile</h2>
          <button
            type="button"
            className="ep-close"
            onClick={onClose}
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </header>

        <div className="ep-body">
          {/* Identity card */}
          <div className="ep-card ep-identity">
            <div className="ep-avatar-wrap" ref={menuRef}>
              <div className="ep-avatar">
                {photo ? <img src={photo} alt="Profile" /> : initials}
              </div>
              <button
                type="button"
                className="ep-camera"
                aria-label="Change photo"
                aria-haspopup="menu"
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen((o) => !o)}
              >
                <Camera size={14} />
              </button>

              {menuOpen && (
                <div className="ep-photo-menu" role="menu">
                  {/* <button type="button" role="menuitem" onClick={openCamera}>
                    <Camera size={18} /> Open camera
                  </button> */}
                  <button type="button" role="menuitem" onClick={openGallery}>
                    <ImageIcon size={18} /> Choose from gallery
                  </button>
                  {photo && (
                    <button
                      type="button"
                      role="menuitem"
                      className="danger"
                      onClick={removePhoto}
                    >
                      <Trash2 size={18} /> Remove photo
                    </button>
                  )}
                </div>
              )}

              <input
                ref={galleryRef}
                type="file"
                accept="image/*"
                hidden
                onChange={onFileChange}
              />
              <input
                ref={cameraInputRef}
                type="file"
                accept="image/*"
                capture="user"
                hidden
                onChange={onFileChange}
              />
            </div>
            <div className="ep-identity-info">
              <strong>{form.name || "Your name"}</strong>
              <span className="ep-phone">
                <Smartphone size={15} /> {profile?.phone || "+91 —"}
              </span>
              <span className="ep-badge">Independent Seller</span>
              {photoError && <span className="ep-error">{photoError}</span>}
            </div>
          </div>

          {/* Seller details */}
          <div className="ep-card">
            <div className="ep-section-head">
              <span className="ep-section-icon">
                <Store size={22} />
              </span>
              <div>
                <h3>Seller Profile Details</h3>
                <p>Independent Seller details</p>
              </div>
            </div>

            <label className="ep-label" htmlFor="ep-name">
              Your Name
            </label>
            <div className={`ep-input ${errors.name ? "err" : ""}`}>
              <User size={18} />
              <input
                id="ep-name"
                ref={firstField}
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
                placeholder="Enter your name"
              />
            </div>
            {errors.name && <p className="ep-error">{errors.name}</p>}

            <label className="ep-label" htmlFor="ep-address">
              Address
            </label>
            <div className="ep-input ep-textarea">
              <Home size={18} />
              <textarea
                id="ep-address"
                rows={3}
                value={form.address}
                onChange={(e) => set("address", e.target.value)}
                placeholder="House no., street, city, state"
              />
            </div>

            <label className="ep-label" htmlFor="ep-pin">
              Pincode <span className="ep-req">*</span>
            </label>
            <div className={`ep-input ${errors.pincode ? "err" : ""}`}>
              <MapPin size={18} />
              <input
                id="ep-pin"
                inputMode="numeric"
                maxLength={6}
                value={form.pincode}
                onChange={(e) =>
                  set("pincode", e.target.value.replace(/\D/g, ""))
                }
                placeholder="6-digit pincode"
              />
              <button
                type="button"
                className="ep-locate"
                onClick={useMyLocation}
                aria-label="Use my current location"
              >
                <LocateFixed size={22} />
              </button>
            </div>
            {errors.pincode && <p className="ep-error">{errors.pincode}</p>}

            <label className="ep-label" htmlFor="ep-occ">
              Occupation <span className="ep-req">*</span>
            </label>
            <div className={`ep-input ep-select ${errors.occupation ? "err" : ""}`}>
              <select
                id="ep-occ"
                value={form.occupation}
                onChange={(e) => set("occupation", e.target.value)}
              >
                <option value="">Select occupation</option>
                {OCCUPATIONS.map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
              <ChevronDown size={20} />
            </div>
            {errors.occupation && (
              <p className="ep-error">{errors.occupation}</p>
            )}

            <p className="ep-label">
              Category you want to sell <span className="ep-req">*</span>
            </p>
            <ChipGroup
              options={CATEGORIES}
              selected={form.categories}
              onToggle={(v) => set("categories", toggle(form.categories, v))}
            />
            {errors.categories && (
              <p className="ep-error">{errors.categories}</p>
            )}

            <p className="ep-label">Which crop do you grow?</p>
            <ChipGroup
              options={CROPS}
              selected={form.crops}
              onToggle={(v) => set("crops", toggle(form.crops, v))}
            />

            <div className="ep-row">
              <div>
                <label className="ep-label" htmlFor="ep-land">
                  Enter land size here
                </label>
                <div className="ep-input">
                  <input
                    id="ep-land"
                    inputMode="decimal"
                    value={form.landSize}
                    onChange={(e) =>
                      set("landSize", e.target.value.replace(/[^\d.]/g, ""))
                    }
                    placeholder="Size here"
                  />
                </div>
              </div>
              <div>
                <label className="ep-label" htmlFor="ep-landtype">
                  Land Type
                </label>
                <div className="ep-input ep-select">
                  <select
                    id="ep-landtype"
                    value={form.landType}
                    onChange={(e) => set("landType", e.target.value)}
                  >
                    <option value="">Select</option>
                    {LAND_TYPES.map((t) => (
                      <option key={t}>{t}</option>
                    ))}
                  </select>
                  <ChevronDown size={20} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <footer className="ep-footer">
          <button type="submit" className="ep-save">
            Save Changes
          </button>
        </footer>
      </form>

      {/* {cameraOpen && (
        <div className="ep-camera-view" role="dialog" aria-label="Take a photo">
          <video ref={videoRef} autoPlay playsInline muted />
          <div className="ep-camera-actions">
            <button type="button" className="ep-cam-cancel" onClick={closeCamera}>
              Cancel
            </button>
            <button type="button" className="ep-cam-snap" onClick={snap}>
              <Camera size={20} /> Capture
            </button>
          </div>
        </div>
      )} */}
    </div>
  );
}