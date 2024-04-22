
"use client";
import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "../../config/supabase";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Skeleton,
} from "@nextui-org/react";
import { lazy } from "react";
import { Image } from "@nextui-org/react";
import { Grid } from "@nextui-org/react";

export default function absen() {
  const [uniqueDates, setUniqueDates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const toggleLoad = () => {
    setIsLoaded(!isLoaded);
  };

  useEffect(() => {
    async function fetchUniqueDates() {
      try {
        const { data, error } = await supabase.from("unique_dates").select();
        if (error) {
          throw error;
        }
        3;
        setUniqueDates(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching unique dates:", error.message);
        setError("Failed to fetch unique dates.");
        setLoading(false);
      }
    }

    fetchUniqueDates();
  }, []);

  if (loading) {
    <div>Loading..</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
       <h1 className="font-bold text-center text-3xl sm:text-4xl mb-5 mt-3">
        Rekap Absensi
      </h1>
      <ul className="grid grid-cols-2 sm:grid-cols-3">
        {uniqueDates.map((date) => (
          <li className="" key={date.tanggal_absensi}>
            <div className="flex">
              <div className="bg-white border-small mx-1 w-full py-4 sm:py-2 text-center my-1 rounded-lg shadow-sm">
                <Link href={`/admindb/absen/${date.tanggal_absensi}`}>
                  {new Date(date.tanggal_absensi).toLocaleDateString()}
                </Link>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}