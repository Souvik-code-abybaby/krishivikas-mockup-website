import Icon from "./Icon";
export default function SectionTitle({ icon, title, action = "View All →" }) {
  return (
    <div className="section-title">
      <h2>
        {icon && <Icon name={icon} />}
        {title}
      </h2>
      <button>{action}</button>
    </div>
  );
}