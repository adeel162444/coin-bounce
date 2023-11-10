import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styles from "./NavBar.module.css";
import axios from "axios";
import { loggedInUserDetails } from "../protected/Protected";
import { useDispatch, useSelector } from "react-redux";
import { resetLoggedInUser } from "../../store/slices/userSlice";
const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => {
    return state.user;
  });

  const logoutApi = async () => {
    try {
      const serverPth = import.meta.env.VITE_SERVER_BASE_PATH;
      const { data } = await axios.post(
        `${serverPth}/api/user/logout`,
        {},
        {
          withCredentials: true,
        }
      );

      console.log("logout data", data);
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    // <!-- Main navigation container -->
    <nav class="flex-no-wrap relative flex w-full items-center justify-between  py-2 shadow-md shadow-black/5 dark:bg-neutral-600 dark:shadow-black/10 lg:flex-wrap lg:justify-start lg:py-4">
      <div class="flex w-full flex-wrap items-center justify-between px-3">
        {/* <!-- Hamburger button for mobile view --> */}
        <button
          class="block border-0 bg-transparent px-2 text-neutral-500 hover:no-underline hover:shadow-none focus:no-underline focus:shadow-none focus:outline-none focus:ring-0 dark:text-neutral-200 lg:hidden"
          type="button"
          data-te-collapse-init
          data-te-target="#navbarSupportedContent1"
          aria-controls="navbarSupportedContent1"
          aria-expanded={isMenuOpen}
          aria-label="Toggle navigation"
          onClick={toggleMenu}
        >
          {/* <!-- Hamburger icon --> */}
          <span class="[&>svg]:w-7">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="h-7 w-7"
            >
              <path
                fill-rule="evenodd"
                d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
                clip-rule="evenodd"
              />
            </svg>
          </span>
        </button>

        {/* <!-- Collapsible navigation container --> */}
        <div
          class={`!visible ${
            isMenuOpen ? "block" : "hidden"
          } flex-grow basis-[100%] items-center lg:!flex lg:basis-auto `}
          id="navbarSupportedContent1"
          data-te-collapse-item
        >
          {/* <!-- Logo --> */}
          <a
            class="mb-4 ml-2 mr-5 mt-3 flex items-center text-neutral-900 hover:text-neutral-900 focus:text-neutral-900 dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:text-neutral-400 lg:mb-0 lg:mt-0"
            href="#"
          ></a>
          {/* <!-- Left navigation links --> */}
          <ul
            class="list-style-none mx-auto flex flex-col pl-0 w-11/12 justify-around lg:flex-row"
            data-te-navbar-nav-ref
          >
            <li class="mb-4 lg:mb-0 lg:pr-2" data-te-nav-item-ref>
              {/* <!-- Dashboard link --> */}
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? styles.active : styles.inActive
                }
              >
                Home
              </NavLink>
            </li>

            {/* <!-- Team link --> */}
            <li class="mb-4 lg:mb-0 lg:pr-2" data-te-nav-item-ref>
              <NavLink
                to="/crypto"
                className={({ isActive }) =>
                  isActive ? styles.active : styles.inActive
                }
              >
                CryptoCurrencies
              </NavLink>
            </li>
            {/* <!-- Projects link --> */}
            <li class="mb-4 lg:mb-0 lg:pr-2" data-te-nav-item-ref>
              <NavLink
                to="/blogs"
                className={({ isActive }) =>
                  isActive ? styles.active : styles.inActive
                }
              >
                Blogs
              </NavLink>
            </li>
            <li class="mb-4 lg:mb-0 lg:pr-2" data-te-nav-item-ref>
              <NavLink
                to="/sblog"
                className={({ isActive }) =>
                  isActive ? styles.active : styles.inActive
                }
              >
                Submit a Blog
              </NavLink>
            </li>
            {user?.success ? (
              <li class="mb-4 lg:mb-0 lg:pr-2" data-te-nav-item-ref>
                <NavLink onClick={logoutApi} className={styles.inActive}>
                  Logout
                </NavLink>
              </li>
            ) : user ? (
              <>
                <li class="mb-4 lg:mb-0 lg:pr-2" data-te-nav-item-ref>
                  <NavLink
                    to="/login"
                    className={({ isActive }) =>
                      isActive ? styles.active : styles.inActive
                    }
                  >
                    Login
                  </NavLink>
                </li>
                <li class="mb-4 lg:mb-0 lg:pr-2" data-te-nav-item-ref>
                  <NavLink
                    to="/signup"
                    className={({ isActive }) =>
                      isActive ? styles.active : styles.inActive
                    }
                  >
                    Sign Up
                  </NavLink>
                </li>
              </>
            ) : (
              <></>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
