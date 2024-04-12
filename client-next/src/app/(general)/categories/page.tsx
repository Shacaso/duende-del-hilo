"use client";

import { PlusIcon } from "@/assets/svg";
import { DataList, Search } from "@/components";
import Button from "@/components/button-cmp/Button";
import { useEffect, useState } from "react";
import { Category, Departament } from "@/app/lib/definitions";
import { SearchInputIcon } from "@/assets/svg";
import { fetchGetAll } from "@/app/lib/fetching";
import ConfirmationModal from "@/components/modal-cmp/ConfirmationModal";
import { Table } from "./components/Table";
import Form from "./components/Form";
import { useCategory } from "@/hook/useCategory";

export default function CategoriesPage() {
  const { getAllCategories, categories } = useCategory();

  const [confirmationModalOpen, setConfirmationModalOpen] =
    useState<boolean>(false);

  // const [categories, setCategories] = useState<Category[]>([]);
  const [search, setSearch] = useState("");

  const result = !categories
    ? categories
    : categories.filter((client) =>
        client.name.toLowerCase().includes(search.toLowerCase())
      );

  const handleChange = (e: { target: { value: any } }) => {
    setSearch(e.target.value);
  };

  // const getClients = async () => {
  //   const data: Category[] = await fetchGetAll("categories");
  //   setCategories(data);
  // };

  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <>
      <div className='w-full px-5 mt-10'>
        <DataList
          title='Categorias'
          // setViewMode={viewModeType.TABLE}
          element={<Table data={result} type='categories' />}
        >
          <div>
            <DataList.Header>
              <div className='flex gap-5 my-2'>
                <div className='flex-1'>
                  {/* <Search
                placeholder='Buscar cliente'
                onNewValue={handleFilters}
              /> */}
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
            <h1 className='mt-10 text-center'>
              ORDENAR ALFABETICAMENTE POR COLUMNA
            </h1>
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
          title='Form Category'
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
