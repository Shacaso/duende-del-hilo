"use client";
import { useAppSelector, useAppDispatch } from "@/lib/store";
import {
  getAllCategoriesAsync,
  //   getOneClientByIdAsync,
  createCategoryAsync,
  //   updateClientAsync,
  deleteCategoryAsync,
  setCategorySync,
  cleanCreatedCategorySync,
  updateCategoryAsync,
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
  function deleteCategory(id: string) {
    dispatch(deleteCategoryAsync(id));
  }
  //   function getOneClientById(id: string) {
  //     dispatch(getOneClientByIdAsync(id));
  //   }
  function createCategory(body: Category) {
    dispatch(createCategoryAsync(body));
  }
  function updateCategory(body: Category) {
    dispatch(updateCategoryAsync(body));
  }

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
    deleteCategory,
    createCategory,
    updateCategory,
    setCostume,
    cleanCreatedCostume,
  };
}
