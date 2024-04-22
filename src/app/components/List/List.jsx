"use client";
import React from "react";
import { useEffect, useState } from "react";
import { supabase } from "../../config/supabase.js";
import { useRouter } from "next/navigation";
import {
  Button,
  Input,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Spinner,
  Pagination,
} from "@nextui-org/react";
import { BsFillPersonLinesFill, BsTelephoneInbound } from "react-icons/bs";
import moment from "moment";
import Link from "next/link";

import TeacherCard from "../Guru/TeacherCard.jsx";
export default function List() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const [userEmail, setUserEmail] = useState(null);
  const [teachers, setTeachers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
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
    fetchTeachers();

    // Cleanup function: Unsubscribe from the channel when the component unmounts
    return () => {
      channel.unsubscribe();
    };
  }, [router]);
  const totalPages = Math.ceil(teachers.length / itemsPerPage);
  const maxPaginationLinks = Math.ceil(totalPages / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = teachers.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Define columns
  const columns = [
    { key: "nama_user", label: "Nama User" },
    { key: "email", label: "email" },
    { key: "detail", label: "detail" },
  ];
  return (
    <>
      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  
        <div className="bg-white p-4 rounded shadow-md">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold mb-2">Jumlah Guru</h3>
            <BsFillPersonLinesFill size="2em" className="ml-auto" />
          </div>
          <p className="text-xl">{teachers.length}</p>
      </div>
        </div> */}
      {/* <div>
        <h2 className="text-xl font-semibold mt-4">Daftar Guru</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {teachers
            .filter(
              (teacher) =>
                teacher.nama_user &&
                teacher.nama_user
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase())
            )
            .map((teacher) => (
              <TeacherCard
                key={teacher.id}
                name={teacher.nama_user}
                email={teacher.email}
              />
            ))}
        </div>
      </div>  */}
        <h3 className="text-xl font-semibold mb-2 text-center">Daftar Guru</h3>
   <div className=" flex flex-col items-center mt-4">
        <Table
          aria-label="Leaderboard"
          shadow="md"
          fullWidth={false}
          className="justify-center items-center shadow-md max-w-md lg:max-w-xl xl:max-w-2xl w-full"
        >
          <TableHeader className="bg-gray-800"> 
            {columns.map((column) => (
              <TableColumn key={column.key} className="w-1/3">
                {column.label}
              </TableColumn>
            ))}
          </TableHeader>
          <TableBody>
            {currentItems.map((teachers) => (
              <TableRow key={teachers.id}>
                <TableCell>{teachers.nama_user}</TableCell>
                <TableCell>{teachers.email}</TableCell>
                <TableCell>detail</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="mt-4 mx-auto justify-center items-center text-center">
          <Pagination
            total={totalPages}
            current={currentPage}
            pageSize={itemsPerPage}
            onChange={paginate}
            max={maxPaginationLinks}
            showLessItems
          />
        </div>
      </div>
    </>
  );
}
