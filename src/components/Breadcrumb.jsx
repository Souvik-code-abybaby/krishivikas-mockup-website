
import { useParams, useLocation, useNavigate } from "react-router-dom";

import kvVideo from "../assets/kv-video.mp4";
import Tractor from "../assets/Tractor.mp4";
import GoodsVehicle from "../assets/GoodsVehicle.mp4";
import Harvester from "../assets/Harvester.mp4";
import Implements from "../assets/Implements.mp4";
import agriinputs from "../assets/agriinputs.mp4";
import Tyres from "../assets/Tyres.mp4";
import { FaChevronRight } from "react-icons/fa6";
import { useTranslation } from "react-i18next";
// import CategorySearchForm from "../Homepage/CategorySearchForm";

const categoryVideoMap = {
  tractor: Tractor,
  "goods-vehicle": GoodsVehicle,
  goodvechal: GoodsVehicle,
  goodsvehicle: GoodsVehicle,
  implements: Implements,
  harvester: Harvester,
  "agri-inputs": agriinputs,
  agriinputs: agriinputs,
  agriinput: agriinputs,
  seeds: agriinputs,
  pesticides: agriinputs,
  fertilizer: agriinputs,
  fertilizers: agriinputs,
  tyre: Tyres,
  tyayar: Tyres,
  tyaar: Tyres,
};

