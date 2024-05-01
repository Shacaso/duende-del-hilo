import { Costume } from "@/app/lib/definitions";
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

const path = "costumes";

// thunk functions
export const getAllAsync = createAsyncThunk(
  "costume/getAll",
  async (): Promise<Costume[]> => {
    return await fetchGetAll(path);
  }
);
export const createAsync = createAsyncThunk(
  "costume/create",
  async (body: Costume): Promise<Costume> => {
    return await fetchPost(body, path);
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
  async (body: Costume): Promise<Costume> => {
    return await fetchPatch(body.id, body, path);
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
      const body = action.payload;
      state.costumes.push(body);
      state.created = body;
      alert("La categoria se ha guardado");
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
      alert("La categoria se ha actualizado");
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
      alert("La categoria se ha eliminado");
      state.isLoading = false;
    });
  },
});

export const { setCostumeSync, cleanCreatedCostumeSync } = costumeSlice.actions;
export const costumeReducer = costumeSlice.reducer;
