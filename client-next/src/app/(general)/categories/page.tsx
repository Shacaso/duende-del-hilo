"use client";

import { PlusIcon, SearchInputIcon } from "@/assets/svg";
import { DataList } from "@/components";
import Button from "@/components/button-cmp/Button";
import ConfirmationModal from "@/components/modal-cmp/ConfirmationModal";
import { useCategory } from "@/hook/useCategory";
import { useEffect, useState } from "react";
import Form from "./components/Form";
import { Table } from "./components/Table";
import React from "react";

export default function CategoriesPage() {
  const { getAllCategories, categories } = useCategory();

  const [confirmationModalOpen, setConfirmationModalOpen] =
    useState<boolean>(false);
  const [search, setSearch] = useState("");

  const result = !categories
    ? categories
    : categories.filter((category) =>
        category.name.toLowerCase().includes(search.toLowerCase())
      );

  const handleChange = (e: { target: { value: any } }) => {
    setSearch(e.target.value);
  };
  // console.log(initial);

  useEffect(() => {
    getAllCategories();
  });

  return (
    <>
      <div className='w-full px-5 mt-10 '>
        <DataList
          title='Categorías'
          element={<Table data={result} type='categories' />}
        >
          <div>
            <DataList.Header>
              <div className='  grid grid-cols-[1fr_288px]  gap-5 my-2'>
                <form className=' flex items-center justify-between p-2 rounded-md  bg-base-200'>
                  <input
                    autoComplete='false'
                    className='w-full flex-grow p-1 outline-none text-secondary bg-base-200 text-md'
                    placeholder='Buscar categoría'
                    type='text'
                    name='search'
                    value={search}
                    onChange={handleChange}
                  />
                  <span>
                    <SearchInputIcon className='w-6 h-6 cursor-pointer [&>path]:hover:stroke-primary-focus ' />
                  </span>
                </form>

                <Button
                  className='gap-3 w-72 btn btn-primary '
                  onClick={() =>
                    setConfirmationModalOpen(!confirmationModalOpen)
                  }
                >
                  <div className='flex items-center gap-5 text-lg'>
                    <PlusIcon />
                    Nueva Categoría
                  </div>
                </Button>
              </div>
            </DataList.Header>
          </div>
        </DataList>
        {/* {totalPages > 1 && (
      <Paginated
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    )} */}
      </div>
      {confirmationModalOpen && (
        <ConfirmationModal
          title='CREAR CATEGORÍA'
          isOpen={confirmationModalOpen}
          handleClose={() => setConfirmationModalOpen(!confirmationModalOpen)}
        >
          <div className='overflow-auto h-[462px]'>
            <Form />
          </div>
        </ConfirmationModal>
      )}
    </>
  );
}
