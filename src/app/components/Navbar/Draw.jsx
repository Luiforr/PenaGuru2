import React from "react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import penagurulogo from "../../../../public/PenaGuruRes.png";
import { Button, NavbarBrand, NavbarContent, Link, } from "@nextui-org/react";
import { FiMenu } from "react-icons/fi";
import { GoX } from "react-icons/go";
import { useState, useEffect } from "react";
import {
  TiSocialInstagram,
  TiSocialYoutube,
  TiSocialFacebook,
} from "react-icons/ti";
import Image from "next/image";
import { TfiWorld } from "react-icons/tfi";
import { useRouter } from "next/navigation";
import { supabase } from "../../config/supabase";
export default function Draw() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [placement, setPlacement] = useState("left");
  const router = useRouter();
  const [email, setEmail] = useState(null);
  const [userData, setUserData] = useState({
    email: "",
    nama_user: "",
  });
  useEffect(() => {
    async function ambilData() {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (user) {
          const { data, error } = await supabase
            .from("profiles")
            .select("*")
            .eq("email", user.email)
            .single();

          if (error) {
            console.error(error.message);
          } else {
            setEmail(data.email);
            setUserData(data);
          }
        } else {
          console.error("User data not found");
        }
      } catch (error) {
        console.error(error.message);
      }
    }
    ambilData();
  }, []);
  const handleHom = () => {
    router.push("/");
  };
  const handleYt = () => {
    router.push("#");
  };
  const handleFb = () => {
    router.push("#");
  };
  const handleWeb = () => {
    router.push("https://smkn7baleendah.sch.id/");
  };
  const handleIg = () => {
    router.push("https://www.instagram.com/duivions/");
  };
  const handleMe = () => {
    router.push("/me");
  };
  const handleLg = () => {
    router.push("/login");
  };
  const handleSign = () => {
    router.push("/register");
  };
  const handleStatis = () => {
    router.push("/me/statistik");
  };
  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      router.push("/login");
    } catch (error) {
      console.error("Error signing out:", error.message);
    }
  };

  return (
    <>
      <FiMenu
        size="2em"
        className="cursor-pointer sm:block md:block lg:hidden xl:hidden"
        onClick={onOpen}
      />
      <Drawer placement={placement} onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader
            borderBottomWidth="1px bg-black"
            className="bg-slate-200"
          >
            <NavbarContent className=" pr-3" justify="center">
              <NavbarBrand>
              <Link
              className="font-bold text-blue-500 cursor-pointer"
              onClick={handleHom}
            >
              <Image src={penagurulogo} width={100} />
            </Link>
              </NavbarBrand>
              <DrawerCloseButton
                className="cursor-pointer sm:block md:block lg:hidden xl:hidden"
                onClick={onClose}
              />
            </NavbarContent>
          </DrawerHeader>
          <DrawerBody className="bg-slate-200 ">
            <p
              className="cursor-pointer font-semibold text-lg mt-2"
              onClick={handleMe}
            >
              Profile
            </p>
            <p
              className="cursor-pointer font-semibold text-lg mt-2"
              onClick={handleLg}
            >
              Login
            </p>
            <p
              className="cursor-pointer font-semibold text-lg mt-2"
              onClick={handleSign}
            >
              Sign
            </p>
            <p
              className="cursor-pointer font-semibold text-lg mt-2"
              onClick={handleStatis}
            >
              Statistik
            </p>
            <p
              className="cursor-pointer font-semibold text-lg mt-2"
              onClick={handleLogout}
            >
              Logout
            </p>
            <p className="mt-96 text-lg font-bold">{userData.email}</p>
            <p className="text-lg font-semibold">123.456.789</p>
          </DrawerBody>
          <DrawerFooter className="bg-slate-200">
            <TfiWorld
              onClick={handleWeb}
              size="1.5em"
              className="cursor-pointer mr-1"
            />
            <TiSocialYoutube
              onClick={handleYt}
              size="2em"
              className="cursor-pointer mr-1"
            />
            <TiSocialInstagram
              onClick={handleIg}
              size="1.5em"
              className="cursor-pointer mr-48"
            />
            {/* <TiSocialFacebook
              onClick={handleFb}
              size="1.5em"
              className="cursor-pointer"
            /> */}
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
