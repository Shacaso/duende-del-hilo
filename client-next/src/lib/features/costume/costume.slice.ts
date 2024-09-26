import { Costume, CostumeDTO } from "@/app/lib/definitions";
import {
  fetchGetAll,
  fetchPost,
  fetchGetById,
  fetchPatch,
  fetchDeleteById,
} from "@/app/lib/fetching";
import { RootState } from "@/lib/store";

import {
  type PayloadAction,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";

const path = "costumes";

// thunk functions
export const getAllAsync = createAsyncThunk(
  "costume/getAll",
  async (): Promise<Costume[]> => {
    const costumes = await fetchGetAll(path);
    // console.log(costumes);

    return costumes;
  }
);
export const createAsync = createAsyncThunk(
  "costume/create",
  async (body: CostumeDTO): Promise<Costume> => {
    try {
      return await fetchPost(body, path);
    } catch (error) {
      console.error("Error updating costume:", error);
      alert("Error updating costume:");
      throw error;
    }
  }
);
// export const getOneClientByIdAsync = createAsyncThunk(
//   "client/getOneById",
//   async (id: string) => {
//     const client = await fetchGetById(id, "clients");
//     return client;
//   }
// );
export const updateAsync = createAsyncThunk(
  "costume/update",
  async (body: CostumeDTO, { getState }): Promise<Costume> => {
    try {
      const state = getState() as RootState;
      const categories = state.categories.categories;
      const res: CostumeDTO = await fetchPatch(body.id, body, path);

      const categoryObject = categories.find((u) => u.name === res.category);

      if (!categoryObject) {
        throw new Error(`Category with name "${res.category}" not found.`);
      }

      const data: Costume = { ...res, category: categoryObject };

      return data;
    } catch (error) {
      console.error("Error updating costume:", error);
      throw error;
    }
  }
);
export const deleteAsync = createAsyncThunk(
  "costume/delete",
  async (id: string): Promise<Costume> => {
    return await fetchDeleteById(id, path);
  }
);

interface State {
  costumes: Costume[];
  isLoading: boolean;
  costume?: Costume;
  created?: Costume;
  updated?: Costume;
  error?: string;
}

const initialState: State = {
  costumes: [],
  isLoading: false,
};

export const costumeSlice = createSlice({
  name: "costume",
  initialState,
  reducers: {
    setCostumeSync(state, action: PayloadAction<Costume>) {
      return { ...state, client: action.payload };
    },
    cleanCreatedCostumeSync(state) {
      const { created, ...newState } = state;
      return { ...newState };
    },
  },
  extraReducers(builder) {
    // GETALL
    builder.addCase(getAllAsync.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllAsync.fulfilled, (state, action) => {
      state.costumes = action.payload;
      state.isLoading = false;
    });

    // * CREATE
    builder.addCase(createAsync.pending, (state) => {
      state.isLoading = true;
      state.error = "";
    });
    builder.addCase(createAsync.fulfilled, (state, action) => {
      const body: Costume = action.payload;
      state.costumes.push(body);
      state.created = body;
      alert("El disfraz se ha guardado");
      state.isLoading = false;
    });
    builder.addCase(createAsync.rejected, (state, action) => {
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
    builder.addCase(updateAsync.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateAsync.fulfilled, (state, action) => {
      const updated: Costume = action.payload;
      const { id } = updated;
      const index = state.costumes.findIndex((item) => item.id === id);
      state.costumes[index] = updated;
      state.updated = updated;
      alert("El disfraz se ha actualizado");
      state.isLoading = false;
    });

    //* DELETE
    builder.addCase(deleteAsync.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteAsync.fulfilled, (state, action) => {
      const deleted: Costume = action.payload;
      const { id } = deleted;
      const index = state.costumes.findIndex((item) => item.id === id);
      state.costumes.splice(index, 1);
      alert("El disfraz se ha eliminado");
      state.isLoading = false;
    });
  },
});

export const { setCostumeSync, cleanCreatedCostumeSync } = costumeSlice.actions;
export const costumeReducer = costumeSlice.reducer;
