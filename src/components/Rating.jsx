export default function Rating({ value = "4.5", reviews }) {
  return (
    <span className="rating">
      <span>★</span> {value}
      {reviews && (
        <small>
          {" "}
          ({reviews}
          {reviews ? " reviews" : ""})
        </small>
      )}
    </span>
  );
}