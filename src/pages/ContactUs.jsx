

import toast from "react-hot-toast";
import BASE_URL from "../config";
import { useNavigate } from "react-router-dom";
import kvBanner from "../../src/assets/KV bnr.jpg";
import BreadCrumb from "../components/BreadCrumb";
import { useTranslation } from "react-i18next";
import { BsFillSendFill } from "react-icons/bs";
import { useEffect } from "react";
const ContactUs = () => {
         useEffect(() => {
                window.scrollTo(0, 0);
              }, []);
    const scriptURL = 'https://script.google.com/macros/s/AKfycbwiaiaCo_E-WLM3jva6reqJM2cd4t5EtUQby00TZY735H0AKhbNvzVyK9Z8Qobc0j67/exec';
console.log("contcat page mounted");
    const navigate = useNavigate();
    const { t } = useTranslation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        toast('Submitting...', '#333');

        const form = e.target;
        try {
            const response = await fetch(scriptURL, {
                method: 'POST',
                body: new FormData(form),
            });

            if (response.ok) {
                toast.success('Your data is successfully submitted', '#4CAF50');
                form.reset();
                setTimeout(() => {
                    navigate(`${BASE_URL}/contact`);
                }, 1000);
            } else {
                const errorText = await response.text();
                throw new Error(errorText);
            }
        } catch (error) {
            toast.error(`Error: ${error.message}`, '#F44336');
        }
    };

    return (
        <main className="conatainer">
            {/* Dynamic BreadCrumb Component - automatically shows video for non-category pages */}
            <BreadCrumb 
                pageTitle={t('contact us')} 
                customBreadcrumbs={['contact us']} 
            />

            <section id="contact" className="contact my-5">
                <div className="container " data-aos="fade-up">
                    {/* <div>
                        <img
                            src={kvBanner}
                            alt="kv-contact"
                            className="img-fluid w-full rounded-3xl"
                        />
                    </div> */}

                    <div className="row mt-5">
                        <div className="col-lg-4">
                            <div className="info grid md:grid-cols-3 grid-cols-1 shadow bg-white p-5 rounded-3xl">
                                <div className="address mb-4">
                                    <i className="fa-solid fa-location-dot text-xl"></i>
                                    <h4 className="font-semibold text-lg">Location:</h4>
                                    <p className="pe-5">Ground Floor, 4B, Rani Bhabani Rd, Sahanagar, Kalighat, Kolkata, West Bengal 700026</p>
                                </div>

                                <div className="email mb-4">
                                    <i className="fa-solid fa-envelope text-xl"></i>
                                    <h4 className="font-semibold text-lg">Email:</h4>
                                    <p>support@krishivikas.com</p>
                                </div>

                                <div className="phone">
                                    <i className="fa-solid fa-phone-volume text-xl"></i>
                                    <h4 className="font-semibold text-lg">Call:</h4>
                                    <p>8100975657</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-8 mt-5 mt-lg-0 bg-white p-5 rounded-3xl shadow">
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            name="name"
                                            className="form-control block w-full border rounded py-2 px-3"
                                            placeholder="Your Name"
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type="number"
                                            name="phone_no"
                                            className="form-control block w-full border rounded py-2 px-3"
                                            placeholder="Your Phone No."
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <select
                                            className="form-select block w-full border rounded py-2 px-3 text-gray-500"
                                            name="business_category"
                                            required
                                        >
                                            <option value="">Select Business Type</option>
                                            <option value="Dealer">Dealer</option>
                                            <option value="Exchanger">Exchanger</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            name="city"
                                            className="form-control block w-full border rounded py-2 px-3"
                                            placeholder="Enter City"
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type="number"
                                            name="pincode"
                                            className="form-control block w-full border rounded py-2 px-3"
                                            placeholder="Enter Pincode"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="text-center mt-3">
                                    <button
                                        type="submit"
                                        className="px-6 py-2 bg-gradient-to-r from-[#13693a] via-[#8cbf44] to-[#13693a] text-white rounded hover:via-[#13693a] bg-gradient-green"
                                    >
                                       <BsFillSendFill className="inline"/> Send Message
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        
        </main>
    )
}

export default ContactUs;
