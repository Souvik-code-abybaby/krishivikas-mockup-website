import Icon from "./Icon";
import { useNavigate } from "react-router-dom";
export default function SectionTitle({ icon, title, action = "View All →",onClick }) {
  const navigate=useNavigate();
  console.log(onClick)

  const handleClick = () => {
    if (!onClick) return;
    if (/^https?:\/\//i.test(onClick)) {
      // external link: open in a new tab
      window.open(onClick, "_blank", "noopener,noreferrer");
    } else {
      // internal route
      navigate(onClick);
    }
  };
  return (
    <div className="section-title">
      <h2>
        {icon && <Icon name={icon} />}
        {title}
      </h2>
      {title!=="Categories" &&   title!=="Discoveries For You" && <button onClick={handleClick}>{action}</button> }
      
      
    </div>
  );
}