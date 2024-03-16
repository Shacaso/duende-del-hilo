"use client";

import {
  ProductIcon,
  ProviderIcon,
  UserIcon,
  HistoricalIcon,
  BellSVG,
  IconEntrada,
  CostumeIcon,
  BillsIcon,
  CategoryIcon,
  BrandIcon,
} from "@/assets/svg";
import Link from "next/link";
import MainMenuItem from "./MainMenuItem";
import Logo from "../Logo";
import ConfirmationModal from "../modal-cmp/ConfirmationModal";
import { useState } from "react";
import FormCreateNewBill from "./components/FormCreateNewBill";

export default function Navbar() {
  const [confirmationModalOpen, setConfirmationModalOpen] =
    useState<boolean>(false);

  const menuItems = [
    {
      label: "Nueva factura",
      Icon: IconEntrada,
      onClick: () => setConfirmationModalOpen(!confirmationModalOpen),
    },
    {
      label: "Notificacion",
      Icon: BellSVG,
      href: "",
    },
    {
      label: "Clientes",
      Icon: UserIcon,
      href: "/client",
      subMenu: [{ label: "Black list", href: "" }],
    },
    {
      label: "Facturas",
      Icon: BillsIcon,
      href: "/bill",
    },
    {
      label: "Categorias",
      Icon: UserIcon,
      href: "/client",
    },
    {
      label: "Disfraz",
      Icon: CostumeIcon,
      href: "/costume",
      subMenu: [
        { label: "Cabezones", href: "" },
        { label: "Mascaras", href: "" },
        { label: "Adultos", href: "" },
        { label: "Nignos", href: "" },
        { label: "Accesorios", href: "" },
      ],
    },
    {
      label: "PDF",
      Icon: BillsIcon,
      href: "/pdf",
    },
  ];

  return (
    <>
      <nav className=' min-h-full sticky left-0 top-0 pt-5 menu bg-base-200 text-base-content w-60 mr-5 rounded-e-3xl'>
        <Link href={"/home"} className='px-2 mb-[2rem] mx-auto'>
          <Logo />
        </Link>
        <ul>
          {menuItems.map((item, index) => {
            return <MainMenuItem key={index} {...item} />;
          })}
        </ul>
      </nav>
      {confirmationModalOpen && (
        <ConfirmationModal
          title='CREAR FACTURA'
          isOpen={confirmationModalOpen}
          handleClose={() => setConfirmationModalOpen(!confirmationModalOpen)}
        >
          <div className='overflow-auto h-[462px]'>
            <FormCreateNewBill />
          </div>
        </ConfirmationModal>
      )}
    </>
  );
}
