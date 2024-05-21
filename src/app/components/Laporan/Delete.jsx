// import React from "react";
// import Image from "next/image";
// import test from "../../../../public/Bg.png";
// import { Select, SelectItem } from "@nextui-org/react";
// import { Input, useToast } from "@chakra-ui/react";
// import UserAuth from "@/app/middleware/user";
// import {
//   Modal,
//   ModalContent,
//   ModalHeader,
//   ModalBody,
//   ModalFooter,
//   Button,
//   useDisclosure,
// } from "@nextui-org/react";
// export default function Delete() {
//   // const { isOpen, onOpen, onClose } = useDisclosure();
//   const { isOpen, onOpen, onClose } = useDisclosure();
//   const deleteLaporan = async (id) => {
//     const { error } = await supabase.from("laporan").delete().eq("id", id);
//   };
//   return (
//     <>
//       <div className="flex justify-center">
//       <button className="mt-5 mx-3 w-full bg-blue-500 p-2 text-white rounded-md hover:ease-out duration-300 hover:scale-105 active:scale-100"
//           onClick={onOpen}
//         >
//           Hapus
//         </button>
//       </div>

//       <Modal isOpen={isOpen} onClose={onClose}>
//         <ModalContent>
//           {(onClose) => (
//             <>
//               <ModalHeader className="flex flex-col gap-1"></ModalHeader>
//               <ModalBody>
//                 {laporan.map((laporan, index) => (
//                   <div className="mb-4" key={index}>
//                     <ul>
//                       <li>
//                         <section className="flex justify-between">
//                           <h1>{laporan.created_at}</h1>
//                           <Button onClick={() => deleteLaporan(laporan.id)}>
//                             delete
//                           </Button>
//                         </section>
//                       </li>
//                     </ul>
//                   </div>
//                 ))}
//                 <Button
//                   className="mt-3"
//                   color="danger"
//                   variant="light"
//                   onPress={onClose}
//                 >
//                   Close
//                 </Button>
//               </ModalBody>
//             </>
//           )}
//         </ModalContent>
//       </Modal>
//     </>
//   );
// }
