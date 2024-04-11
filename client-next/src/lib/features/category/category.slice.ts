import { Category } from "@/app/lib/definitions";
import {
  fetchGetAll,
  fetchPost,
  fetchGetById,
  fetchPatch,
} from "@/app/lib/fetching";

import {
  type PayloadAction,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";

// thunk functions
export const getAllCategoriesAsync = createAsyncThunk(
  "category/getAll",
  async () => {
    const categories: Category[] = await fetchGetAll("categories");
    return categories;
  }
);
// export const createClientAsync = createAsyncThunk(
//   "category/create",
//   async (newClient: Category) => {
//     const created = await await fetchPost(newClient, "clients");
//     return created;
//   }
// );
// export const getOneClientByIdAsync = createAsyncThunk(
//   "category/getOneById",
//   async (id: string) => {
//     const category = await fetchGetById(id, "clients");
//     return category;
//   }
// );
// export const updateClientAsync = createAsyncThunk(
//   "category/update",
//   async (modified: Category) => {
//     const updated = await fetchPatch(modified.id, modified, "clients");
//     return updated;
//   }
// );
interface State {
  categories: Category[];
  isLoading: boolean;
  category?: Category;
  created?: Category;
  error?: string;
}

const initialState: State = {
  categories: [],
  isLoading: false,
};

export const categorySlice = createSlice({
  name: "categories",
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
    // GETALL
    builder.addCase(getAllCategoriesAsync.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllCategoriesAsync.fulfilled, (state, action) => {
      state.categories = action.payload;
      state.isLoading = false;
    });

    // * CREATE
    // builder.addCase(createClientAsync.pending, (state) => {
    //   state.isLoading = true;
    //   state.error = "";
    // });
    // builder.addCase(createClientAsync.fulfilled, (state, action) => {
    //   const newClient = action.payload;
    //   state.clients.push(newClient);
    //   state.created = newClient;
    //   state.isLoading = false;
    // });
    // builder.addCase(createClientAsync.rejected, (state, action) => {
    //   state.error = action.error.message;
    //   state.isLoading = false;
    // });

    // // GETBYID
    // builder.addCase(getOneClientByIdAsync.pending, (state) => {
    //   state.isLoading = true;
    // });
    // builder.addCase(getOneClientByIdAsync.fulfilled, (state, action) => {
    //   const category = action.payload;
    //   state.category = category;
    //   state.isLoading = false;
    // });

    // // UPDATE
    // builder.addCase(updateClientAsync.pending, (state) => {
    //   state.isLoading = true;
    // });
    // builder.addCase(updateClientAsync.fulfilled, (state, action) => {
    //   const updated = action.payload;
    //   const id = updated.id;
    //   const index = state.clients.findIndex((item) => item.id === id);
    //   state.clients[index] = updated;
    //   state.isLoading = false;
    // });
  },
});

export const { setCategorySync, cleanCreatedCategorySync } =
  categorySlice.actions;
export const categoryReducer = categorySlice.reducer;
