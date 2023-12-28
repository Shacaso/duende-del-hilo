import { BellSVG } from "@/assets/svg";
import React from "react";
import { AccordionItem } from "./components/AccordionItem";

const filteredProducts = [{ nombre: "alejo", min: "10", actual: "20" }];

export default function NotificationPage() {
  return (
    <div className='w-full px-5 mt-10'>
      <div className='flex justify-center  items-center gap-5'>
        <BellSVG className='h-7 w-7' />
        <h1 className='text-3xl font-semibold tracking-wide '>Notificacion</h1>
      </div>
      <div className='flex flex-col items-center justify-center w-full gap-5 p-5'>
        {filteredProducts.map((product, index) => (
          <AccordionItem
            key={index}
            title={`Falta Stock  ${product.nombre}`}
            description1={`Minimo: ${product.min}`}
            description2={`Actual: ${product.actual}`}
          />
        ))}
      </div>
    </div>
  );
}
