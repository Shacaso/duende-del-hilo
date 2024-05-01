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
    /* {
      label: "Notificacion",
      Icon: BellSVG,
      href: "",
    }, */
    {
      label: "Clientes",
      Icon: UserIcon,
      href: "/client",
      /*  subMenu: [{ label: "Black list", href: "" }], */
    },
    {
      label: "Facturas",
      Icon: BillsIcon,
      href: "/bill",
    },
    {
      label: "Categorias",
      Icon: UserIcon,
      href: "/categories",
    },
    {
      label: "Disfraz",
      Icon: CostumeIcon,
      href: "/costume",
      /* subMenu: [
        { label: "Cabezones", href: "" },
        { label: "Mascaras", href: "" },
        { label: "Adultos", href: "" },
        { label: "Nignos", href: "" },
        { label: "Accesorios", href: "" },
      ], */
    },
  ];

  return (
    <>
      <nav className='flex gap-5 flex-col h-full overflow-y-auto items-center sticky min-w-60 max-w-60 left-0 top-0 pt-5 menu bg-base-200 text-base-content  rounded-e-3xl'>
        <Link href={"/home"}>
          <Logo />
        </Link>
        <ul className='overflow-y-auto '>
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
