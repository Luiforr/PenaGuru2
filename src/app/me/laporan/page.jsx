"use client";
import React, { useState, useEffect } from "react";
import { supabase } from "../../config/supabase";
import Image from "next/image";
import test from "../../../../public/Bg.png";
import { Select, SelectItem } from "@nextui-org/react";
import {
  Card,
  CardHeader,
  Box,
  Heading,
  CardBody,
  Stack,
  StackDivider,
  Text,
} from "@chakra-ui/react";
import UserAuth from "@/app/middleware/user";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";

export default function Page() {
  const [user, setUser] = useState(null);
  const [laporan, setLaporan] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  useEffect(() => {
    async function fetchData() {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        setUser(user);

        if (!user || !user.email) {
          console.error("401 Unauthorized");
          return;
        }

        console.log(user);

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

        const startDate = `${new Date().getFullYear()}-${String(selectedMonth).padStart(2, "0")}-01`;
        const endDate = new Date(new Date().getFullYear(), selectedMonth, 0);
        const nextMonth = selectedMonth === 12 ? 1 : selectedMonth + 1;
        const endYear = selectedMonth === 12 ? new Date().getFullYear() + 1 : new Date().getFullYear();
        const endDateStr = `${endYear}-${String(nextMonth).padStart(2, "0")}-01`;

        const { data: laporanData, error: laporanError } = await supabase
          .from("laporan")
          .select("*")
          .eq("nama_guru", profileId)
          .gte("created_at", startDate)
          .lt("created_at", endDateStr)
          .order("created_at", { ascending: false });

        if (laporanError) {
          console.error(laporanError.message);
          return;
        }

        for (const lapor of laporanData) {
          const { data: publicUrlData, error: publicUrlError } = await supabase.storage
            .from("guru")
            .getPublicUrl(lapor.gambar);

          if (publicUrlError) {
            console.error("Error fetching image URL:", publicUrlError.message);
          } else {
            lapor.gambar_url = publicUrlData.publicUrl;
          }
        }

        setLaporan(laporanData);

        console.log(laporanData);
      } catch (error) {
        console.error(error.message);
      }
    }

    fetchData();
  }, [user, selectedMonth]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const deleteLaporan = async (id) => {
    const { error } = await supabase.from("laporan").delete().eq("id", id);
  };
  return (
    <>
      <h1 className="text-3xl text-center text-gray-700 mt-4">
        Laporan Kegiatan Guru Bulan{" "}
        {new Date(selectedYear, selectedMonth - 1).toLocaleString("default", {
          month: "long",
        })}{" "}
        {selectedYear}
      </h1>

   

      <Card margin="4">
        <CardHeader>
          <div className="flex w-full justify-between items-end flex-wrap md:flex-nowrap gap-4">
                <div className="gap-4">
              <Button className=""  onClick={onOpen}>
                Edit
              </Button>
              {/* <Button>Edit</Button> */}
            </div>
            <Select
              id="monthSelect"
              value={selectedMonth}
              label="Bulan"
              className="max-w-xs"
              onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
            >
              {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                <SelectItem key={month} value={month}>
                  {new Date(2000, month - 1).toLocaleString("default", {
                    month: "long",
                  })}
                </SelectItem>
              ))}
            </Select>
          </div>
        </CardHeader>
        {laporan.map((lapor) => (
          <div key={lapor.id}>
            <CardBody>
              <Stack divider={<StackDivider />} spacing="5">
                <div className="grid grid-cols-3">
                  <Box>
                    <Heading
                      size="sm"
                      textTransform="uppercase"
                      className="mb-3"
                    >
                      Tanggal
                    </Heading>
                    <Text pt="md" fontSize="sm">
                      {lapor.created_at}
                    </Text>
                  </Box>
                  <Box>
                    <Heading
                      size="sm"
                      textTransform="uppercase"
                      className="mb-3"
                    >Deskripsi
                    </Heading>
                    <Text>
                      {lapor.deskripsi}

                    </Text>
                  </Box>
                  <Box>
                    <Heading
                      size="sm"
                      textTransform="uppercase"
                      className="mb-3"
                    >
                      Dokumentasi
                    </Heading>
                    {lapor.gambar_url && (
                      <Image
                        width={500}
                        height={200}
                        src={lapor.gambar_url}
                        alt="Kegiatan"
                        className="object-contain"
                      />
                    )}
                  </Box>
                </div>
              </Stack>
            </CardBody>
          </div>
        ))}
      </Card>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1"></ModalHeader>
              <ModalBody>
                {laporan.map((laporan, index) => (
                  <div className="mb-4" key={index}>
                    <ul>
                      <li>
                        <section className="flex justify-between">
                          <h1>{laporan.created_at}</h1>
                          <p onClick={() => deleteLaporan(laporan.id)} className="cursor-pointer">
                            Delete
                          </p>
                          <p  className="cursor-pointer">Edit</p>
                        </section>
                      </li>
                    </ul>
                  </div>
                ))}
                <Button
                  className="mt-3"
                  color="danger"
                  variant="light"
                  onPress={onClose}
                >
                  Close
                </Button>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}