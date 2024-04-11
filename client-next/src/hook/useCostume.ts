"use client";
import { useAppSelector, useAppDispatch } from "@/lib/store";
import {
  getAllCostumesAsync,
  //   getOneClientByIdAsync,
  //   createClientAsync,
  //   updateClientAsync,
  setCostumeSync,
  cleanCreatedClientSync,
} from "@/lib/features/custome/custome.slice";
import { Costume } from "@/app/lib/definitions";

export function useCostume() {
  const dispatch = useAppDispatch();
  const { costume, isLoading, costumes, created, error } = useAppSelector(
    (state) => state.costumes
  );

  function getAllCustomes() {
    costumes.length === 0 && dispatch(getAllCostumesAsync());
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
  function setCostume(costume: Costume) {
    dispatch(setCostumeSync(costume));
  }
  function cleanCreatedCostume() {
    dispatch(cleanCreatedClientSync());
  }

  return {
    costumes,
    isLoading,
    costume,
    created,
    error,
    getAllCustomes,
    // getOneClientById,
    // createClient,
    // updateClient,
    setCostume,
    cleanCreatedCostume,
  };
}
