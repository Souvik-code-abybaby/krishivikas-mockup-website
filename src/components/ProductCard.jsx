import { useState } from "react";
import Rating from "./Rating";
const A = `../assets/`;
import Icon from "./Icon";
import { useNavigate } from "react-router-dom";
export default function ProductCard({ product, boosted, compact, onOpen }) {
  const [liked, setLiked] = useState(false);
  const navigate=useNavigate();
  return (
    <article className={`product-card ${compact ? "compact" : ""}`}>
      <div className="product-image">
 
        <img src={product.image} alt={product.name} />
        {boosted && <span className="boosted">★ Boosted</span>}
        <button
          className={`wish ${liked ? "liked" : ""}`}
          onClick={() => setLiked(!liked)}
          aria-label="Add to wishlist"
        >
          <Icon name="heart" size={18} />
        </button>
        
      </div>
      <div className="product-body">
        <h3>{product.name}</h3>
        <p>{product.category}</p>
        {!compact && (
          <>
            <Rating value={product.rating} reviews={product.reviews} />
            <span className="hp">{product.hp}</span>
          </>
        )}
        <strong className="price">{product.price}</strong>
        {boosted && (
          <>
            <span className="location">
              <Icon name="location" size={14} /> Punjab
            </span>
            <button className="primary full" onClick={onOpen}>
              View Details
            </button>
          </>
        )}
        {!boosted && !compact && (
          <div className="product-actions">
            <button className="primary" onClick={()=>navigate("/product")}>
              Call On Road Price
            </button>
            <button className="outline" onClick={()=>navigate("/compare")}>↻ Compare</button>
          </div>
        )}
      </div>
    </article>
  );
}