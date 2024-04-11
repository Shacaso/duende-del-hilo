"use client";
import { useAppSelector, useAppDispatch } from "@/lib/store";
import {
  getAllCategoriesAsync,
  //   getOneClientByIdAsync,
  //   createClientAsync,
  //   updateClientAsync,
  setCategorySync,
  cleanCreatedCategorySync,
} from "@/lib/features/category/category.slice";
import { Category } from "@/app/lib/definitions";

export function useCategory() {
  const dispatch = useAppDispatch();
  const { category, isLoading, categories, created, error } = useAppSelector(
    (state) => state.categories
  );

  function getAllCategories() {
    categories.length === 0 && dispatch(getAllCategoriesAsync());
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
  function setCostume(category: Category) {
    dispatch(setCategorySync(category));
  }
  function cleanCreatedCostume() {
    dispatch(cleanCreatedCategorySync());
  }

  return {
    categories,
    isLoading,
    category,
    created,
    error,
    getAllCategories,
    // getOneClientById,
    // createClient,
    // updateClient,
    setCostume,
    cleanCreatedCostume,
  };
}
