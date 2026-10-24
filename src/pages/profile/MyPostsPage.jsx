import { useState, useEffect, useRef } from "react";
import {
  ArrowLeft,
  Plus,
  MapPin,
  Tractor,
  Truck,
  Leaf,
  SprayCan,
  Package,
  Wheat,
  Wrench,
  CircleDot,
  BadgeCheck,
  Clock,
  XCircle,
  ImagePlus,
  X,
  ChevronDown,
  LocateFixed,
  Check,
} from "lucide-react";
import ProfileSidebar from "../../components/profile/ProfileSidebar";

/* ------------------------------------------------------------------ */
/* Static data                                                         */
/* ------------------------------------------------------------------ */
const CATEGORIES = [
  { id: "Tractor", icon: Tractor, vehicle: true },
  { id: "Commercial Vehicle", icon: Truck, vehicle: true },
  { id: "Seeds", icon: Leaf },
  { id: "Pesticides", icon: SprayCan },
  { id: "Fertilizers", icon: Package },
  { id: "Harvester", icon: Wheat, vehicle: true },
  { id: "Implements", icon: Wrench },
  { id: "Tyres", icon: CircleDot },
];

const BRANDS = {
  Tractor: ["Sonalika", "Mahindra", "John Deere", "Swaraj", "TAFE", "Kubota"],
  "Commercial Vehicle": ["Tata", "Ashok Leyland", "Eicher", "Mahindra"],
  Harvester: ["Kubota", "Preet", "Claas", "John Deere"],
  default: ["Other"],
};

const PHOTO_ANGLES = ["Front View", "Left Side", "Right Side", "Back View"];

const STATES = [
  "Andhra Pradesh", "Assam", "Bihar", "Chhattisgarh", "Delhi", "Gujarat",
  "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala",
  "Madhya Pradesh", "Maharashtra", "Odisha", "Punjab", "Rajasthan",
  "Tamil Nadu", "Telangana", "Uttar Pradesh", "Uttarakhand", "West Bengal",
];

const STATUS = {
  approved: { label: "Approved", icon: BadgeCheck },
  pending: { label: "Pending", icon: Clock },
  rejected: { label: "Rejected", icon: XCircle },
};

const SEED_POSTS = [
  {
    id: 1,
    category: "Tractor",
    title: "Sonalika DI 50",
    price: 580000,
    location: "Bhopal, Madhya Pradesh",
    date: "25-06-2025",
    status: "approved",
    image: "",
    images: [],
    // Sample details so the detail page has something to show
    details: {
      brand: "Sonalika",
      model: "DI 50",
      description: "Well maintained tractor, single owner, regular servicing.",
      rent: false,
      negotiable: true,
      rc: true,
      noc: false,
      regNo: "MP04 AB 1234",
      year: "2021",
      pincode: "462001",
      address: "Bhopal, Madhya Pradesh",
      states: ["Madhya Pradesh", "Rajasthan"],
    },
  },
];

