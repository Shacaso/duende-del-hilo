"use client";

import { PlusIcon, SearchInputIcon } from "@/assets/svg";
import { DataList } from "@/components";
import Button from "@/components/button-cmp/Button";
import ConfirmationModal from "@/components/modal-cmp/ConfirmationModal";
import { useCostume } from "@/hook/useCostume";
import { useEffect, useState } from "react";
import { Filters } from "./components/Filters";
import FormNewCostume from "./components/FormNewCostume";
import { Table } from "./components/Table";
import React from "react";

export default function CostumePage() {
  const [filters, setFilters] = useState({
    category: "",
    active: "active",
  });
  const { getAllCostumes, costumes } = useCostume();
  const [confirmationModalOpen, setConfirmationModalOpen] =
    useState<boolean>(false);

  const [search, setSearch] = useState("");

  const result = costumes.filter((costume) => {
    const matchesSearch =
      costume.name.toLowerCase().includes(search.toLowerCase()) ||
      costume.category.name.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      filters.category === "" || filters.category === "all"
        ? costumes
        : costume.category.name.includes(filters.category);

    return matchesSearch && matchesCategory;
  });

  const handleChange = (e: { target: { value: any } }) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    getAllCostumes();
  });

  return (
    <>
      <div className='w-full px-5 mt-10'>
        <DataList
          title='Disfraz'
          // setViewMode={viewModeType.TABLE}
          element={<Table data={result} />}
        >
          <div>
            <DataList.Header>
              <div className='  grid grid-cols-[1fr_288px]  gap-5 my-2'>
                <form className=' flex items-center justify-between p-2 rounded-md  bg-base-200'>
                  <input
                    autoComplete='false'
                    className='w-full flex-grow p-1 outline-none text-secondary bg-base-200 text-md'
                    placeholder='Buscar disfraz'
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
                    Nuevo Disfraz
                  </div>
                </Button>
              </div>
            </DataList.Header>
            <DataList.Filters>
              <Filters setFilters={setFilters} />
            </DataList.Filters>
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
          title='CREAR DISFRAZ'
          isOpen={confirmationModalOpen}
          handleClose={() => setConfirmationModalOpen(!confirmationModalOpen)}
        >
          <div className='overflow-auto h-[462px]'>
            <FormNewCostume />
          </div>
        </ConfirmationModal>
      )}
    </>
  );
}
