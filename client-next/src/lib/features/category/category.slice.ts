import { Category } from "@/app/lib/definitions";
import {
  fetchGetAll,
  fetchPost,
  fetchGetById,
  fetchPatch,
  fetchDeleteById,
} from "@/app/lib/fetching";

import {
  type PayloadAction,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";

const path = "categories";

// thunk functions
export const getAllCategoriesAsync = createAsyncThunk(
  "category/getAll",
  async (): Promise<Category[]> => {
    const categories: Category[] = await fetchGetAll(path);
    console.log(categories);

    return categories;
  }
);
export const createCategoryAsync = createAsyncThunk(
  "category/create",
  async (body: Category): Promise<Category> => {
    return await fetchPost(body, path);
  }
);
// export const getOneClientByIdAsync = createAsyncThunk(
//   "category/getOneById",
//   async (id: string) => {
//     const category = await fetchGetById(id, "clients");
//     return category;
//   }
// );
export const updateCategoryAsync = createAsyncThunk(
  "category/update",
  async (body: Category): Promise<Category> => {
    return await fetchPatch(body.id, body, path);
  }
);

export const deleteCategoryAsync = createAsyncThunk(
  "category/delete",
  async (id: string): Promise<Category> => {
    return await fetchDeleteById(id, path);
  }
);
interface State {
  categories: Category[];
  isLoading: boolean;
  category?: Category;
  created?: Category;
  updated?: Category;
  error?: string;
}

const initialState: State = {
  categories: [],
  isLoading: false,
};

export const categorySlice = createSlice({
  name: path,

  initialState,
  reducers: {
    setCategorySync(state, action: PayloadAction<Category>) {
      return { ...state, category: action.payload };
    },
    cleanCreatedCategorySync(state) {
      const { created, ...newState } = state;
      return { ...newState };
    },
  },
  extraReducers(builder) {
    //* GETALL

    builder.addCase(getAllCategoriesAsync.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllCategoriesAsync.fulfilled, (state, action) => {
      state.categories = action.payload;
      state.isLoading = false;
    });

    // * CREATE
    builder.addCase(createCategoryAsync.pending, (state) => {
      state.isLoading = true;
      state.error = "";
    });
    builder.addCase(createCategoryAsync.fulfilled, (state, action) => {
      const body = action.payload;
      state.categories.push(body);
      state.created = body;

      alert("La categoria se ha guardado");

      state.isLoading = false;
    });
    builder.addCase(createCategoryAsync.rejected, (state, action) => {
      state.error = action.error.message;
      state.isLoading = false;
    });

    // // GETBYID
    // builder.addCase(getOneClientByIdAsync.pending, (state) => {
    //   state.isLoading = true;
    // });
    // builder.addCase(getOneClientByIdAsync.fulfilled, (state, action) => {
    //   const category = action.payload;
    //   state.category = category;
    //   state.isLoading = false;
    // });

    //* UPDATE
    builder.addCase(updateCategoryAsync.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateCategoryAsync.fulfilled, (state, action) => {
      const updated: Category = action.payload;
      const { id } = updated;
      const index = state.categories.findIndex((item) => item.id === id);
      state.categories[index] = updated;

      state.updated = updated;
      alert("La categoria se ha actualizado");
      state.isLoading = false;
    });

    //* DELETE

    builder.addCase(deleteCategoryAsync.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteCategoryAsync.fulfilled, (state, action) => {
      const deleted: Category = action.payload;
      const { id } = deleted;
      const index = state.categories.findIndex((item) => item.id === id);

      state.categories.splice(index, 1);
      alert("La categoria se ha eliminado");

      state.isLoading = false;
    });
  },
});

export const { setCategorySync, cleanCreatedCategorySync } =
  categorySlice.actions;
export const categoryReducer = categorySlice.reducer;
