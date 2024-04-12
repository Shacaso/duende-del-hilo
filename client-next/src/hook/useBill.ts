"use client";
import { useAppSelector, useAppDispatch } from "@/lib/store";
import {
  getAllBillsAsync,
  //   getOneClientByIdAsync,
  //   createClientAsync,
  //   updateClientAsync,
  setBillSync,
  cleanCreatedBillSync,
} from "@/lib/features/bill/bill.slice";
import { Bill } from "@/app/lib/definitions";

export function useBill() {
  const dispatch = useAppDispatch();
  const { bill, isLoading, bills, created, error } = useAppSelector(
    (state) => state.bills
  );

  function getAllBills() {
    bills.length === 0 && dispatch(getAllBillsAsync());
  }
  //   function getOneClientById(id: string) {
  //     dispatch(getOneClientByIdAsync(id));
  //   }
  //   function createClient(newClient: User) {
  //     dispatch(createClientAsync(newClient));
  //   }
  //   function updateClient(modified: User) {
  //     dispatch(updateClientAsync(modified));
  //   }
  function setBill(bill: Bill) {
    dispatch(setBillSync(bill));
  }
  function cleanCreatedBill() {
    dispatch(cleanCreatedBillSync());
  }

  return {
    bills,
    isLoading,
    bill,
    created,
    error,
    getAllBills,
    // getOneClientById,
    // createClient,
    // updateClient,
    setBill,
    cleanCreatedBill,
  };
}
