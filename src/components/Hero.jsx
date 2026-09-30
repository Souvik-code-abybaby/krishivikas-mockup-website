export default function Hero({ type = "home", children }) {
  return <section className={`hero ${type}`}>{children}</section>;
}