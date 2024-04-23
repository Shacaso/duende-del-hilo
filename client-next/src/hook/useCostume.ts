"use client";
import { useAppSelector, useAppDispatch } from "@/lib/store";
import {
  getAllAsync,
  deleteAsync,
  setCostumeSync,
  cleanCreatedCostumeSync,
  updateAsync,
  createAsync,
  //   getOneClientByIdAsync,
} from "@/lib/features/costume/costume.slice";
import { Costume } from "@/app/lib/definitions";

export function useCostume() {
  const dispatch = useAppDispatch();
  const { costume, isLoading, costumes, created, error, updated } =
    useAppSelector((state) => state.costumes);

  function getAllCostumes() {
    costumes.length === 0 && dispatch(getAllAsync());
  }
  function deleteCostume(id: string) {
    dispatch(deleteAsync(id));
  }
  //   function getOneClientById(id: string) {
  //     dispatch(getOneClientByIdAsync(id));
  //   }
  function createCostume(body: Costume) {
    dispatch(createAsync(body));
  }
  function updateCostume(body: Costume) {
    dispatch(updateAsync(body));
  }

  function setCostume(body: Costume) {
    dispatch(setCostumeSync(body));
  }
  function cleanCreatedCostume() {
    dispatch(cleanCreatedCostumeSync());
  }

  return {
    costumes,
    isLoading,
    costume,
    created,
    updated,
    error,
    getAllCostumes,
    createCostume,
    updateCostume,
    deleteCostume,
    setCostume,
    cleanCreatedCostume,
    // getOneClientById,
  };
}