const BreadCrumb = ({ pageTitle, customBreadcrumbs }) => {
  const { category, type } = useParams();
  const location = useLocation();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const validTypes = [
    "new",
    "old",
    "used",
    "rent",
    "seeds",
    "pesticides",
    "fertilizer",
    "fertilizers",
  ];
  const agriInputTypes = ["seeds", "pesticides", "fertilizer", "fertilizers"];


  const isFromHeroBanner = location.pathname.includes("/new_product_view_all/");

  const pathSegments = location.pathname.split("/").filter(Boolean);

  console.log("🔍 BreadCrumb URL Analysis:", {
    pathname: location.pathname,
    segments: pathSegments,
    category,
    type,
    isFromHeroBanner,
    segmentCount: pathSegments.length,
  });


  let actualType,
    actualCategoryRaw,
    shouldShowInBreadcrumb = true;

  if (isFromHeroBanner) {

    actualType = "new";
    actualCategoryRaw = category;
  } else if (pathSegments.length === 2) {

    if (validTypes.includes(type?.toLowerCase())) {
      actualType = type;
      actualCategoryRaw = category;
    } else {
    
      console.log("❌ Invalid type in 2-segment URL:", type);
      actualType = null;
      actualCategoryRaw = category;
      shouldShowInBreadcrumb = false;
    }
  } else if (pathSegments.length === 4) {

    if (validTypes.includes(type?.toLowerCase())) {
      actualType = type;
      actualCategoryRaw = category;
    } else {
      console.log("❌ Invalid type in 4-segment URL:", type);
      actualType = null;
      actualCategoryRaw = category;
      shouldShowInBreadcrumb = false;
    }
  } else if (pathSegments.length === 3) {

    if (agriInputTypes.includes(category?.toLowerCase())) {
      actualType = category;
      actualCategoryRaw = "agri-inputs";
    } else {
      actualType = null;
      actualCategoryRaw = category;
    }
  } else {
    actualType = type;
    actualCategoryRaw = category;
  }


  const actualCategory = actualCategoryRaw
    ? actualCategoryRaw.toLowerCase()
    : "";
  const backgroundMedia =
    categoryVideoMap[actualCategory] ||
    categoryVideoMap[actualType?.toLowerCase()] ||
    kvVideo;
  const agriTypeValueMap = {
    seeds: "seeds",
    pesticides: "pesticides",
    fertilizer: "fertilizers",
    fertilizers: "fertilizers",
  };

  const searchFormCategory = agriInputTypes.includes(actualType?.toLowerCase())
    ? "agri-inputs"
    : actualCategoryRaw;

  const searchFormType = agriInputTypes.includes(actualType?.toLowerCase())
    ? agriTypeValueMap[actualType.toLowerCase()]
    : actualType;

  const getCategoryDisplay = (cat) => {
    if (!cat) return "";
    const normalizedCat = cat.toLowerCase();
    if (
      normalizedCat === "goods-vehicle" ||
      normalizedCat === "goodvechal" ||
      normalizedCat === "goodsvehicle"
    )
      return "goods vehicle";
    if (
      normalizedCat === "agri-inputs" ||
      normalizedCat === "agriinputs" ||
      normalizedCat === "agriinput"
    )
      return t("agri inputs");
    return t(normalizedCat);
  };



  const getTypeDisplay = (typeParam) => {
    if (!typeParam) return "";
    if (typeParam === "old") return t("used");
    if (typeParam === "new") return t("new");
    if (typeParam === "seeds") return t("seeds");
    if (typeParam === "pesticides") return t("pesticides");
    if (typeParam === "fertilizer" || typeParam === "fertilizers")
      return t("fertilizer");
    return t(typeParam);
  };


  const getMainTitle = () => {
    if (pageTitle) return pageTitle;


    if (agriInputTypes.includes(actualType?.toLowerCase())) {
      return getTypeDisplay(actualType);
    }

    if (
      actualCategory === "goods-vehicle" ||
      actualCategory === "goodvechal" ||
      actualCategory === "goodsvehicle"
    ) {
      return actualType
        ? `${getTypeDisplay(actualType)} ${t("goods vehicle")}`
        : t("goods vehicle");
    } else if (
      actualCategory === "agri-inputs" ||
      actualCategory === "agriinputs" ||
      actualCategory === "agriinput"
    ) {
      return actualType ? t(actualType) : t("agri inputs");
    } else if (actualCategory) {
      return actualType
        ? `${getTypeDisplay(actualType)} ${t(actualCategory)}`
        : t(actualCategory);
    }
    return t("Home");
  };


  const renderBreadcrumbLinks = () => {
    if (customBreadcrumbs) {
      return (
        <div className="breadcrumb-links flex justify-center items-center md:text-2xl text-white">
          <p
            className="hover:text-lightgreen px-3 cursor-pointer"
            onClick={() => navigate("/")}
          >
            {t("Home")}
          </p>
          {customBreadcrumbs.map((crumb, index) => (
            <div key={index} className="flex items-center">
              <FaChevronRight />
              <p className="hover:text-lightgreen px-3 capitalize">
                {t(crumb)}
              </p>
            </div>
          ))}
        </div>
      );
    }

    return (
      <div className="breadcrumb-links flex justify-center items-center md:text-2xl text-white">
        <p
          className="hover:text-lightgreen px-3 cursor-pointer"
          onClick={() => navigate("/")}
        >
          {t("Home")}
        </p>
        <FaChevronRight />
        <p className="hover:text-lightgreen px-3 capitalize">
          {getCategoryDisplay(actualCategoryRaw)}
        </p>

        {actualType &&
          shouldShowInBreadcrumb &&
          validTypes.includes(actualType.toLowerCase()) &&
          !agriInputTypes.includes(actualCategoryRaw?.toLowerCase()) && (
            <>
              <FaChevronRight />
              <p className="hover:text-lightgreen px-3 capitalize">
                {getTypeDisplay(actualType)}
              </p>
            </>
          )}
      </div>
    );
  };

  return (
    <section className="breadcrumb flex justify-center items-center md:h-[19rem] h-[19rem] opacity-90 shadow-black relative">
  
      <video
        className="absolute top-0 left-0 w-full h-full object-cover z-[-2] "
        autoPlay
        muted
        loop
        playsInline
        key={backgroundMedia}
      >
        <source src={backgroundMedia} type="video/mp4" />
      </video>

      <div
        className="absolute top-0 left-0 w-full h-full z-[-1]  "
        style={{
          background: "linear-gradient(#13693a, #13693a6e) ",
        }}
      />

      {searchFormCategory && !customBreadcrumbs ? (

        <div className="breadcrumb-inner w-full max-w-7xl mx-auto px-4 lg:px-10 relative z-10 grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] items-center gap-4 lg:gap-8">
          {/* <div className="w-full lg:w-fit order-2 lg:order-1 hidden lg:block lg:justify-self-start">
            <CategorySearchForm
              lockCategory
              presetCategory={searchFormCategory}
              presetType={searchFormType}
              variant="static"
            />
          </div> */}

          <div className="breadcrumb-content order-1 lg:order-2 flex flex-col items-center">
            {renderBreadcrumbLinks()}
            <p
              className="text-lightgreen md:text-5xl text-3xl font-bold text-center mt-3 uppercase"
              style={{ textShadow: "0 0 15px black" }}
            >
              {getMainTitle()}
            </p>
          </div>

          <div className="hidden lg:block order-3" aria-hidden="true" />
        </div>
      ) : (

        <div className="breadcrumb-content relative z-10">
          {renderBreadcrumbLinks()}
          <p
            className="text-lightgreen md:text-5xl text-3xl font-bold text-center mt-3 uppercase "
            style={{ textShadow: "0 0 15px black" }}
          >
            {getMainTitle()}
          </p>
        </div>
      )}
    </section>
  );
};

export default BreadCrumb;
