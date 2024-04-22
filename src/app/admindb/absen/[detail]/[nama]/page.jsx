'use client'
import { supabase } from "@/app/config/supabase";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Duivion from "../../../../../../public/Duivion.png"
import { Item } from "@radix-ui/react-dropdown-menu";
import { Card, CardHeader, CardBody, CardFooter, Box,
 Button, Heading,Stat,
 StatLabel,
 StatNumber,
 StatHelpText,
 StatArrow, Divider,
 StatGroup,
  Stack, Flex, StackDivider, ButtonGroup, /*Image,*/
Text } from '@chakra-ui/react'
import PenaGuru from "../../../../../../public/PenaGuru.png"
export default function IdGuru() {
  const [absensi, setAbsensi] = useState([]);
  const { detail, nama } = useParams();

  useEffect(() => {
    async function fetchAbsensi() {
      try {
        const decodedTanggal = decodeURIComponent(detail);
        
        if (!decodedTanggal || !nama) return;

        const { data: absensiData, error } = await supabase
          .from("absensi")
          .select(`
          *,
          profiles:id_guru(nama_user,telepon,alamat)
        `)
          .eq("tanggal_absensi", decodedTanggal.replace(' ', '+'))
          .eq("id_guru", nama);

        if (error) {
          throw error;
        }

        setAbsensi(absensiData);
        for (const absen of absensiData){
        const res = await supabase.storage
        .from("guru")
        .getPublicUrl(absen.foto_kegiatan);
        if (res.error) {
          console.error("Error fetching image URL:", res.error.message);
        } else {
          absen.foto_kegiatan_url = res.data.publicUrl;
        }
      }
      } catch (error) {
        console.error("Error fetching absensi:", error.message);
      }
    }

    fetchAbsensi();
  }, [detail, nama]);
  return (
    <>
      <div className="mb-80">
      {absensi.map((absen) => (
        <div key={absen.id}>
          
        <Card className="bg-gray-200">
          <CardHeader className="items-center justify-items-center text-center">
           <Image
                  src={PenaGuru}
                  width={30}
                  height={30}
                  className="float-left"
                  /> 
                   <Heading size="md">LAPORAN ABSEN</Heading>
          </CardHeader>
                   <Divider/>

          <CardBody>
            <Stack spacing="2">
              <Flex spacing="1">
                <Flex flex="1" gap="1" alignItems="center" flexWrap="wrap">
                  <Box className="space-between">
                    <Heading size="xs" textTransform="uppercase">
                      Keterangan Guru
                    </Heading>
                    <Text pt="1" fontSize="sm">
                      Nama Guru: {absen.profiles.nama_user}
                    </Text>
                    <Text pt="1" fontSize="sm">
                      Id Guru: {absen.id_guru}
                    </Text>
                    <Text pt="1" fontSize="sm">
                      Telepon: {absen.profiles.telepon}
                    </Text>
                  </Box>
                </Flex>
              </Flex>
              <Box className="items-center mx-auto justify-items-center text-center">
              {absen.foto_kegiatan_url && (
                <Image
                  src={absen.foto_kegiatan_url}
                  width={200}
                  height={150}
                  className="items-center justify-items-center text-center "
                />
              )}
              </Box>
              <Stack spacing="2">
                <div className="mx-auto flex-end-component">
                  <Box>
                    <Stat>
                      <StatLabel>Check In</StatLabel>
                      <StatNumber fontSize="medium">
                        {absen.check_in}
                      </StatNumber>
                    </Stat>
                  </Box>
                  <Box>
                    <Stat>
                      <StatLabel>Check Out</StatLabel>
                      <StatNumber fontSize="medium">
                        {absen.check_out}
                      </StatNumber>
                      <StatLabel>Tanggal</StatLabel>
                      <StatHelpText>{absen.tanggal_absensi}</StatHelpText>
                    </Stat>
                  </Box>
                   
                </div>
           <Box>
                <Image
                  src={Duivion}
                  width={60}
                  height={60}
                  className="float-right"
                  />
                  </Box>
              </Stack>
            </Stack>
          </CardBody>
        </Card>

        </div>
      ))}
      </div>
    </>
  );
}
