"use client";

import { Welcome, Stat, DashboardPanel } from "./components";
import {
  CategoryIcon,
  BellSVG,
  IconEntrada,
  UserIcon,
  BillsIcon,
} from "@/assets/svg";
import ProductsDashboard from "./components/ProductsDashboard";
import Link from "next/link";
import { useState } from "react";
import ConfirmationModal from "@/components/modal-cmp/ConfirmationModal";
import FormCreateNewBill from "@/components/navbar-cmp/components/FormCreateNewBill";
import React from "react";

export default function Dashboard() {
  const [confirmationModalOpen, setConfirmationModalOpen] =
    useState<boolean>(false);

  return (
    <>
      <div className='m-5 grid grid-cols-1 auto-rows-auto '>
        <Welcome />

        <div className='grid grid-cols-1 xl:grid-cols-3  gap-5 mb-5 cursor-pointer justify-center py-5'>
          <Stat
            title='Nueva factura'
            onClick={() => setConfirmationModalOpen(!confirmationModalOpen)}
            Icon={IconEntrada}
            url={"/product"}
          />
          <Stat title='Categorías' Icon={CategoryIcon} url={"/categories"} />
          <Stat title='Facturas' Icon={BillsIcon} url={"/bill"} />
        </div>

        <div className=' grid grid-cols-1 lg:grid-cols-2  gap-5 '>
          <DashboardPanel
            title={"Últimas facturas registradas"}
            Icon={UserIcon}
            isProduct={true}
          >
            <DashboardPanel.Content>
              <ProductsDashboard />
            </DashboardPanel.Content>
            <DashboardPanel.Footer>
              <Link
                href={"/bill"}
                className='w-full text-xl  mt-5 btn btn-primary'
              >
                Ver más facturas
              </Link>
            </DashboardPanel.Footer>
          </DashboardPanel>

          <DashboardPanel
            title={"Notificaciones"}
            Icon={BellSVG}
            isProduct={false}
          >
            <DashboardPanel.Footer>
              <div className='flex flex-col gap-3 mt-5'>
                <Link
                  href={"/notification"}
                  className='btn-disabled w-full btn btn-primary'
                >
                  Ver más notificaciones
                </Link>
              </div>
            </DashboardPanel.Footer>
          </DashboardPanel>
        </div>
      </div>
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
