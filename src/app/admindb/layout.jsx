"use client"
import Link from "next/link";
import { Divider } from "@nextui-org/react";
export default function AdminDashboard({ children }) {
  return (
    <>
      <div className="flex flex-col lg:flex-row h-screen">
        <aside className="lg:w-64 bg-gray-800">
          <div className="p-4 text-white">
            <h1 className="text-lg font-bold">Admin Panel</h1>
            <Divider className="bg-gray-300 mt-2" />
            <ul className="mt-4">
              <li className="py-2">
                <Link href="/admindb" className="text-gray-300 hover:text-white cursor-pointer">
                  Dashboard
                </Link>
              </li>
              <li className="py-2">
                <Link href="/admindb/guru" className="text-gray-300 hover:text-white cursor-pointer">
                  Users
                </Link>
              </li>
            </ul>
          </div>
        </aside>
        <main className="flex-1 bg-gray-200">
          <nav className="bg-white shadow p-4">
            <div className="container mx-auto">
              <h1 className="text-xl font-bold">Welcome, Ariena!</h1>
            </div>
          </nav>
          <div className="container mx-auto p-4">
            <section>{children}</section>
          </div>
        </main>
      </div>
    </>
  );
}
