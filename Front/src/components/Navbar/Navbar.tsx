"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { HiMenu, HiX } from "react-icons/hi";
import { IUserSession } from "@/interfaces/IUserSession";
import { usePathname, useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState<IUserSession | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);


  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const storedUserData = JSON.parse(localStorage.getItem("userSession") || "null")

      console.log("storedUserData : ", storedUserData);
      
      if (storedUserData) {
        setUserData(storedUserData)
        setIsAuthenticated(true)
      }
    }
  }, [pathname])


  const handleLogout = () => {
    localStorage.removeItem("userSession")
    Swal.fire({
      title: "Seguro que quieres salir?",
      text: "Vas a cerrar sesion",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, salir!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Session Cerrada!",
          text: "Hasta pronto!",
          icon: "success"
        });
      }
    });
    setUserData(null);
    setIsAuthenticated(false);
    // setCart([]); 
    
    router.push("/")

  }
  const Dropdown = () => {
    setShowDropdown(!showDropdown);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav
      className={`fixed z-10 top-0 w-full transition-all duration-500 ${isScrolled
          ? "bg-gradient-to-r from-green-900 to-green-700 opacity-90 lg:py-2"
          : "bg-gradient-to-r from-green-900 to-green-700 py-2 lg:py-4"
        }`}
    >
      <div className="container flex items-center justify-between mx-auto px-2 py-1 lg:px-4 lg:py-2">
        {/* Logo */}
        <div
          className={`text-white text-lg lg:text-3xl font-bold font-cinzel ${isScrolled ? "text-base lg:text-2xl" : ""
            }`}
        >
          <Link href="/Home">VICNASOL</Link>
        </div>

        {/* Links aligned to the center on large screens */}
        <ul
          className={`hidden lg:flex items-center space-x-6 text-white text-base lg:text-xl font-roboto ${isScrolled ? "text-[10px] lg:text-[18px] duration-700" : ""
            } mx-auto`}
        >
          <li className="hover:-translate-y-1 hover:underline">
            <Link href="/servicios">Servicios</Link>
          </li>
          <li className="hover:-translate-y-1 hover:underline">
            <Link href="/sobreNosotros">Sobre Nosotros</Link>
          </li>
          <li className="hover:-translate-y-1 hover:underline">
            <Link href="/contacto">Contacto</Link>
          </li>
          <li className="hover:-translate-y-1 hover:underline">
            <Link href="/gardener">Lista de Jardineros</Link>
          </li>
          {
            userData?.user.role === "admin" && (
              <li className="hover:-translate-y-1 hover:underline">
              <Link href="/registerService">Registrar un nuevo servicio</Link>
            </li>
            )
          }  
         
        </ul>


        {/* Mobile menu icon */}
        <div className="lg:hidden">
          <button onClick={toggleMenu} className="text-white text-lg lg:text-3xl">
            {isMenuOpen ? <HiX /> : <HiMenu />}
          </button>
        </div>

        {isMenuOpen && (
          <ul className="absolute top-16 right-4 bg-green-700 text-white text-base lg:text-xl font-roboto space-y-4 p-4 rounded-lg lg:hidden">
            <li className="hover:-translate-y-1 hover:underline">
              <Link href="services">Servicios</Link>
            </li>
            <li className="hover:-translate-y-1 hover:underline">
              <Link href="aboutUs">Sobre Nosotros</Link>
            </li>
            <li className="hover:-translate-y-1 hover:underline">
              <Link href="/contact">Contacto</Link>
            </li>
            <li className="hover:-translate-y-1 hover:underline">
            <Link href="/gardener">Lista de Jardineros</Link>
          </li>
            <li className="hover:-translate-y-1 hover:underline">
              <Link href="/register">Registrarme</Link>
            </li>
            <li className="hover:-translate-y-1 hover:underline">
              <Link href="/login">Ingresar</Link>
            </li>
          </ul>
        )}


        {/* Renderizado condicional basado en si el usuario está autenticado */}
        {isAuthenticated && userData?.token ? (
          <div className="relative user-menu">
            <div
              className="flex items-center space-x-2 cursor-pointer"
              onClick={Dropdown}
            >
              <span>{userData?.user?.name || 'My Account'}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
            </div>

            {/* Menú desplegable */}
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 text-black z-50">
                <Link href="/dashboard">
                  <div className="block px-4 py-2 hover:bg-gray-100">Mi Cuenta</div>
                </Link>
                <button
                  className="block px-4 py-2 hover:bg-gray-100 w-full text-left"
                  onClick={handleLogout}
                >
                  Cerrar sesión
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="relative user-menu">
            <div className="cursor-pointer" onClick={Dropdown}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
            </div>

            {/* Menú desplegable para usuarios no autenticados */}
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 text-black z-50">
                <Link href="/login">
                  <div className="block px-4 py-2 hover:bg-gray-100">Ingresar</div>
                </Link>
                <Link href="/register">
                  <div className="block px-4 py-2 hover:bg-gray-100">Registrarme</div>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>



      {/* 
{/*         
           {/* Buttons for Register and Login */}
      {/* <div className="hidden lg:flex space-x-4"> */}
      {/* <Link href="/register">
            <button className="px-4 py-2 bg-blue-600 text-white font-bold rounded hover:bg-blue-700">
              Register
            </button>
          </Link>
          <Link href="/login">
            <button className="px-4 py-2 bg-green-600 text-white font-bold rounded hover:bg-green-700">
              Login
            </button>
          </Link> */}
      {/* </div>  */}


    </nav>
  );
}
