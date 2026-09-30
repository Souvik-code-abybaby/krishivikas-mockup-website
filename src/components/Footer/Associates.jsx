import associate1 from "../../assets/footer/associates-1.png";
import associate2 from "../../assets/footer/associates-2.png";
import associate3 from "../../assets/footer/associates-3.png";
import associate4 from "../../assets/footer/associates-4.png";
import associate5 from "../../assets/footer/associates-5.png";
import associate6 from "../../assets/footer/associates-6.png";

const Associates = () => {
  return (
    <>
      <div className="associates bg-[#ebebeb]  shadow border-t ">
        <div className="container grid grid-cols-6 justify-between items-center">
          <img src={associate6} alt="asssiates-logo" className="assciates__logo max-w-[90%] h-auto mx-auto" height={200} width={200} />
          <img src={associate1} alt="asssiates-logo" className="assciates__logo max-w-[90%] h-auto mx-auto md:px-2" height={200} width={200} />
          <img src={associate4} alt="asssiates-logo" className="assciates__logo max-w-[90%] h-auto mx-auto" height={200} width={200} />
          <img src={associate2} alt="asssiates-logo" className="assciates__logo max-w-[90%] h-auto mx-auto md:pt-4 pt-1" height={200} width={200} />
          <img src={associate3} alt="asssiates-logo" className="assciates__logo max-w-[90%] h-auto mx-auto md:p-5 px-2" height={200} width={200} />
          <img src={associate5} alt="asssiates-logo" className="assciates__logo max-w-[90%] h-auto mx-auto md:p-5 px-2" height={200} width={200} />
        </div>
      </div>
    </>
  );
};

export default Associates;
