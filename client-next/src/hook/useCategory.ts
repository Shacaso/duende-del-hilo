"use client";
import { useAppSelector, useAppDispatch } from "@/lib/store";
import {
  getAllCategoriesAsync,
  createCategoryAsync,
  deleteCategoryAsync,
  setCategorySync,
  cleanCreatedCategorySync,
  updateCategoryAsync,
  //   getOneClientByIdAsync,
} from "@/lib/features/category/category.slice";
import { Category } from "@/app/lib/definitions";

export function useCategory() {
  const dispatch = useAppDispatch();
  const { category, isLoading, categories, created, error, updated } =
    useAppSelector((state) => state.categories);

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

  function setCostume(body: Category) {
    dispatch(setCategorySync(body));
  }
  function cleanCreatedCostume() {
    dispatch(cleanCreatedCategorySync());
  }

  return {
    categories,
    isLoading,
    category,
    created,
    updated,
    error,
    getAllCategories,
    deleteCategory,
    createCategory,
    updateCategory,
    setCostume,
    cleanCreatedCostume,
    // getOneClientById,
  };
}
