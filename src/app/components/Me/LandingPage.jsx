"use client";
import React from "react";
import { Input, useToast } from "@chakra-ui/react";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { startOfDay, setHours, format } from "date-fns";
import { supabase } from "../../config/supabase";
import { toast } from "react-toastify";
import Image from "next/image";
import PenaGuru from "../../../../public/PenaGuru.png";
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { GrTechnology } from "react-icons/gr";
import { IoIosHome } from "react-icons/io";
import { FaPhone } from "react-icons/fa6";
import { Skeleton } from "@nextui-org/react";

export default function LandingPage() {
  const [isLoaded, setIsLoaded] = React.useState(false);
  const toggleLoad = () => {
    setIsLoaded(!isLoaded);
  };
  const [userData, setUserData] = useState({
    nama_user: "",
    jenis_user: "",
  });
  const [presensiData, setPresensiData] = useState(null);
  const [foto, setFoto] = useState(null);
  const [placement, setPlacement] = useState("bottom");
  const [size, setSize] = useState("md");
  const [user, setUser] = useState(null);
  const [absensi, setAbsensi] = useState([]);
  const toast = useToast();
  const now = new Date();
  const today = format(now, "yyyy-MM-dd");
  const checkInTime = setHours(startOfDay(now), 7);
  let checkOutTime;

  switch (now.getDay()) {
    case 1:
      checkOutTime = setHours(startOfDay(now), 15, 10);
      break;
    case 2:
      checkOutTime = setHours(startOfDay(now), 15, 50);
      break;
    case 3:
    case 4:
      checkOutTime = setHours(startOfDay(now), 14, 30);
      break;
    case 5:
      checkOutTime = setHours(startOfDay(now), 11, 30);
      break;
    case 6:
      checkOutTime = setHours(startOfDay(now), 9, 10);
      break;
    default:
      checkOutTime = null;
      break;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        const { data: profileData, error: profileError } = await supabase
          .from("profiles")
          .select("*")
          .eq("email", user.email)
          .single();

        if (profileError) {
          throw new Error(profileError.message);
        }

        setUserData(profileData || {});
        await checkPresensi(profileData.id);
        const guruId = profileData?.id;
        if (!guruId) {
          console.error("Guru ID is null or undefined.");
          return;
        }
        const { data: absensiData, error: absensiError } = await supabase
          .from("absensi")
          .select("*")
          .eq("id_guru", guruId)
          .order("tanggal_absensi", { ascending: false })
          .limit(2);
        if (absensiError) {
          console.error("Error fetching absensi data:", absensiError);
          return;
        }

        setAbsensi(absensiData);
      } catch (error) {
        console.error("Error fetching profile data:", error.message);
      }
    };

    fetchData();
  }, []);

  const checkPresensi = async (userId) => {
    try {
      const today = format(new Date(), "yyyy-MM-dd");
      const { data, error } = await supabase
        .from("absensi")
        .select("*")
        .eq("id_guru", userId)
        .eq("tanggal_absensi", today);
      if (error) {
        throw error;
      }
      if (data.length > 0) {
        setPresensiData(data[0]);
      } else {
        setPresensiData(null);
      }
    } catch (error) {
      console.error("Error checking presensi status:", error.message);
    }
  };

  const eventFoto = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      setFoto(selectedFile);
    } else {
      console.log("Tidak Ada File Yang Dipilih");
    }
  };

  const handleCheckIn = async () => {
    try {
      const now = new Date();
      const today = format(now, "yyyy-MM-dd");
      const checkInTime = setHours(startOfDay(now), 7);

      if (now > checkInTime) {
        console.log("Maaf, sudah melewati waktu check-in.");
        return;
      }

      if (!foto) {
        console.log("Silahkan pilih gambar terlebih dahulu.");
        return;
      }

      const { error: uploadError } = await supabase.storage
        .from("guru")
        .upload(`guru/${userData.id}/${today}`, foto);

      if (uploadError) {
        throw uploadError;
      }

      const imageUrl = `guru/${userData.id}/${today}`;

      const { error: checkInError } = await supabase.from("absensi").insert([
        {
          id_guru: userData.id,
          tanggal_absensi: today,
          check_in: format(now, "yyyy-MM-dd HH:mm:ss"),
          foto_kegiatan: imageUrl,
        },
      ]);

      if (checkInError) {
        throw checkInError;
      }

      console.log("Check-In berhasil ditambahkan.");
      await checkPresensi(userData.id);
    } catch (error) {
      console.error("Error handling check-in:", error.message);
    }
  };

  const handleCheckOut = async () => {
    try {
      const now = new Date();
      let checkOutTime;

      switch (now.getDay()) {
        case 1:
          checkOutTime = setHours(startOfDay(now), 15, 10);
          break;
        case 2:
          checkOutTime = setHours(startOfDay(now), 15, 50);
          break;
        case 3:
        case 4:
          checkOutTime = setHours(startOfDay(now), 14, 30);
          break;
        case 5:
          checkOutTime = setHours(startOfDay(now), 11, 30);
          break;
        case 6:
          checkOutTime = setHours(startOfDay(now), 9, 10);
          break;
        default:
          checkOutTime = null;
          break;
      }

      if (!checkOutTime || now < checkOutTime) {
        console.log("Belum saatnya untuk Check-Out.");
        return;
      }
      const { error } = await supabase
        .from("absensi")
        .update({
          check_out: format(now, "yyyy-MM-dd HH:mm:ss"),
        })
        .eq("id", presensiData.id);
      if (error) {
        throw error;
      }
      console.log("Check-Out berhasil diperbarui.");
      setPresensiData(null);
    } catch (error) {
      console.error("Error handling check-out:", error.message);
    }
  };
  // presensiData && presensiData.check_in ?(
  //   toast({
  //     title: "Anda sudah Absen",
  //     description: "Silahkan tutup pesan ini",
  //     status: "success",
  //     duration: 5000,
  //     isClosable: true,
  //     position: 'top',

  //   })
  // ):(
  //   toast({
  //     title: "Silahkan absen",
  //     description: "Anda tidak dapat menutup pesan ini jika tidak absen",
  //     status: "error",
  //     duration: null,
  //     isClosable: false,
  //     position: 'top',
  //   })

  // );

  const handleLogout = () => {
    console.log("Silahkan pulang.");
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      {now < checkInTime ? (
        <>
          {presensiData && presensiData.check_in ? (
            <></>
          ) : (
            <>
              <div className="fixed  top-2 right-0  p-16 ">
                <div class="  p-4 mb-4 bg-red-500 text-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800">
                  <p>Silahkan CheckIn</p>
                </div>
              </div>
            </>
          )}
        </>
      ) : (
        <>
          {presensiData && presensiData.check_in ? (
            <>
              {now > checkOutTime ? (
                <>
                  {presensiData && presensiData.check_out ? (
                    <></>
                  ) : (
                    <>
                      <div className="fixed  top-2 right-0  p-16 ">
                        <div class="  p-4 mb-4 bg-red-500 text-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800">
                          <p>Anda belum checkout </p>
                        </div>
                      </div>
                    </>
                  )}
                </>
              ) : (
                <></>
              )}
            </>
          ) : (
            <>
              {now > checkOutTime ? (
                <></>
              ) : (
                <>
                  <div className="fixed  top-2 right-0  p-16 ">
                    <div class="  p-4 mb-4 bg-red-500 text-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800">
                      <p>Anda Terlambat Absen</p>
                    </div>
                  </div>
                </>
              )}
            </>
          )}
        </>
      )}
      <div className="flex flex-col lg:flex-row justify-center lg:justify-start mx-5">
        <div className="border border-md bg-white h-auto lg:mr-5 lg:w-1/3 my-2.5 justify-center pb-5 shadow-lg  rounded-lg">
          <div className="">
            <Image
              src={PenaGuru}
              width={300}
              height={300}
              className="mx-auto my-4"
            />
            <div className="mx-3">
              <h1 className="flex">
                <FaUser className="mt-0.5 mr-2 text-blue-500" />
                {userData.nama_user}
              </h1>

              <h1 className="flex">
                <MdEmail className="mt-1 mr-2 text-blue-500" />
                {userData.email}
              </h1>
              <h1 className="flex">
                <GrTechnology className="mr-2 mt-1 text-blue-500" />
                {userData.jenis_user}
              </h1>
              <h1 className="flex">
                <IoIosHome className="mt-0.5 mr-2 text-blue-500" />
                {userData.alamat}
              </h1>
              <h1 className="flex">
                <FaPhone className="mt-0.5 mr-2 text-blue-500" />
                {userData.telepon}
              </h1>
            </div>
            <Link href={"/me/edit"} className="flex justify-center">
              <button className="mt-5 mx-3 w-full bg-blue-500 p-2 text-white rounded-md hover:ease-out duration-300 hover:scale-105 active:scale-100">
                Edit Profile
              </button>
            </Link>
          </div>
        </div>

        <div className="border border-md w-full my-2.5 shadow-lg bg-white rounded-lg ">
          <div className="border border-md m-5 rounded-lg bg-blue-500 ">
            <h1 className="text-xl mx-3 mt-5 text-white">Administrator</h1>
            <h1 className="ml-3 text-3xl text-white">123456789</h1>
            <div className="rounded-md m-3 bg-blue-400 text-white">
              <h1 className="ml-2">Absen Masuk</h1>
              <div className="flex">
                <h1 className="ml-2 text-5xl mb-2 pb-2">07.00</h1>
                <h1 className="mt-5 ml-1 text-xl">Senin, 2/4/2024</h1>
              </div>
            </div>
            <div className="rounded-md m-3 bg-blue-400 text-white">
              <h1 className="ml-2">Absen Keluar</h1>
              <div className="flex">
                <h1 className="ml-2 text-5xl pb-2">15.30</h1>
                <h1 className="mt-5 ml-1 text-xl">Senin, 2/4/2024</h1>
              </div>
            </div>
            <div className="flex justify-center">
              <button
                className="mt-4 mb-6 lg:mb-4 btn border-0 bg-white text-black md:w-5/6 lg:w-1/2 rounded-md hover:bg-white hover:text-black text-lg"
                onClick={onOpen}
              >
                Absen
              </button>
            </div>
          </div>
          <div className="mt-4">
            {absensi.map((absen, index) => (
              <div className="mb-4" key={index}>
                <div className="border border-md shadow-md rounded-md mx-5 mb-5 bg-white">
                  <div className="lg:flex">
                    <div className="stat place-items-center">
                      <div className="stat-figure text-secondary"></div>
                      <div className="stat-title">Jam Masuk</div>
                      <div className="stat-value text-medium">
                        {absen.check_in}
                      </div>
                    </div>
                    <div className="stat place-items-center">
                      <div className="stat-figure text-secondary"></div>
                      <div className="stat-title">Jam Keluar</div>
                      <div className="stat-value text-medium">
                        {absen.check_out}
                      </div>
                      <div class="stat-figure text-secondary"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="">
            <Link
              href="/me/statistik"
              className="text-lg text-blue-500 bg-white hover:text-white hover:bg-blue-500 mb-28 lg:mb-16 md:mb-16 xl:mb-16 btn flex justify-center mx-5"
            >
              Lihat Lebih Banyak
            </Link>
          </div>
        </div>
      </div>

      <Modal size={size} isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {" "}
                {presensiData && presensiData.check_out ? (
                  <p>Silahkan Pulang.</p>
                ) : (
                  <div>
                    {presensiData && presensiData.check_in ? (
                      <div>
                        <p>Silahkan CheckOut</p>
                      </div>
                    ) : (
                      <>
                        <p>Silahkan CheckIn</p>
                      </>
                    )}
                  </div>
                )}
              </ModalHeader>
              <ModalBody>
                <p>
                  Selamat datang, {userData.nama_user} ({userData.jenis_user})
                </p>
                {presensiData && presensiData.check_out ? (
                  <>
                    <p>Kamu sudah absen. Silahkan pulang.</p>
                    <Button
                      className="mt-3"
                      color="danger"
                      variant="light"
                      onPress={onClose}
                    >
                      Close
                    </Button>
                  </>
                ) : (
                  <div>
                    {presensiData && presensiData.check_in ? (
                      <>
                        {now > checkOutTime ? (
                          <>
                            {" "}
                            <div className="flex gap-2">
                              <Button
                                type="primary"
                                className="  bg-blue-500 text-white"
                                onClick={handleCheckOut}
                              >
                                Check-Out
                              </Button>
                              <Button
                                className=""
                                color="danger"
                                variant="light"
                                onPress={onClose}
                              >
                                Close
                              </Button>
                            </div>
                          </>
                        ) : (
                          <>
                            <p className="text-sm">Belum waktunya checkout</p>
                            <Button
                              className="mt-3"
                              color="danger"
                              variant="light"
                              onPress={onClose}
                            >
                              Close
                            </Button>
                          </>
                        )}
                      </>
                    ) : (
                      <>
                        {now > checkInTime ? (
                          <>
                            <p className="text-sm">
                              Maaf, sudah melewati waktu checkin
                            </p>
                            <Button
                              className="mt-3"
                              color="danger"
                              variant="light"
                              onPress={onClose}
                            >
                              Close
                            </Button>
                          </>
                        ) : (
                          <>
                            <p className="text-xs">
                              Silahkan masukan gambar terlebih dahulu sebelum
                              checkin
                            </p>
                            <Input
                              type="file"
                              accept="image/*"
                              onChange={eventFoto}
                            />
                            <div className="flex gap-2">
                              <Button
                                className="mt-3 bg-blue-500 text-white"
                                onClick={handleCheckIn}
                              >
                                Check-In
                              </Button>
                              <Button
                                className="mt-3"
                                color="danger"
                                variant="light"
                                onPress={onClose}
                              >
                                Close
                              </Button>
                            </div>
                          </>
                        )}
                      </>
                    )}
                  </div>
                )}
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
