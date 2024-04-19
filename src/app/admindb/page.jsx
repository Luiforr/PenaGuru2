"use client";
// pages/admin-dashboard.js
import { BiSolidDashboard } from "react-icons/bi";
import { TbBell } from "react-icons/tb";
import { useEffect, useState } from "react";
import { supabase } from "../config/supabase.js";
import { MdCoPresent } from "react-icons/md";
import { RiAdminFill } from "react-icons/ri";
import { FcStatistics } from "react-icons/fc";
import { useRouter } from "next/navigation";
import { Button, Input } from "@nextui-org/react";
import TeacherCard from "../components/Guru/TeacherCard.jsx";
import moment from "moment";
import Link from "next/link";
import { MdOutlineMarkEmailUnread } from "react-icons/md";
import { BsFillPersonLinesFill } from "react-icons/bs";
import AdminRouteProtection from "../components/Admin/AdminRouterProtection.jsx";
import BottomNavigation from "../components/Mobile/BotNav.jsx";
import { FcAcceptDatabase } from "react-icons/fc";
import { Divider } from '@nextui-org/react';
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

  return (
    <>
     
    </>
  );
};

export default AdminDashboard;
