  

import { TbHomeFilled } from "react-icons/tb";
import { RiHeart2Fill } from "react-icons/ri";
import { RiStickyNoteAddFill } from "react-icons/ri";
import { TiUser } from "react-icons/ti";
import { IoAdd } from "react-icons/io5";
import { getWishList } from "../../services/api/wishlistApi";
import { useQuery } from "@tanstack/react-query";
import { Link, NavLink, useLocation } from "react-router-dom";
import BASE_URL from "../../../config";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import toastError from "../../assets/images/toastError.jpg";
import { setTriggerLogin } from "../../redux/features/Auth/AuthSlice";

const MobileScreenNav = () => {
  const wislistItems = useSelector((state) => state.wishlistings.wishlist)

  const [activeNav, setActiveNav] = useState(1);
  const handleActiveNav = (num) => {
    setActiveNav(num);
  };

  const dispatch = useDispatch();

  const authState = useSelector((state) => state.auth);

  const notLoggedInMsg = () => {
    toast.error(
      "You are not logged in !!",
      {
        duration: 4000,
        style: {
          
          boxShadow: '0 0  25px #9c0a0d',
          padding: '16px',
          fontSize: '18px',
          color: 'white',

          background: `url(${toastError}) no-repeat center/cover`,
          borderRadius: '8px',
        },
      }
    )
  }

  return (
    <div className="mobile-nav flex justify-between border-t border-t-gray-300 gap-5 text-2xl fixed md:-bottom-[100%] bottom-0 md:-z-50 z-50 bg-white px-10 py-5 rounded-t-3xl shadow-xl w-full left-1/2 -translate-x-1/2">
      <div className="left_nav_menus flex items-center gap-10">

        <div className="mobile-nav__menus relative" onClick={() => handleActiveNav(1)}>
          <Link to={`${BASE_URL}/`} className={activeNav === 1 ? "active" : ""}>
            <TbHomeFilled />
          </Link>
        </div>

        {
          authState?.isLoggedIn ?
            (
              <div className="mobile-nav__menus relative" onClick={() => handleActiveNav(2)}>
                <Link to={`${BASE_URL}/wishlist`} className={activeNav === 2 ? "active" : ""}>
                  <span className="wishlist--count bg-darkGreen text-white px-2 rounded-full absolute text-[12px] h-[15px] aspect-square -top-1 left-4 flex justify-center items-center">
                    {wislistItems?.length}
                  </span>
                  <RiHeart2Fill />
                </Link>
              </div>
            )
            :
            (
              <div className="mobile-nav__menus relative" onClick={() => {
                notLoggedInMsg();
                dispatch(setTriggerLogin(true));
              }
              }>
                <Link to="#" className={activeNav === 2 ? "active" : ""}>
                  <RiHeart2Fill />
                </Link>
              </div>
            )
        }

      </div>
      <div className="mobile-nav__menus mobile-nav__sell--rent--btn text-3xl absolute left-1/2 -translate-x-1/2 -top-6">
        <a href="#">
          <IoAdd />
        </a>
      </div>
      <div className="right_nav_menus flex items-center gap-10">
        {
          authState?.isLoggedIn ?
            (<div className="mobile-nav__menus relative pointer-events-none" onClick={() => handleActiveNav(3)}>
              <Link to={`${BASE_URL}/sell-product`} className={activeNav === 3 ? "active" : ""}>
                <RiStickyNoteAddFill />
              </Link>
            </div>)
            :
            (<div className="mobile-nav__menus relative pointer-events-none" onClick={() => {
              notLoggedInMsg();
              dispatch(setTriggerLogin(true));
            }}>
              <Link to="#" className={(activeNav === 3 ? "active" : "")}>
                <RiStickyNoteAddFill />
              </Link>
            </div>)
        }

        {
          authState?.isLoggedIn ?
            (
              <div className="mobile-nav__menus relative" onClick={() => handleActiveNav(4)}>
                <Link to={`${BASE_URL}/profile`} className={activeNav === 4 ? "active" : ""}>
                  <TiUser />
                </Link>
              </div>
            )
            :
            (
              <div className="mobile-nav__menus relative" onClick={() => {
                notLoggedInMsg();
                dispatch(setTriggerLogin(true));
              }}>
                <Link to="#" className={activeNav === 4 ? "active" : ""}>
                  <TiUser />
                </Link>
              </div>
            )
        }


      </div>
    </div >
  );
};

export default MobileScreenNav;
