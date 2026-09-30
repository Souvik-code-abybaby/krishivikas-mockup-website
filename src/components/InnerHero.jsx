
import Hero from "./Hero";
export default function     InnerHero({ title, text }) {
  return (
    <Hero type="inner">
      <div>
        <h1>{title}</h1>
        <p>{text}</p>
      </div>
    </Hero>
  );
}