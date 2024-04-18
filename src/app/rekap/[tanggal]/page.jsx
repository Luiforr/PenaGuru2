
"use client";
import { FaUserCircle, FaTrash, FaEdit } from "react-icons/fa";
import { Card } from "@nextui-org/react";
import { useParams } from "next/navigation";
import { Badge, Button, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { supabase } from "../../config/supabase";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image"
export default function RekapTanggalPage() {
  const { tanggal } = useParams();
  const [absensi, setAbsensi] = useState([]);
  const [error, setError] = useState(null);
  const [isExpanded, setIsExpanded] = useState(null);
  const pathname = usePathname();

  useEffect(() => {
    async function fetchAbsensi() {
      try {
        const decodedTanggal = decodeURIComponent(tanggal);

        const { data: absensiData, error: absensiError } = await supabase
          .from("absensi")
          .select("*")
          .eq("tanggal_absensi", decodedTanggal.replace(' ', '+'));


        setAbsensi(absensiData);
      } catch (error) {
        console.error(
          `Error fetching absensi for tanggal ${tanggal}:`,
          error.message
        );
        setError(`Failed to fetch absensi for tanggal ${tanggal}.`);
      }
    }

    if (tanggal) {
      fetchAbsensi();
    }
  }, [tanggal]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
    <h1 className="text-center text-2xl font-bold mb-4 m-4">Rekap Absensi Tanggal</h1>
       <div className="flex justify-end mb-4 mr-4">
      </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {absensi.map((absen, index) => (
        <motion.div
            key={absen.id}
            initial={{ opacity: 0, y: -50, rotateY: -180 }}
            animate={{ opacity: 1, y: 0, rotateY: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05, boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", rotateY: -10 }}
            whileTap={{ scale: 0.95 }}
        
          >
       
          <div>
            <div className="bg-white border border-gray-200 rounded-lg shadow-md p-4 flex items-center">
              <div className="ml-4">
                <div className="flex items-center">
                  <FaUserCircle className="text-blue-500 mr-2" size={24} />
                  <p className="text-lg font-semibold mb-2">
                    ID Guru: {absen.id_guru}
                  </p>
                </div>
                <p className="text-sm text-gray-600 mb-2">
                  Tanggal Absensi: {absen.tanggal_absensi}
                </p>
                <Badge className="cursor-pointer" onClick={() => setIsExpanded(absen.id === isExpanded ? null : absen.id)} colorScheme={"green"}>Aktif</Badge>
              </div>
              <div className="flex-grow"></div>
              <Button colorScheme={"blue"} variant={Link}>
                <Link href={`${pathname}/${absen.id_guru}`}>
                  Lihat Rekap Lengkap
                </Link>
              </Button>
           
              </div>
            {isExpanded === absen.id && (
              <div className="p-4 mt-4 bg-gray-100 rounded-lg">
             
                <p>Informasi tambahan:</p>
                <p>Isi Sama Kamu</p>
              </div>
            )}
            <div className="absolute top-2 right-2">
              <Image  alt="icon" width={24} height={24} />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
  );
}
