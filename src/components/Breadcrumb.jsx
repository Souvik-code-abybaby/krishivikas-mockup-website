export default function Breadcrumb({ items }) {
  return (
    <div className="breadcrumb">
      {items.map((x, i) => (
        <span key={x}>
          {i > 0 && "›"} {x}
        </span>
      ))}
    </div>
  );
}