"use client";
import React from "react";
import { Image, Textarea } from "@nextui-org/react";
import { IoMdPhotos } from "react-icons/io";
import { FaCommentAlt } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useDisclosure } from "@nextui-org/react";
export default function PenaPage() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [size, setSize] = React.useState("md");
  const [scrollBehavior, setScrollBehavior] = React.useState("inside");

  const handleSizeClick = (newSize) => {
    setSize(newSize);
    onOpen();
  };

  const sizes = ["xs", "sm", "md", "lg", "xl", "full"];

  return (
    <>
      <div className="flex justify-center">
        <div className="border-1.5 lg:p-4 py-4 w-screen lg:w-1/3 border-b-8 fixed bg-white z-50">
          <div className="">
            <div className="flex">
              <Image
                className="rounded-full max-w-[35px] lg:max-w-[35px] mr-2 mb-2"
                src="/PenaGuru.png"
              />
              <h1 className="mt-0.5">@violet_</h1>
            </div>
            <div>
              <textarea
                cols="50"
                id="text"
                name="text"
                placeholder="What is happening?"
                className="px-2 outline-none resize-none no-scrollbar border-1.5 py-2 rounded-md w-full"
              ></textarea>
              <div className="mt-2 grid grid-cols-2">
                <IoMdPhotos className="text-xl text-slate-400 hover:text-blue-500 cursor-pointer active:text-slate-400 transition" />
                <button className="-mt-0.5 bg-blue-500 outline-none ml-[100px] lg:ml-[122px] w-max text-white py-1 px-2 rounded-sm font-semibold text-md hover:bg-blue-400 transition active:bg-blue-500">
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-48">
        <div className="flex justify-center">
          <div className="border-1.5 p-4 lg:w-1/3 w-full">
            <div className="flex">
              <Image
                className="rounded-full max-w-[35px] lg:max-w-[35px] mr-2"
                src="/Bg.png"
              />
              <h1 className="mt-1.5">@violet_</h1>
            </div>
            <div>
              <p className="mt-5 auto-rows-max row-span-12">
                Aku sayang Gilbert.
              </p>
              <div className="mt-5 text-slate-400">
                <div className="grid grid-cols-9">
                  <button onClick={onOpen}>
                    <FaCommentAlt className="hover:text-blue-500 cursor-pointer active:text-slate-400 transition" />
                  </button>
                  <button className="flex hover:text-blue-500 cursor-pointer active:text-slate-400 transition">
                    <FaHeart className="mt-1 mr-1 " />
                    1k
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size="xl"
        scrollBehavior="inside"
      >
        <ModalOverlay />

        <ModalContent>
          <ModalHeader>
            <ModalCloseButton />
            <div className="flex justify-center">
              <div className="border-b-1.5 pb-5 w-full z-20 p-5 bg-white mt-6">
                <div className="flex">
                  <Image
                    className="rounded-full max-w-[35px] lg:max-w-[35px] mr-2"
                    src="/PenaGuru.png"
                  />
                  <h1 className="mt-1.5">@violet_</h1>
                </div>
                <div>
                  <p className="mt-5 auto-rows-max row-span-12">
                    Aku sayang Gilbert.
                  </p>
                  <div className="mt-5 text-slate-400">
                    <div className="grid grid-cols-9">
                      <button className="flex hover:text-blue-500 cursor-pointer active:text-slate-400 transition">
                        <FaHeart className="mt-1 mr-1 " />
                        1k
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ModalHeader>
          <ModalBody>
            <h1 className="text-xl font-semibold mb-5">Comment</h1>
            <div className="">
              <div className="border-b-1.5 pb-3">
                <div className="flex mt-2">
                  <Image
                    className="rounded-full max-w-[35px] lg:max-w-[35px] mr-2"
                    src="/violetP.jpg"
                  />
                  <h1 className="mt-1.5">@violet_</h1>
                </div>
                <div>
                  <p className="mt-1.5 auto-rows-max row-span-12">
                    Aku sayang Gilbert.
                  </p>
                </div>
              </div>
              <div className="border-b-1.5 pb-3">
                <div className="flex mt-2">
                  <Image
                    className="rounded-full max-w-[35px] lg:max-w-[35px] mr-2"
                    src="/violetP.jpg"
                  />
                  <h1 className="mt-1.5">@violet_</h1>
                </div>
                <div>
                  <p className="mt-1.5 auto-rows-max row-span-12">
                    Aku sayang Gilbert.
                  </p>
                </div>
              </div>
              <div className="border-b-1.5 pb-3">
                <div className="flex mt-2">
                  <Image
                    className="rounded-full max-w-[35px] lg:max-w-[35px] mr-2"
                    src="/violetP.jpg"
                  />
                  <h1 className="mt-1.5">@violet_</h1>
                </div>
                <div>
                  <p className="mt-1.5 auto-rows-max row-span-12">
                    Aku sayang Gilbert.
                  </p>
                </div>
              </div>
              <div className="border-b-1.5 pb-3">
                <div className="flex mt-2">
                  <Image
                    className="rounded-full max-w-[35px] lg:max-w-[35px] mr-2"
                    src="/violetP.jpg"
                  />
                  <h1 className="mt-1.5">@violet_</h1>
                </div>
                <div>
                  <p className="mt-1.5 auto-rows-max row-span-12">
                    Aku sayang Gilbert.
                  </p>
                </div>
              </div>
              <div className="border-b-1.5 pb-3">
                <div className="flex mt-2">
                  <Image
                    className="rounded-full max-w-[35px] lg:max-w-[35px] mr-2"
                    src="/violetP.jpg"
                  />
                  <h1 className="mt-1.5">@violet_</h1>
                </div>
                <div>
                  <p className="mt-1.5 auto-rows-max row-span-12">
                    Aku sayang Gilbert.
                  </p>
                </div>
              </div>
              <div className="border-b-1.5 pb-3">
                <div className="flex mt-2">
                  <Image
                    className="rounded-full max-w-[35px] lg:max-w-[35px] mr-2"
                    src="/violetP.jpg"
                  />
                  <h1 className="mt-1.5">@violet_</h1>
                </div>
                <div>
                  <p className="mt-1.5 auto-rows-max row-span-12">
                    Aku sayang Gilbert.
                  </p>
                </div>
              </div>
            </div>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}