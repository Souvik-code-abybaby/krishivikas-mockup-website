import { useState } from "react";
import Rating from "./Rating";
const A = `../assets/`;
import Icon from "./Icon";
import { useNavigate } from "react-router-dom";
export default function ProductCard({
  product,
  boosted,
  compact,
  onOpen,
  onClick,
}) {
  const [liked, setLiked] = useState(false);
  const navigate = useNavigate();
  return (
    <article
      className={`product-card ${compact ? "compact" : ""} cursor-pointer hover:scale-102`}
      onClick={onClick}
    >
      <div className="product-image">
        <img src={product.image} alt={product.name} />
        {boosted && <span className="boosted">★ Boosted</span>}
        <button
          className={`wish ${liked ? "liked" : ""}`}
          onClick={(e) => {
            e.stopPropagation(); // don't trigger the card's onClick
            setLiked((prev) => !prev);
          }}
          aria-label="Add to wishlist"
        >
          <Icon name="heart" size={18} fill={liked ? "currentColor" : "none"} />
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
        <div className="flex flex-row justify-between items-center ">
          {" "}
          <strong className="text-[13px]">{product.price}</strong>{" "}
          {!boosted && !compact && (
            <button
              className="inline-flex items-center justify-center gap-1 rounded   bg-linear-to-bl from-[#13693a] via-[#8cbf44] to-[#13693a]  px-[12px] py-1  text-white hover:via-green-900 text-[11px]! font-bold"
              onClick={() => navigate("/product")}
            >
              Contact Seller
            </button>
          )}
        </div>

        {boosted && (
          <>
            <span className="location">
              <Icon name="location" size={14} /> Punjab
            </span>
            <button className="primary full bg-linear-to-r from-[#13693a] via-[#8cbf44] to-[#13693a]" onClick={onOpen}>
              View Details
            </button>
          </>
        )}
      </div>
    </article>
  );
}
