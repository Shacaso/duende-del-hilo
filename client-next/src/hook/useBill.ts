"use client";
import { useAppSelector, useAppDispatch } from "@/lib/store";
import {
  getAllAsync,
  createAsync,
  updateAsync,
  setBillSync,
  cleanCreatedBillSync,
} from "@/lib/features/bill/bill.slice";
import { Bill, BillDto } from "@/app/lib/definitions";

export function useBill() {
  const dispatch = useAppDispatch();
  const { bill, isLoading, bills, created, error } = useAppSelector(
    (state) => state.bills
  );

  function getAllBills() {
    bills.length === 0 && dispatch(getAllAsync());
  }

  // function createBill(body: BillDto) {
  //   dispatch(createAsync(body));
  // }

  function updateBill(body: Bill) {
    dispatch(updateAsync(body));
  }

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
    // createBill,
    updateBill,
    setBill,
    cleanCreatedBill,
  };
}
