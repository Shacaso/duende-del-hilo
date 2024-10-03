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

  const initial = categories.filter(
    (category) => category.dischargeDate?.length === 0
  );
  const result = !categories
    ? initial
    : initial.filter((category) =>
        category.name.toLowerCase().includes(search.toLowerCase())
      );

  const handleChange = (e: { target: { value: any } }) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    getAllCategories();
  });

  return (
    <>
      <div className='w-full px-5 mt-10'>
        <DataList
          title='Categoria'
          element={<Table data={result} type='categories' />}
        >
          <div>
            <DataList.Header>
              <div className='flex gap-5 my-2'>
                <div className='flex-1'>
                  <div className='flex items-center justify-between p-2 rounded-md  bg-base-200'>
                    <form className='w-full'>
                      <input
                        autoComplete='false'
                        className='w-full flex-grow p-1 outline-none text-secondary bg-base-200 text-md'
                        placeholder='Buscar categoria'
                        type='text'
                        name='search'
                        value={search}
                        onChange={handleChange}
                      />
                    </form>
                    <span>
                      <SearchInputIcon className='w-6 h-6 cursor-pointer [&>path]:hover:stroke-primary-focus ' />
                    </span>
                  </div>
                </div>
                <Button
                  className='gap-3 lg:w-52 btn btn-primary md:w-80'
                  onClick={() =>
                    setConfirmationModalOpen(!confirmationModalOpen)
                  }
                >
                  <div className='flex items-center gap-5'>
                    <PlusIcon />
                    Nueva Categoria
                  </div>
                </Button>
              </div>
            </DataList.Header>
            {/* <DataList.Filters>
          <h1>filters group</h1>
        </DataList.Filters> */}
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
          title='CREAR CATEGORIA'
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
