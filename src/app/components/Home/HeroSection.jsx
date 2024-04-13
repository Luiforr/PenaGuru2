import React from "react";
import { Button } from "@nextui-org/react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Carousels from "./Carousels";
const HeroSection = () => {
  const router = useRouter()

  function handleAbsensei() {
    router.push("/me")
  }
  return (<>
    <div class="hero min-h-screen background-image: url();">
    <div class="hero-overlay bg-opacity-60"></div>
    <div class="hero-content text-center text-neutral-content">
      <div class="max-w-md">
        <h1 class="mb-5 text-5xl font-bold">Pena Guru</h1>
        <p class="mb-5">Pena Guru adalah sebuah website yang dibuat untuk mempermudah absensi Guru</p>
        <button class="btn btn-primary">Mulai</button>
      </div>
    </div>
  </div>
  <Carousels/>
</>
  );
};

export default HeroSection;
