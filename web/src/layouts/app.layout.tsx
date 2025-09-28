import { useEffect, useRef, useState } from "react";
import { MainLayout } from "./main.layout";
import { SidebarLayout } from "./sidebar.layout";
import { useAuth } from "../hooks/useAuth";
import { translateRole } from "../utils/translate-role";
import { getInitials } from "../utils/get-name-initials";
import { Link } from "react-router";
import CircleUserSVG from "../assets/icons/circle-user.svg";
import LogoutSVG from "../assets/icons/log-out.svg";
import MenuSvg from "../assets/icons/menu.svg";
import CloseSvg from "../assets/icons/x.svg";
import LogoIconSvg from "../assets/img/Logo_IconLight.svg";
import { SidebarMobileLayout } from "./sidebar-mobile.layout";

export function AppLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const { session, remove } = useAuth();
  const sidebarRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const profileMenuRef = useRef<HTMLDivElement>(null);
  const profileButtonRef = useRef<HTMLDivElement>(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsSidebarOpen(false);
      }
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target as Node) &&
        profileButtonRef.current &&
        !profileButtonRef.current.contains(event.target as Node)
      ) {
        setIsProfileMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sidebarRef, buttonRef, profileMenuRef, profileButtonRef]);

  return (
    <div className="flex flex-col md:grid md:grid-cols-[200px_1fr] w-full min-h-screen bg-gray-100 overflow-x-hidden">
      <div className="hidden md:block">
        <SidebarLayout />
      </div>

      {/* Cabeçalho e botão do menu hambúrguer para mobile */}
      <header className="flex items-center p-4 md:hidden">
        <button
          ref={buttonRef}
          onClick={toggleSidebar}
          className="p-3 text-white focus:outline-none bg-gray-200 rounded-md mr-4"
        >
          {isSidebarOpen ? (
            <img
              src={CloseSvg}
              alt="close menu"
              className="w-[20px] h-[20px]"
            />
          ) : (
            <img src={MenuSvg} alt="menu" className="w-[20px] h-[20px]" />
          )}
        </button>
        <div className="flex-grow flex items-center gap-3">
          <img src={LogoIconSvg} alt="logo" className="w-[32px] h-[32px]" />
          <div>
            <h1 className="text-white font-lato text-base font-bold">
              HelpDesk
            </h1>
            <p className="text-blue-light font-lato uppercase font-bold text-xs">
              {translateRole(session?.user.role)}
            </p>
          </div>
        </div>
        <div className="relative">
          <div
            ref={profileButtonRef}
            onClick={toggleProfileMenu}
            className="bg-blue-dark w-[32px] h-[32px] text-gray-600 rounded-2xl flex items-center justify-center cursor-pointer"
          >
            {getInitials(session?.user.name)}
          </div>
          {isProfileMenuOpen && (
            <div
              ref={profileMenuRef}
              className="absolute right-0 top-full mt-2 w-40 bg-gray-100 rounded-md shadow-lg z-50 py-5"
            >
              <div className="text-gray-400 font-bold text-xs font-lato p-4 border-b border-gray-300">
                Opções
              </div>
              <Link
                to={"/"}
                className="text-gray-600 text-xs font-lato flex gap-2 mt-4 ml-3"
              >
                <img
                  src={CircleUserSVG}
                  alt="profile-icon"
                  className="w-[20px] h-[20px]"
                />
                <span className="text-sm font-lato">Perfil</span>
              </Link>
              <button
                onClick={() => {
                  remove();
                }}
                className="ml-3 text-feedback-danger text-sm font-lato flex items-center gap-2 mt-5"
              >
                <img
                  src={LogoutSVG}
                  alt="logout-icon"
                  className="w-[20px] h-[20px]"
                />
                <p>Sair</p>
              </button>
            </div>
          )}
        </div>
      </header>

      <div
        ref={sidebarRef}
        className={`fixed left-0 w-[220px] h-[280px] z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ top: "64px" }}
      >
        <SidebarMobileLayout />
      </div>
      <MainLayout />
    </div>
  );
}
