// import Icon from "../components/Icon";
// import ProfileSidebar from "../components/profile/ProfileSidebar";
// import { useEffect } from "react";
// export default function ProfilePage() {
//       useEffect(() => {
//       window.scrollTo(0, 0);
//     }, []);
//   return (
//     <main className="profile-page">
//       <ProfileSidebar />

//       <section className="profile-content">
//         <div className="profile-heading">
//           <h1>My Profile</h1>
//           <button className="primary">
//             <Icon name="edit" /> Edit Profile
//           </button>
//         </div>
//         <div className="profile-card">
//           <div className="profile-photo large">RS</div>
//           <div>
//             <h2>Rahul Sharma</h2>
//             <p>rahul@gmail.com</p>
//             <p>
//               <Icon name="phone" size={17} /> +91 98765 43210
//             </p>
//             <p>
//               <Icon name="location" size={17} /> Uttar Pradesh, India
//             </p>
//           </div>
//         </div>
//         <h2>My Activity</h2>
//         <div className="stats">
//           <div>
//             <strong>12</strong>
//             <span>My Posts</span>
//           </div>
//           <div>
//             <strong>8</strong>
//             <span>My Leads</span>
//           </div>
//           <div>
//             <strong>5</strong>
//             <span>My Boosts</span>
//           </div>
//         </div>
//         <h2>Recent Activity</h2>
//         <div className="activity">
//           {[
//             ["Your post Tractor for sale is approved", "2 hours ago"],
//             ["You received a new lead", "5 hours ago"],
//             ["Your boost has expired", "1 day ago"],
//           ].map(([x, t]) => (
//             <div key={x}>
//               <span className="activity-icon">✓</span>
//               <p>
//                 {x}
//                 <small>{t}</small>
//               </p>
//             </div>
//           ))}
//           <button>View All →</button>
//         </div>
//       </section>
//     </main>
//   );
// }
import Icon from "../components/Icon";
import ProfileSidebar from "../components/profile/ProfileSidebar";
import EditProfileModal from "../components/profile/EditProfileModal";
import { useEffect, useState } from "react";

export default function ProfilePage() {
  const [editOpen, setEditOpen] = useState(false);
  const [profile, setProfile] = useState({
    name: "Rahul Sharma",
    phone: "+91 98765 43210",
    address: "Uttar Pradesh, India",
    pincode: "",
    occupation: "",
    categories: [],
    crops: [],
    landSize: "",
    landType: "",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const initials = profile.name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");

  return (
    <main className="profile-page">
      <ProfileSidebar />

      <section className="profile-content">
        <div className="profile-heading">
          <h1>My Profile</h1>
          <button className="primary" onClick={() => setEditOpen(true)}>
            <Icon name="edit" /> Edit Profile
          </button>
        </div>
        <div className="profile-card">
          <div className="profile-photo large">{initials}</div>
          <div>
            <h2>{profile.name}</h2>
            <p>rahul@gmail.com</p>
            <p>
              <Icon name="phone" size={17} /> {profile.phone}
            </p>
            <p>
              <Icon name="location" size={17} /> {profile.address}
            </p>
          </div>
        </div>
        <h2>My Activity</h2>
        <div className="stats">
          <div>
            <strong>12</strong>
            <span>My Posts</span>
          </div>
          <div>
            <strong>8</strong>
            <span>My Leads</span>
          </div>
          <div>
            <strong>5</strong>
            <span>My Boosts</span>
          </div>
        </div>
        <h2>Recent Activity</h2>
        <div className="activity">
          {[
            ["Your post Tractor for sale is approved", "2 hours ago"],
            ["You received a new lead", "5 hours ago"],
            ["Your boost has expired", "1 day ago"],
          ].map(([x, t]) => (
            <div key={x}>
              <span className="activity-icon">✓</span>
              <p>
                {x}
                <small>{t}</small>
              </p>
            </div>
          ))}
          <button>View All →</button>
        </div>
      </section>

      {editOpen && (
        <EditProfileModal
          profile={profile}
          onClose={() => setEditOpen(false)}
          onSave={(data) => setProfile((p) => ({ ...p, ...data }))}
        />
      )}
    </main>
  );
}