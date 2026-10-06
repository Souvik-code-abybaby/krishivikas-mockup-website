import { createContext, useState } from "react";

const CompanyDataContext = createContext();

const CompanyDataProvider = ({ children }) => {

    const [companyDealerData, setCompanyDealerData] = useState([]);
    const [companyLogo, setCompanyLogo] = useState("");
    return (
        <CompanyDataContext.Provider value={{companyDealerData, setCompanyDealerData, companyLogo, setCompanyLogo}}>
            {children}
        </CompanyDataContext.Provider>
    )
}

export {CompanyDataContext ,CompanyDataProvider}
