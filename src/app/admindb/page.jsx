"use client";
// pages/admin-dashboard.js
import { BiSolidDashboard } from "react-icons/bi";
import { TbBell } from "react-icons/tb";
import { useEffect, useState } from "react";
import { supabase } from "../config/supabase.js";
import { MdCoPresent } from "react-icons/md";
import { RiAdminFill } from "react-icons/ri";
import { FcStatistics } from "react-icons/fc";
import { MdHistory } from "react-icons/md";
import { BsFillTelephoneFill } from "react-icons/bs";
import { useRouter } from "next/navigation";
import { Button, Input, Card, CardHeader } from "@nextui-org/react";
import TeacherCard from "../components/Guru/TeacherCard.jsx";
import moment from "moment";
import { Flex } from "@chakra-ui/react";
import { FaHistory, FaUserEdit, FaRegEdit } from "react-icons/fa";
import Link from "next/link";
import { MdOutlineMarkEmailUnread } from "react-icons/md";
import { BsFillPersonLinesFill, BsTelephoneInboundFill  } from "react-icons/bs";
import AdminRouteProtection from "../components/Admin/AdminRouterProtection.jsx";
import BottomNavigation from "../components/Mobile/BotNav.jsx";
import { FcAcceptDatabase } from "react-icons/fc";
import { Divider } from "@nextui-org/react";
const AdminDashboard = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [dataAdmin, setDataAdmin] = useState({
    nama_user: "",
    jenis_user: "",
  });
  const [userEmail, setUserEmail] = useState(null);
  const [teachers, setTeachers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const isTeacherOnline = (lastActivity) => {
    if (lastActivity === null) {
      return false;
    }

    const currentTime = moment();
    const activityTime = moment(lastActivity);
    const thresholdMinutes = 15;

    return currentTime.diff(activityTime, "minutes") <= thresholdMinutes;
  };

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const { data, error } = await supabase.from("profiles").select("*");

        if (error) {
          console.error("Error fetching teachers:", error.message);
        } else {
          setTeachers(data);
        }
      } catch (error) {
        console.error("Error fetching teachers:", error.message);
      }
    };

    const channel = supabase
      .channel("presence:teachers")
      .on("UPDATE", (payload) => {
        // Handle the update event for the 'profiles' table
        console.log("Profile updated:", payload);

        const updatedTeacher = payload.new;
        setTeachers((prevTeachers) =>
          prevTeachers.map((teacher) =>
            teacher.id === updatedTeacher.id ? updatedTeacher : teacher
          )
        );
      })
      .subscribe();

    const checkAdminAccess = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        setUserEmail(user.email);

        const { data: adminData, error: adminError } = await supabase
          .from("admins")
          .select("*")
          .eq("email", user.email)
          .single();

        if (adminError) {
          console.error("Error checking admin access:", adminError.message);
          setIsAdmin(false);
          router.push("/");
        } else if (!adminData) {
          console.log('Email tidak ditemukan di tabel "admins"');
          setIsAdmin(false);
          router.push("/unauthorized");
        } else {
          console.log("User is an admin");
          setIsAdmin(true);
          setDataAdmin(adminData);
          console.log(setDataAdmin);
        }
      } catch (error) {
        console.error("Error checking admin access:", error.message);
        setIsAdmin(false);
        router.push("/");
      }
    };

    fetchTeachers();
    checkAdminAccess();

    // Cleanup function: Unsubscribe from the channel when the component unmounts
    return () => {
      channel.unsubscribe();
    };
  }, [router]);

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      router.push("/");
    } catch (error) {
      console.error("Error signing out:", error.message);
    }
  };

  if (!isAdmin) {
    return <div>Anda tidak memiliki akses ke admin dashboard</div>;
  }
  const handleContact = () => {
    router.push("/admindb/contact");
  };
  const handleGuru = () => {
    router.push("/admindb/guru");
  };
  const handleAbsen = () => {
    router.push("/admindb/absen");
  };
  return (
    <>
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-2">
              {/* Widget 1 */}
              <div className="bg-white p-4 rounded shadow-md cursor-pointer" onClick={handleGuru}>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold mb-2">List Guru</h3>
                  <BsFillPersonLinesFill size="2em" className="ml-auto" />
                </div>

              </div>
              <div className="bg-white p-4 rounded shadow-md cursor-pointer" onClick={handleContact}>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold mb-2">Contact</h3>
                  <BsTelephoneInboundFill size="2em" className="ml-auto" />
                </div>

              </div>
              <div className="bg-white p-4 rounded shadow-md cursor-pointer" onClick={handleAbsen}>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold mb-2">List Absen</h3>
                  <MdHistory size="2em" className="ml-auto" />
                </div>

              </div>
              
              </div>
    </>
  );
};

export default AdminDashboard;
