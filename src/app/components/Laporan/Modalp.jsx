import React from "react";
import Image from "next/image";
import test from "../../../../public/Bg.png";
import { Select, SelectItem } from "@nextui-org/react";
import { Input, useToast } from "@chakra-ui/react";
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
export default function Modalp() {
  // const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <div className="flex justify-center">
      <button className="mt-5 mx-3 w-full bg-blue-500 p-2 text-white rounded-md hover:ease-out duration-300 hover:scale-105 active:scale-100"
          onClick={onOpen}
        >
          Buat Laporan
        </button>
      </div>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <> 
              <ModalHeader className="flex flex-col gap-1"></ModalHeader>
              <ModalBody>
                <p>Selamat datang, Aqil</p>

                <div>
                  <p className="text-xs">
                    Silahkan masukan gambar dan deskripsi kegiatan
                  </p>
                  <Input type="text" />
                  <input className="mt-4" type="file" accept="image/*" />
                  <div className="flex gap-2">
                    <Button className="mt-3 bg-blue-500 text-white">
                      Save
                    </Button>
                    <Button
                      className="mt-3"
                      color="danger"
                      variant="light"
                      onPress={onClose}
                    >
                      Close
                    </Button>
                  </div>
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
