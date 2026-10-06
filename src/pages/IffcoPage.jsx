


import { useQuery } from "@tanstack/react-query";
import MobileScreenNav from "../components/header/MobileScreenNav";
import { getCompanyDealers, getCompanyProduct } from "../services/api/companyApi";
import iffcoLogo from "../assets/images/IFFCO-LOGO.jpg";
import Preloader from "../components/elements/Preloader";
import BreadCrumb from "../components/elements/BreadCrumb"; // Added dynamic breadcrumb
import { MdOutlineCurrencyRupee } from "react-icons/md";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router-dom";
import BASE_URL from "../../config";
import { useContext, useEffect } from "react";
import { CompanyDataContext } from "../context/CompanyData/CompanyDataContext";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const Iffcopage = () => {
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();
  const { companyId } = useParams();

  // console.log(companyId);

  const { companyLogo } = useContext(CompanyDataContext);

  // Helper function to map company IDs to dealer IDs
  const getDealerId = (companyId) => {
    switch(companyId) {
      case "4":
      case "5":
        return "2";
      case "9":
        return "3";
      case "11":
        return "1";
      default:
        return companyId;
    }
  };

  const { data: companyProducts, isLoading: iffcoProductLoading } = useQuery({
    queryKey: ["company-product", companyId, token],
    queryFn: () => getCompanyProduct(companyId, token),
  });

  const { data: companyDealers } = useQuery({
    queryKey: ["company-dealers", companyId, token],
    queryFn: () => getCompanyDealers(getDealerId(companyId), token),
  });

  const { companyDealerData, setCompanyDealerData } = useContext(CompanyDataContext);
  setCompanyDealerData(companyDealers);
  // console.log(iffcoDealerData);

  // console.log(iffcoDealers);

  const { t } = useTranslation();
  
  return (
    <>
      {/* <MobileScreenNav /> */}
      
      {/* Dynamic BreadCrumb Component - automatically shows video for non-category pages */}
      <BreadCrumb 
        pageTitle={t('Company Product')}
        customBreadcrumbs={['Company Product']}
      />

      <main className="iffco-product-page container my-5">
        {iffcoProductLoading ? (
          <Preloader />
        ) : (
          <section className="iffco-products p-5 grid lg:grid-cols-4 grid-cols-2 md:px-5 gap-x-5">
            {companyProducts &&
              companyProducts.map((item) => (
                <Drawer key={item.id}>
                  <DrawerTrigger>
                    <div className="iffco-product-card rounded-3xl overflow-hidden bg-white shadow mb-4 flex flex-col justify-between hover:scale-95 transition-[0.3s]">
                      <img
                        src={item.product_image}
                        alt="iffco-image"
                        className={companyId === "4" || companyId === "5" ?
                          "md:h-[300px] h-[150px] w-full object-cover object-center p-2 rounded-3xl"
                          :
                          "md:h-[300px] h-[150px] w-full object-contain object-center p-5"
                        }
                      />
                      <div className="iffco-logo text-end px-5">
                        <img
                          src={item.company_logo}
                          alt="this is iffco logo"
                          className="md:w-[80px] w-[60px] ms-auto rounded-lg"
                        />
                      </div>
                      <p className="md:text-md mt-3 text-sm text-center bg-lightdark text-white px-4 py-4 iffco-product-title truncate">
                        {item.product_name}
                      </p>
                    </div>
                  </DrawerTrigger>
                  <DrawerContent>
                    <div className="container h-[400px] overflow-y-auto">
                      <div className="grid lg:grid-cols-2 grid-cols-1">
                        <img
                          src={item.product_image}
                          alt="iffco product image"
                          className="lg:h-[400px] h-[250px] mx-auto p-5"
                        />
                        <div className="iffco-product-details p-5">
                          <DrawerHeader>
                            <DrawerTitle className="text-darkGreen text-lg lg:text-3xl">
                              {item.product_name}
                            </DrawerTitle>
                          </DrawerHeader>
                          <p className="">{item.description}</p>
                          {
                            Math.ceil(item.price) !== 0 ? 
                            <p className="my-4 text-darkGreen text-xl">{t('PRICE')} : <MdOutlineCurrencyRupee className="inline-block mb-1 " />{item.price}</p>
                            : null
                          }
                        </div>
                      </div>
                    </div>

                    <DrawerFooter className="text-center">
                      <Button 
                        className="uppercase w-[300px] mx-auto bg-gradient-green" 
                        onClick={() => { 
                          navigate(`${BASE_URL}/company-dealers/${getDealerId(companyId)}`) 
                        }}
                      >
                        {t('Show All Dealers')}
                      </Button>
                      <DrawerClose>
                        <Button variant="outline">{t('close')}</Button>
                      </DrawerClose>
                    </DrawerFooter>
                  </DrawerContent>
                </Drawer>
              ))}
          </section>
        )}
      </main>
    </>
  );
};

export default Iffcopage;
