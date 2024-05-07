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
export default function page() {
  return (
    <>
      <h1 className="text-3xl text-center text-gray-700 mt-4 ">
        Laporan Kegiatan Guru Bulan Mei 2024
      </h1>

      <Card margin="4" className="">
        <CardHeader>

      <div className="flex w-full justify-end items-end flex-wrap md:flex-nowrap gap-4">
        <Select label="Bulan" className="max-w-xs">
          <SelectItem>tes</SelectItem>
          <SelectItem>tes</SelectItem>
          <SelectItem>tes</SelectItem>
        </Select>
      </div>
        </CardHeader>
        {/* <CardHeader>
               <Heading size="md" className="text-center">
                Laporan Kegiatan
              </Heading> 
  </CardHeader> */}

        <CardBody>
          <Stack divider={<StackDivider />} spacing="5">
            <div className="grid grid-cols-3">
              <Box>
                <Heading size="sm" textTransform="uppercase" className="mb-3">
                  Tanggal
                </Heading>
                <Text pt="md" fontSize="sm">
                  lorem10{" "}
                </Text>
                <Text pt="md" fontSize="sm">
                  lorem10{" "}
                </Text>
              </Box>
              <Box>
                <Heading size="sm" textTransform="uppercase" className="mb-3">
                  Deskripsi
                </Heading>
                <Text pt="2" fontSize="sm">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Similique, odio.
                </Text>
              </Box>
              <Box>
                <Heading size="sm" textTransform="uppercase" className="mb-3">
                  Dokumentasi
                </Heading>
                <Image
                  width={500}
                  height={200}
                  src={test}
                  alt="Kegiatan"
                  className="object-contain"
                />
              </Box>
            </div>
            <div className="grid grid-cols-3">
              <Box>
                <Heading size="sm" textTransform="uppercase" className="mb-3">
                  Tanggal
                </Heading>
                <Text pt="md" fontSize="sm">
                  lorem10{" "}
                </Text>
                <Text pt="md" fontSize="sm">
                  lorem10{" "}
                </Text>
              </Box>
              <Box>
                <Heading size="sm" textTransform="uppercase" className="mb-3">
                  Deskripsi
                </Heading>
                <Text pt="2" fontSize="sm">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Similique, odio.
                </Text>
              </Box>
              <Box>
                <Heading size="sm" textTransform="uppercase" className="mb-3">
                  Dokumentasi
                </Heading>
                <Image
                  width={500}
                  height={200}
                  src={test}
                  alt="Kegiatan"
                  className="object-contain"
                />
              </Box>
            </div>
          </Stack>
        </CardBody>
      </Card>
    </>
  );
}
