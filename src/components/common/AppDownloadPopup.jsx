
import { useState, useEffect } from "react";
import { CgClose } from "react-icons/cg";
import { Fade } from "react-awesome-reveal";
import google_play_store from "../../assets/Google-Play-Store.png";
import apple_store from "../../assets/apple-store.png";

const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.krishivikas.android";
const APP_STORE_URL =
  "https://apps.apple.com/in/app/krishi-vikas-udyog-kisan-app/id6449253442?platform=ipad";

const getDevicePlatform = () => {
  if (typeof navigator === "undefined") return "unknown";

  const ua = navigator.userAgent || navigator.vendor || window.opera || "";

  if (/android/i.test(ua)) return "android";

  if (
    /iPad|iPhone|iPod/.test(ua) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)
  ) {
    return "ios";
  }

  if (/windows/i.test(ua)) return "windows";

  return "desktop"; 

};

const AppDownloadPopup = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [platform, setPlatform] = useState("unknown");

  useEffect(() => {
    setPlatform(getDevicePlatform());
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsClosing(true); 
  };

  const handleAnimationEnd = (e) => {

    if (e.target !== e.currentTarget) return;

    if (isClosing) {
      setShowPopup(false);
      setIsClosing(false);
    }
  };

  const storeUrl = platform === "android" ? PLAY_STORE_URL : APP_STORE_URL;
  console.log(platform)
const showPlayStore = platform === "android" || platform === "windows";
const showAppStore = platform === "ios" || platform === "windows";
  return (
    <>
      {showPopup && (
        <div
          onAnimationEnd={handleAnimationEnd}
          className={` fixed bottom-6 right-6 z-[9999] bg-white rounded-2xl shadow-2xl border-2 border-green-100 p-5 w-50 ${
            isClosing ? "popup-slide-out" : "popup-slide-in"
          }`}
        >
          <style>{`
            @keyframes slide-in-right {
              0% {
                transform: translateX(150%);
                opacity: 0;
              }
              100% {
                transform: translateX(0);
                opacity: 1;
              }
            }
            @keyframes slide-out-right {
              0% {
                transform: translateX(0);
                opacity: 1;
              }
              100% {
                transform: translateX(150%);
                opacity: 0;
              }
            }
            .popup-slide-in {
              animation: slide-in-right 0.45s cubic-bezier(0.16, 1, 0.3, 1);
            }
            .popup-slide-out {
              animation: slide-out-right 0.35s cubic-bezier(0.4, 0, 1, 1) forwards;
            }
          `}</style>

          <button
            type="button"
            onClick={handleClose}
            aria-label="Close popup"
            className="absolute -top-3 -right-3 w-7 h-7 hover:bg-black/100 bg-black/90 rounded-xl flex items-center justify-center"
          >
            <CgClose className="text-neutral-100" size={14} />
          </button>

          <Fade triggerOnce>
            <p className="text-darkGreen text-center font-semibold text-sm mb-3">
              Download Our App
            </p>
          </Fade>

          <div className="flex items-center justify-center gap-3 flex-col">
  {showPlayStore && (
    <a
      href={PLAY_STORE_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Download on Google Play Store"
    >
      <img
        src={google_play_store}
        alt="Google Play Store"
        className="w-28"
        loading="lazy"
      />
    </a>
  )}
  {showAppStore && (
    <a
      href={APP_STORE_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Download on Apple Store"
    >
      <img
        src={apple_store}
        alt="Apple Store"
        className="w-28"
        loading="lazy"
      />
    </a>
  )}
</div>
        </div>
      )}
    </>
  );
};

export default AppDownloadPopup;