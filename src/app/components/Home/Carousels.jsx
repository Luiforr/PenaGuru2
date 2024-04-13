'use client'
import React from "react";
import { Carousel } from "antd";
import BG from "../../../../public/Bg.png";
import { Image } from "@nextui-org/react";
const contentStyle = {
  height: "160px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};
const Carousels = () => (
  <Carousel autoplay autoplaySpeed={5000}>
    <div>
        <Image  style={contentStyle} src="../../../../public/Bg.png" alt="" />
    </div>
    <div>
      <h3 style={contentStyle}>
      <Image   src="../../../../public/Bg.png" alt="" />

      </h3>
    </div>
  </Carousel>
);
export default Carousels;
