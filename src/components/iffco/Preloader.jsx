import preloader_image from "../../assets/favicon-32x32.png";

const Preloader = () => {
  return (
    <div className="preloader bg-white h-screen w-screen fixed inset-0 flex items-center justify-center z-50">
      <span className="loader"></span>
      <img src={preloader_image} alt="this is a icon of preloader" className="absolute top-[49.8%] left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full shadow-lg" />
    </div>
  );
};

export default Preloader;
