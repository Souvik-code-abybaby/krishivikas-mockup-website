
import Icon from "../components/Icon";

export default function ProfilePage() {
  const menu = [
    "My Profile",
    "My Posts",
    "My Leads",
    "My Boosts",
    "My Banner",
    "Plan",
    "Settings",
    "Logout",
  ];
  return (
    <main className="profile-page">
      <aside className="profile-sidebar">
        <div className="mini-profile">
          <div className="profile-photo">RS</div>
          <div>
            <strong>Rahul Sharma</strong>
            <small>rahul@gmail.com</small>
          </div>
        </div>
        <nav>
          {menu.map((x, i) => (
            <button className={i === 0 ? "active" : ""} key={x}>
              <Icon name={i === 7 ? "logout" : "user"} /> {x}
            </button>
          ))}
        </nav>
      </aside>
      <section className="profile-content">
        <div className="profile-heading">
          <h1>My Profile</h1>
          <button className="primary">
            <Icon name="edit" /> Edit Profile
          </button>
        </div>
        <div className="profile-card">
          <div className="profile-photo large">RS</div>
          <div>
            <h2>Rahul Sharma</h2>
            <p>rahul@gmail.com</p>
            <p>
              <Icon name="phone" size={17} /> +91 98765 43210
            </p>
            <p>
              <Icon name="location" size={17} /> Uttar Pradesh, India
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
    </main>
  );
}