const money = (n) =>
  "₹ " +
  new Intl.NumberFormat("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(n);

const today = () => {
  const d = new Date();
  const p = (n) => String(n).padStart(2, "0");
  return `${p(d.getDate())}-${p(d.getMonth() + 1)}-${d.getFullYear()}`;
};

/* ------------------------------------------------------------------ */
/* Small shared pieces                                                 */
/* ------------------------------------------------------------------ */
function PageHead({ title, subtitle, onBack, action }) {
  return (
    <div className="mp-head">
      {onBack && (
        <button type="button" className="mp-back" onClick={onBack} aria-label="Back">
          <ArrowLeft size={20} />
        </button>
      )}
      <div className="mp-head-text">
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

// function AddPostButton({ onClick }) {
//   return (
//     <button type="button" className="mp-add" onClick={onClick}>
//       <Plus size={18} /> Add Post
//     </button>
//   );
// }

function Switch({ label, checked, onChange }) {
  return (
    <div className="mp-switch-row">
      <span>{label}</span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        className={`mp-switch ${checked ? "on" : ""}`}
        onClick={() => onChange(!checked)}
      >
        <i />
      </button>
    </div>
  );
}

function Field({ label, required, error, children }) {
  return (
    <div className="mp-field">
      <label className="mp-label">
        {label} {required && <span className="mp-req">*</span>}
      </label>
      {children}
      {error && <p className="mp-error">{error}</p>}
    </div>
  );
}

function StateMultiSelect({ value, onChange, hasError }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;
    const close = (e) => !ref.current?.contains(e.target) && setOpen(false);
    document.addEventListener("pointerdown", close);
    return () => document.removeEventListener("pointerdown", close);
  }, [open]);

  const toggle = (s) =>
    onChange(value.includes(s) ? value.filter((v) => v !== s) : [...value, s]);

  return (
    <div className="mp-multi" ref={ref}>
      <button
        type="button"
        className={`mp-input mp-multi-btn ${hasError ? "err" : ""}`}
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        <span className={value.length ? "" : "ph"}>
          {value.length ? `${value.length} selected` : "Choose state(s)"}
        </span>
        <ChevronDown size={18} />
      </button>

      {open && (
        <div className="mp-multi-list" role="listbox" aria-multiselectable="true">
          {STATES.map((s) => {
            const on = value.includes(s);
            return (
              <button
                type="button"
                key={s}
                role="option"
                aria-selected={on}
                className={on ? "on" : ""}
                onClick={() => toggle(s)}
              >
                <span className="mp-check">{on && <Check size={13} strokeWidth={3} />}</span>
                {s}
              </button>
            );
          })}
        </div>
      )}

      {value.length > 0 && (
        <div className="mp-tags">
          {value.map((s) => (
            <span key={s} className="mp-tag">
              {s}
              <button type="button" onClick={() => toggle(s)} aria-label={`Remove ${s}`}>
                <X size={13} />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* View 1: My Post Category (categories that have posts)               */
/* ------------------------------------------------------------------ */
function CategoryOverview({ posts, onOpen, onAdd }) {
  const counts = posts.reduce((m, p) => ({ ...m, [p.category]: (m[p.category] || 0) + 1 }), {});
  const active = CATEGORIES.filter((c) => counts[c.id]);

  return (
    <>
      <PageHead
        title="My Posts"
        subtitle="Pick a category to see your posts"
        // action={<AddPostButton onClick={onAdd} />}
      />
      {active.length === 0 ? (
        <div className="mp-empty">
          <Package size={34} />
          <h2>No posts yet</h2>
          <p>Add your first item and it will show up here once it is reviewed.</p>
          {/* <AddPostButton onClick={onAdd} /> */}
        </div>
      ) : (
        <div className="mp-cat-grid">
          {active.map(({ id, icon: Icon }) => (
            <button type="button" key={id} className="mp-cat-card" onClick={() => onOpen(id)}>
              <span className="mp-count">{counts[id]}</span>
              <Icon size={54} strokeWidth={1.6} />
              <strong>{id}</strong>
            </button>
          ))}
        </div>
      )}
    </>
  );
}

/* ------------------------------------------------------------------ */
/* View 2: Posts in a category                                         */
/* ------------------------------------------------------------------ */
function PostList({ posts, category, onBack, onAdd, onOpen }) {
  const items = posts.filter((p) => p.category === category);
  return (
    <>
      <PageHead
        title="My Posts"
        subtitle={category}
        onBack={onBack}
        // action={<AddPostButton onClick={onAdd} />}
      />
      <div className="mp-list">
        {items.map((p) => {
          const S = STATUS[p.status];
          return (
            <article
              key={p.id}
              className="mp-post"
              role="button"
              tabIndex={0}
              onClick={() => onOpen(p.id)}
              onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onOpen(p.id)}
            >
              <div className="mp-thumb">
                {p.image ? <img src={p.image} alt="" /> : <Leaf size={30} />}
              </div>
              <div className="mp-post-body">
                <h3>{p.title}</h3>
                <strong className="mp-price">{money(p.price)}</strong>
                <span className="mp-meta">
                  <MapPin size={14} /> {p.location}
                </span>
              </div>
              <div className="mp-post-side">
                <span className={`mp-status ${p.status}`}>
                  <S.icon size={15} /> {S.label}
                </span>
                <small>{p.date}</small>
              </div>
            </article>
          );
        })}
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* View: Post details                                                  */
/* ------------------------------------------------------------------ */
function PostDetail({ post, onBack }) {
  const d = post.details || {};
  const meta = CATEGORIES.find((c) => c.id === post.category);
  const gallery = post.images?.length
    ? post.images
    : post.image
      ? [{ angle: "Photo", url: post.image }]
      : [];
  const [active, setActive] = useState(0);
  const S = STATUS[post.status];
  const yesNo = (v) => (v ? "Yes" : "No");

  const specs = [
    ["Category", post.category],
    ["Brand", d.brand],
    ["Model", d.model],
    ...(meta?.vehicle
      ? [
          ["Year of Purchase", d.year],
          ["Registration Number", d.regNo],
          ["RC Available", yesNo(d.rc)],
          ["NOC Available", yesNo(d.noc)],
        ]
      : []),
    ["Pincode", d.pincode],
  ].filter(([, v]) => v);

  return (
    <>
      <PageHead title="Post Details" subtitle={post.category} onBack={onBack} />

      <div className="mp-detail">
        <div className="mp-gallery">
          <div className="mp-gallery-main">
            {gallery[active] ? (
              <img src={gallery[active].url} alt={gallery[active].angle} />
            ) : (
              <Leaf size={56} />
            )}
          </div>
          {gallery.length > 1 && (
            <div className="mp-gallery-thumbs">
              {gallery.map((g, i) => (
                <button
                  type="button"
                  key={g.angle}
                  className={i === active ? "active" : ""}
                  onClick={() => setActive(i)}
                  aria-label={g.angle}
                >
                  <img src={g.url} alt="" />
                  <span>{g.angle}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="mp-summary">
          <span className={`mp-status ${post.status}`}>
            <S.icon size={15} /> {S.label}
          </span>
          <h2>{post.title}</h2>
          <strong className="mp-detail-price">{money(post.price)}</strong>
          <div className="mp-flags">
            <span className={d.negotiable ? "yes" : ""}>
              {d.negotiable ? <Check size={14} strokeWidth={3} /> : <X size={14} />} Price negotiable
            </span>
            <span className={d.rent ? "yes" : ""}>
              {d.rent ? <Check size={14} strokeWidth={3} /> : <X size={14} />} Available for rent
            </span>
          </div>
          <span className="mp-meta">
            <MapPin size={14} /> {post.location}
          </span>
          <span className="mp-meta">
            <Clock size={14} /> Posted on {post.date}
          </span>
        </div>
      </div>

      <div className="mp-form" style={{ paddingBottom: 24 }}>
        <div className="mp-card">
          <h3>Item Details</h3>
          <dl className="mp-specs">
            {specs.map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </div>

        {d.description && (
          <div className="mp-card">
            <h3>Description</h3>
            <p className="mp-desc">{d.description}</p>
          </div>
        )}

        {d.states?.length > 0 && (
          <div className="mp-card">
            <h3>Selling States</h3>
            <div className="mp-tags" style={{ marginTop: 0 }}>
              {d.states.map((st) => (
                <span key={st} className="mp-tag" style={{ paddingRight: 12 }}>
                  {st}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* View 3: Select Category                                             */
/* ------------------------------------------------------------------ */
function SelectCategory({ posts, onBack, onPick }) {
  const counts = posts.reduce((m, p) => ({ ...m, [p.category]: (m[p.category] || 0) + 1 }), {});
  return (
    <>
      <PageHead title="Select Category" subtitle="What do you want to sell?" onBack={onBack} />
      <div className="mp-cat-grid">
        {CATEGORIES.map(({ id, icon: Icon }) => (
          <button type="button" key={id} className="mp-cat-card" onClick={() => onPick(id)}>
            {counts[id] > 0 && <span className="mp-count">{counts[id]}</span>}
            <Icon size={54} strokeWidth={1.6} />
            <strong>{id}</strong>
          </button>
        ))}
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* View 4: Enter Product details                                       */
/* ------------------------------------------------------------------ */
function ProductForm({ category, onBack, onSubmit }) {
  const meta = CATEGORIES.find((c) => c.id === category);
  const brands = BRANDS[category] || BRANDS.default;

  const [form, setForm] = useState({
    brand: "",
    model: "",
    description: "",
    price: "",
    rent: false,
    negotiable: false,
    rc: false,
    noc: false,
    regNo: "",
    year: "",
    pincode: "",
    address: "",
    states: [],
  });
  const [images, setImages] = useState({}); // { "Front View": { url, file } }
  const [photoError, setPhotoError] = useState("");
  const [errors, setErrors] = useState({});
  const urls = useRef([]);
  const submitted = useRef(false);

  // Free preview memory when leaving the form, unless the post keeps using the images
  useEffect(
    () => () => {
      if (!submitted.current) urls.current.forEach(URL.revokeObjectURL);
    },
    [],
  );

  const set = (k, v) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const pickImage = (angle, file) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) return setPhotoError("Choose an image file");
    if (file.size > 5 * 1024 * 1024) return setPhotoError("Each image must be under 5 MB");
    setPhotoError("");
    const url = URL.createObjectURL(file);
    urls.current.push(url);
    setImages((m) => ({ ...m, [angle]: { url, file } }));
  };

  const removeImage = (angle) =>
    setImages((m) => {
      const { [angle]: _drop, ...rest } = m;
      return rest;
    });

  const validate = () => {
    const e = {};
    const thisYear = new Date().getFullYear();
    if (!form.brand) e.brand = "Select a brand";
    if (!(Number(form.price) > 0)) e.price = "Enter the price";
    if (meta?.vehicle) {
      if (!form.regNo.trim()) e.regNo = "Enter the registration number";
      const y = Number(form.year);
      if (!(y >= 1950 && y <= thisYear)) e.year = `Enter a year between 1950 and ${thisYear}`;
    }
    if (!/^\d{6}$/.test(form.pincode)) e.pincode = "Enter a 6-digit pincode";
    if (!form.states.length) e.states = "Choose at least one state";
    setErrors(e);
    return !Object.keys(e).length;
  };

  const submit = (ev) => {
    ev.preventDefault();
    if (!validate()) {
      document.querySelector(".mp-error")?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    submitted.current = true;
    const first = Object.values(images)[0];
    onSubmit({
      id: Date.now(),
      category,
      title: `${form.brand} ${form.model}`.trim(),
      price: Number(form.price),
      location: form.address || `Pincode ${form.pincode}`,
      date: today(),
      status: "pending",
      image: first?.url || "",
      images: PHOTO_ANGLES.filter((a) => images[a]).map((a) => ({
        angle: a,
        url: images[a].url,
      })),
      details: form,
      files: Object.values(images).map((i) => i.file),
    });
  };

  return (
    <form onSubmit={submit} noValidate>
      <PageHead title="Enter Product Details" subtitle={category} onBack={onBack} />

      <div className="mp-form">
        {/* Photos */}
        <div className="mp-card">
          <h3>Upload Product Images</h3>
          <p className="mp-hint">Add clear photos of the product from multiple angles</p>
          <div className="mp-photos">
            {PHOTO_ANGLES.map((angle) => {
              const img = images[angle];
              return (
                <div key={angle} className={`mp-slot ${img ? "filled" : ""}`}>
                  <label>
                    {img ? <img src={img.url} alt={angle} /> : <ImagePlus size={30} />}
                    <input
                      type="file"
                      accept="image/*"
                      hidden
                      onChange={(e) => {
                        pickImage(angle, e.target.files?.[0]);
                        e.target.value = "";
                      }}
                    />
                    <span className="mp-slot-label">{angle}</span>
                  </label>
                  {img && (
                    <button
                      type="button"
                      className="mp-slot-x"
                      onClick={() => removeImage(angle)}
                      aria-label={`Remove ${angle}`}
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>
              );
            })}
          </div>
          {photoError && <p className="mp-error">{photoError}</p>}
        </div>

        {/* Item details */}
        <div className="mp-card">
          <h3>Item Details</h3>
          <div className="mp-grid2">
            <Field label="Brands" required error={errors.brand}>
              <div className={`mp-input mp-select ${errors.brand ? "err" : ""}`}>
                <select value={form.brand} onChange={(e) => set("brand", e.target.value)}>
                  <option value="">Select Brand</option>
                  {brands.map((b) => (
                    <option key={b}>{b}</option>
                  ))}
                </select>
                <ChevronDown size={18} />
              </div>
            </Field>
            <Field label="Model">
              <div className="mp-input">
                <input
                  value={form.model}
                  onChange={(e) => set("model", e.target.value)}
                  placeholder="e.g. DI 50"
                />
              </div>
            </Field>
          </div>
          <Field label="Description">
            <div className="mp-input mp-area">
              <textarea
                rows={4}
                value={form.description}
                onChange={(e) => set("description", e.target.value)}
                placeholder="Add additional information about condition, usage, etc."
              />
            </div>
          </Field>
        </div>

        {/* Pricing */}
        <div className="mp-card">
          <h3>Pricing &amp; Availability</h3>
          <Field label="Price" required error={errors.price}>
            <div className={`mp-input ${errors.price ? "err" : ""}`}>
              <input
                inputMode="decimal"
                value={form.price}
                onChange={(e) => set("price", e.target.value.replace(/[^\d.]/g, ""))}
                placeholder="Enter amount (₹)"
              />
            </div>
          </Field>
          <Switch label="Available for Rent" checked={form.rent} onChange={(v) => set("rent", v)} />
          <Switch label="Price Negotiable" checked={form.negotiable} onChange={(v) => set("negotiable", v)} />
        </div>

        {/* Vehicle documents */}
        {meta?.vehicle && (
          <div className="mp-card">
            <h3>Vehicle Documents</h3>
            <Switch label="RC Available" checked={form.rc} onChange={(v) => set("rc", v)} />
            <Switch label="NOC Available" checked={form.noc} onChange={(v) => set("noc", v)} />
            <div className="mp-grid2">
              <Field label="Registration Number" required error={errors.regNo}>
                <div className={`mp-input ${errors.regNo ? "err" : ""}`}>
                  <input
                    value={form.regNo}
                    onChange={(e) => set("regNo", e.target.value.toUpperCase())}
                    placeholder="Enter Registration Number"
                  />
                </div>
              </Field>
              <Field label="Year of Purchase" required error={errors.year}>
                <div className={`mp-input ${errors.year ? "err" : ""}`}>
                  <input
                    inputMode="numeric"
                    maxLength={4}
                    value={form.year}
                    onChange={(e) => set("year", e.target.value.replace(/\D/g, ""))}
                    placeholder="e.g. 2024"
                  />
                </div>
              </Field>
            </div>
          </div>
        )}

        {/* Location */}
        <div className="mp-card">
          <h3>Location &amp; Target Area</h3>
          <div className="mp-grid2">
            <Field label="Post Pin Code" required error={errors.pincode}>
              <div className={`mp-input ${errors.pincode ? "err" : ""}`}>
                <MapPin size={18} />
                <input
                  inputMode="numeric"
                  maxLength={6}
                  value={form.pincode}
                  onChange={(e) => set("pincode", e.target.value.replace(/\D/g, ""))}
                  placeholder="6-digit pincode"
                />
                <button
                  type="button"
                  className="mp-locate"
                  aria-label="Use my current location"
                  onClick={() => {
                    // Hook up geolocation + reverse geocoding to fill pincode and address
                  }}
                >
                  <LocateFixed size={20} />
                </button>
              </div>
            </Field>
            <Field label="Post Address">
              <div className="mp-input">
                <input
                  value={form.address}
                  onChange={(e) => set("address", e.target.value)}
                  placeholder="Area, city, state"
                />
              </div>
            </Field>
          </div>
          <Field label="Selling State" required error={errors.states}>
            <StateMultiSelect
              value={form.states}
              onChange={(v) => set("states", v)}
              hasError={!!errors.states}
            />
          </Field>
        </div>
      </div>

      <div className="mp-footer">
        <button type="submit" className="mp-continue">
          Continue
        </button>
      </div>
    </form>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */
export default function MyPostsPage() {
  const [posts, setPosts] = useState(SEED_POSTS);
  const [view, setView] = useState({ name: "categories" }); // categories | list | detail | select | form
  const [notice, setNotice] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view.name]);

  const goAdd = () => setView({ name: "select" });

  const handleSubmit = (post) => {
    // Send post.details + post.files (FormData) to your API here
    setPosts((p) => [post, ...p]);
    setNotice("Your post was submitted and is waiting for approval.");
    setView({ name: "list", category: post.category });
  };

  useEffect(() => {
    if (!notice) return;
    const t = setTimeout(() => setNotice(""), 5000);
    return () => clearTimeout(t);
  }, [notice]);

  return (
    <main className="profile-page">
      <ProfileSidebar />

      <section className="profile-content">
        <div className="mp-wrap">
          {notice && (
            <div className="mp-notice" role="status">
              <BadgeCheck size={18} /> {notice}
            </div>
          )}

          {view.name === "categories" && (
            <CategoryOverview
              posts={posts}
              onAdd={goAdd}
              onOpen={(category) => setView({ name: "list", category })}
            />
          )}

          {view.name === "list" && (
            <PostList
              posts={posts}
              category={view.category}
              onBack={() => setView({ name: "categories" })}
              onAdd={goAdd}
              onOpen={(id) => setView({ name: "detail", id })}
            />
          )}

          {view.name === "detail" &&
            (() => {
              const post = posts.find((p) => p.id === view.id);
              return post ? (
                <PostDetail
                  key={post.id}
                  post={post}
                  onBack={() => setView({ name: "list", category: post.category })}
                />
              ) : null;
            })()}

          {view.name === "select" && (
            <SelectCategory
              posts={posts}
              onBack={() => setView({ name: "categories" })}
              onPick={(category) => setView({ name: "form", category })}
            />
          )}

          {view.name === "form" && (
            <ProductForm
              key={view.category}
              category={view.category}
              onBack={() => setView({ name: "select" })}
              onSubmit={handleSubmit}
            />
          )}
        </div>
      </section>
    </main>
  );
}