

import BreadCrumb from "../components/BreadCrumb"; 
// import LeftAbout from "../assets/images/left-about.webp";
import LeftAbout from "../../src/assets/left-about.webp"
import RightAbout from "../../src/assets/right-about.webp";
import { useTranslation } from "react-i18next";
import { SiComma } from "react-icons/si";
import { useEffect } from "react";
const AboutUs = () => {
    const { t } = useTranslation();
         useEffect(() => {
                window.scrollTo(0, 0);
              }, []);
    return (
        <main className="container">
          
            <BreadCrumb 
                pageTitle={t('about us')}
                customBreadcrumbs={['about us']}
            />
            
            {/* <section className="about-us container md:p-5 p-5 my-10"> */}
                <div className="relative mt-10">
                    <div className="icon-comma absolute -top-10 flex text-black rotate-180 text-6xl  -left-5">
                        <SiComma className="text-lightgreen" />
                        <SiComma className="text-darkGreen -ms-6" />
                    </div>
                    <h1 className=" border border-darkGreen p-5 text-darkGreen rounded-2xl">
                        Krishi Vikas Udyog is the first one-stop solution for the farming community scattered across the country, by connecting buyers and sellers of Agri-products and equipment through technology ( Mobile and Desktop Application). We help farmers to Buy, Sell, Finance, Insure and Service New/Used tractors and every kind of farm equipment.

                        This platform is created to solve the Agri-crisis to healthy Agri-culture and improve with every decision making, thereby making it convenient for them to solve their occupation-related requirements by providing them access to those having relevant solutions – Peer to Peer or B2C.

                        We have created an ecosystem on the back of technology, shared economy and useful content, that connects the demand side of agriculture to its supply side, we have created a wide range of variety categorization from tractors to seeds, from fertilizer to implements where people from all walks can either buy, sell or rent as per their need with our user-friendly Krishi Vikas Udyog Application.
                    </h1>
                    <div className="icon-comma absolute -right-5 flex text-black text-6xl -bottom-10">
                        <SiComma className="text-lightgreen" />
                        <SiComma className="text-darkGreen -ms-6" />
                    </div>
                </div>

                <div className="about-brief my-5 p-5">
                    <div className="grid md:grid-cols-2 grid-cols-1 gap-10 items-center">
                        <img src={LeftAbout} alt="farmer farming" className="rounded-3xl" />
                        <div className="about-brief-1">
                            <h2 className="text-lightgreen text-3xl font-semibold mb-5">Krishi Vikas Udyog to Fulfill Farmer's Dreams.</h2>
                            <p className="text-xl font-light italic">Krishi Vikas Udyog considered Indian farmers as the most important backbone of Indian society. That's why we show complete information in every separate section so that you can get every farm information comfortably sitting at home. We aim to revolutionise the Indian tractor industry by bringing transparency to pricing, information and comparison of tractors, farm equipment and related financial products.</p>
                        </div>
                    </div>
                    <div className="grid md:grid-cols-2 grid-cols-1 gap-10 items-center mt-10">
                        <div className="about-brief-1">
                            <h2 className="text-lightgreen text-3xl font-semibold mb-5">Krishi Vikas Udyog- Solution at your fingertip.</h2>
                            <p className="text-xl font-light italic">We aim to provide all information related to farming to every part of India. Download our Krishi Vikas Udyog Application and get exciting offers, deals, expert reviews, videos and a lot of agriculture-related things. We provide you with a one-stop solution to all your farming needs and queries.

                                Our mission is to provide an easy solution to tractor buying or selling, fertilizers, seeds and every farming product. Through Krishi Vikas Udyog, we aim to empower Indian farmers with exhaustive and unbiased information on farming products through expert reviews, owner reviews, detailed specifications and comparisons.

                                We understand that farmers are one of the essential parts of having a thriving country.</p>

                        </div>
                        <img src={RightAbout} alt="farmer farming" className="rounded-3xl" />
                    </div>

                </div>
            {/* </section> */}
        </main>
    )
}

export default AboutUs;
