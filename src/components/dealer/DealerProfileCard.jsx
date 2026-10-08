import { AtSign, MapPin, Share2, Store } from "lucide-react";
import toast from "react-hot-toast";
import profilePic from "../../assets/profilepic.jpg";
// import Rating from "./Rating";

// Uses the same `filters` / fieldset / legend markup as <Filters />,
// so it picks up the category page's sidebar styling.
export default function DealerProfileCard({ dealer, shareUrl, className = "" }) {
  const address = dealer.address ?? dealer.city;
  const mapsHref = address
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`
    : undefined;

  const handleShare = async () => {
    const url = shareUrl ?? window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: dealer.name, url });
      } else {
        await navigator.clipboard.writeText(url);
        toast.success("Link copied");
      }
    } catch {
      /* user cancelled share */
    }
  };

  return (
    <aside className={`relative bg-linear-to-bl from-[#13693a] via-[#8cbf44] to-[#13693a]  ${className} rounded-2xl `} >
      {/* Heading */}

        <button
          type="button"
          onClick={handleShare}
          aria-label="Share dealer"
          className="absolute grid size-7 shrink-0 place-items-center rounded-full bg-white text-[#13693a] transition hover:bg-gray-200  top-2 right-2"
        >
          <Share2 size={18} />
        </button>
   

      <div className="flex flex-col items-center text-center justify-center px-3 pb-4 ">
        <div className="grid size-24 place-items-center overflow-hidden rounded-full border-4 border-white bg-white shadow-md ring-4 ring-[#8cbf44]/40 mt-7">
          {dealer.logo ? (
            <img
              src={profilePic}
              alt={`${dealer.name} logo`}
              className="h-full w-full object-cover"
            />
          ) : (
            <span className="text-4xl font-bold text-[#13693a]">
              {dealer.name[0]}
            </span>
          )}
        </div>

        {/* Name, email and location on one line (wraps only if there isn't room) */}
        <div className="mt-3 flex flex-wrap items-center justify-center gap-x-3 gap-y-0">
          <h3 className="text-lg font-bold text-white">{dealer.name}</h3>

          {dealer.email && (
            <a
              href={`mailto:${dealer.email}`}
              className="flex items-center gap-1 break-all text-sm text-white hover:text-[#13693a]"
            >
              <AtSign size={16} className="shrink-0" />
              {dealer.email}
            </a>
          )}

          {address && (
            <a
              href={mapsHref}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 text-sm text-white hover:text-[#13693a]"
            >
              <MapPin size={16} className="shrink-0" />
              {address}
            </a>
          )}
        </div>

        {dealer.rating && (
          <div className="mt-1">
            {/* <Rating value={dealer.rating} /> */}
          </div>
        )}
        {dealer.products != null && (
          <span className="text-sm  text-white">{dealer.products} products</span>
        )}
      </div>

      {/* {dealer.email && (
        <a
          href={`mailto:${dealer.email}`}
          className="mt-4 inline-flex w-full items-center justify-center gap-1 rounded bg-linear-to-bl from-[#13693a] via-[#8cbf44] to-[#13693a] px-3 py-2 text-[13px] font-bold text-white hover:via-green-900"
        >
          Contact Seller
        </a>
      )} */}
    </aside>
  );
}