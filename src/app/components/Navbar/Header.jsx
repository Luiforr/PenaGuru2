"use client";
import { useState } from "react";
import { RiStackFill } from "react-icons/ri";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  RadioGroup,
  Stack,
  Radio,
} from "@chakra-ui/react";
import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenuItem,
  NavbarMenu,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Text,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { FaUserCheck } from "react-icons/fa";
import { FaUserGear } from "react-icons/fa6";
import { RiAdminLine } from "react-icons/ri";
import Directory from "./Directory";
import DrawerNav from "./DrawerNav";
import Draw from "./Draw";
import penagurulogo from "../../../../public/PenaGuruRes.png";
import Image from "next/image";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [placement, setPlacement] = useState("left");
  const router = useRouter();
  const menuItems = [
    "me",
    "Dashboard",
    "Activity",
    "Analytics",
    "System",
    "Deployments",
    "My Settings",
    "Team Settings",
    "Help & Feedback",
    "Log Out",
  ];

  const handleLoginClick = () => {
    router.push("/login");
  };

  const handleSignUpClick = () => {
    router.push("/register");
  };

  const handleGuru = () => {
    router.push("/me/edit");
  };

  const handleStaff = () => {
    router.push("/me/editstaff");
  };

  const handleAdmin = () => {
    router.push("/me/editadmin");
  };

  const handleHome = () => {
    router.push("/");
  };

  return (
    <>
      <Navbar
        isBordered
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen}
      >
        <Draw />
        <NavbarContent className="sm:hidden pr-3" justify="start">
          <NavbarBrand>
            <Link
              className="font-bold text-blue-500 cursor-pointer"
              onClick={handleHome}
            >
              <Image src={penagurulogo} width={100} />
            </Link>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden sm:flex">
          <NavbarBrand>
            <Link
              className="font-bold text-blue-500 cursor-pointer ease-out duration-200"
              onClick={handleHome}
            >
              <Image src={penagurulogo} width={100} />
            </Link>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden sm:flex gap-10" justify="center">
          <NavbarItem>
            <Link
              className="underline-offset-8 hover:cursor-pointer transition hover:underline hover:ease-out duration-300 hover:scale-110 hover:text-sky-500 active:text-black"
              href="/me"
              underline=""
            >
              Presensi
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link
              className="underline-offset-8 hover:cursor-pointer transition hover:underline hover:ease-out duration-300 hover:scale-110 hover:text-sky-500 active:text-black"
              href="/me/statistik"
              aria-current="page"
              underline=""
            >
              Statistik
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link
              className="underline-offset-8 hover:cursor-pointer transition hover:underline hover:ease-out duration-300 hover:scale-110 hover:text-sky-500 active:text-black"
              href="/contact"
              underline=""
            >
              Contact Us
            </Link>
          </NavbarItem>
        </NavbarContent>

        <NavbarContent justify="end">
          <NavbarItem className="hidden lg:flex">
            <Button
              onClick={handleLoginClick}
              className="bg-sky-500 hover:cursor-pointer transition hover:ease-out duration-300 hover:bg-sky-400 active:bg-sky-500 hover:scale-105 text-white border-1 active:scale-100"
              variant="shadow"
            >
              Login
            </Button>
          </NavbarItem>
          <NavbarItem>
            <Dropdown>
              <DropdownTrigger>
                <Button
                  className="bg-sky-500 hover:cursor-pointer transition hover:ease-out duration-300 hover:scale-105 text-white border-1 active:scale-100 hover:bg-sky-400 active:bg-sky-500"
                  href="#"
                  variant="shadow"
                >
                  Member
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Static Actions">
                <DropdownItem
                  onClick={handleSignUpClick}
                  className="text-bold"
                  key="news"
                >
                  Buat Akun (Click Me)
                </DropdownItem>
                <DropdownItem
                  onClick={handleGuru}
                  key="new"
                  startContent={<FaUserCheck />}
                >
                  Edit Guru
                </DropdownItem>
                <DropdownItem
                  onClick={handleStaff}
                  key="copy"
                  startContent={<FaUserGear />}
                >
                  Edit Staffs
                </DropdownItem>
                <DropdownItem
                  onClick={handleAdmin}
                  key="edit"
                  startContent={<RiAdminLine />}
                >
                  Edit Admin
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarItem>
        </NavbarContent>

        <NavbarMenu>
          {menuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                className="w-full"
                color={
                  index === 2
                    ? "warning"
                    : index === menuItems.length - 1
                    ? "danger"
                    : "purple"
                }
                href={item}
                size="lg"
              >
                {item}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>
    </>
  );
}