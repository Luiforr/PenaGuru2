'use client'

import React, { useState, useEffect } from "react";
import Image from "next/image";
import test from "../../../../public/Bg.png";
import { Select, SelectItem } from "@nextui-org/react";
import { Input, useToast } from "@chakra-ui/react";
import UserAuth from "@/app/middleware/user";
import { supabase } from "@/app/config/supabase";
import { v4 as uuidv4 } from "uuid";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { format } from "date-fns";
import { AiFillAlert } from "react-icons/ai";

export default function Modalp() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [user, setUser] = useState(null);
  const [deskripsi, setDeskripsi] = useState("");
  const [userId, setUserId] = useState(null);
  const [gambar, setGambar] = useState(null);
  const [laporan, setLaporan] = useState([]);
  const toast = useToast();

  useEffect(() => {
    async function fetchData() {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        setUser(user);

        if (!user || !user.email) {
          console.error("401 Unauthorized");
          return;
        }

        console.log("User fetched: ", user);

        const { data: profileData, error: profileError } = await supabase
          .from("profiles")
          .select("id")
          .eq("email", user.email)
          .single();

        if (profileError) {
          console.error(profileError.message);
          return;
        }

        const profileId = profileData.id;
        setUserId(profileId);
        console.log("Profile ID fetched: ", profileId);

        const { data: laporanData, error: laporanError } = await supabase
          .from("laporan")
          .select("*")
          .eq("nama_guru", profileId);

        if (laporanError) {
          console.error(laporanError.message);
          return;
        }

        setLaporan(laporanData);
        console.log("Laporan fetched: ", laporanData);
      } catch (error) {
        console.error(error.message);
      }
    }

    fetchData();
  }, []);

  const handleSave = async () => {
    console.log("Handling save...");
    console.log("Current user: ", user);
    console.log("Current userId: ", userId);

    if (!user) {
      toast({
        title: "Error",
        description: "User tidak ditemukan",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    if (!userId) {
      toast({
        title: "Error",
        description: "User ID tidak ditemukan",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    if (!gambar) {
      toast({
        title: "Error",
        description: "Gambar tidak boleh kosong",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    const imageName = `${uuidv4()}.${gambar.name.split(".").pop()}`;
    const today = format(new Date(), "yyyy-MM-dd");
    const imageUrl = `guru/laporan/${user.id}/${today}/${imageName}`;
    try {

      const { data: fileData, error: fileError } = await supabase.storage
        .from("guru")
        .upload(`guru/laporan/${user.id}/${today}/${imageName}`, gambar);

      if (fileError) {
        throw fileError;
      }

      const newData = {
        nama_guru: userId,
        deskripsi: deskripsi,
        gambar: imageUrl,
      };

      const { data, error } = await supabase.from("laporan").insert([newData]);

      if (error) {
        throw error;
      }

      toast({
        title: "Success",
        description: "Laporan berhasil disimpan",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      onClose();
    } catch (error) {
      console.error(error.message);
      toast({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <div className="flex justify-center">
        <button
          className="mt-5 mx-3 w-full bg-blue-500 p-2 text-white rounded-md hover:ease-out duration-300 hover:scale-105 active:scale-100"
          onClick={onOpen}
        >
          Buat Laporan
        </button>
      </div>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1"></ModalHeader>
          <ModalBody>
            <p>Selamat datang</p>
            <div>
              <p className="text-xs">
                Silahkan masukan gambar dan deskripsi kegiatan
              </p>
              <Input
                type="text"
                label="deskripsi"
                placeholder="Masukkan Deskripsi Laporan"
                value={deskripsi}
                onChange={(e) => setDeskripsi(e.target.value)}
              />
              <input
                onChange={(e) => setGambar(e.target.files[0])}
                className="mt-4"
                type="file"
                accept="image/*"
              />
              <div className="flex gap-2">
                <Button onClick={handleSave} className="mt-3 bg-blue-500 text-white">
                  Save
                </Button>
                <Button
                  className="mt-3"
                  color="danger"
                  variant="light"
                  onClick={onClose}
                >
                  Close
                </Button>
              </div>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}