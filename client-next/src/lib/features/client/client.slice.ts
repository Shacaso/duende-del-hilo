import { Client } from "@/app/lib/definitions";
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

const path = "clients";

// thunk functions
export const getAllClientsAsync = createAsyncThunk(
  "client/getAll",
  async (): Promise<Client[]> => {
    const clients: Client[] = await fetchGetAll(path);
    return clients;
  }
);
export const createClientAsync = createAsyncThunk(
  "client/create",
  async (body: Client): Promise<Client> => {
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
export const updateClientAsync = createAsyncThunk(
  "client/update",
  async (body: Client): Promise<Client> => {
    return await fetchPatch(body.id, body, path);
  }
);

export const deleteClientAsync = createAsyncThunk(
  "client/delete",
  async (id: string): Promise<Client> => {
    return await fetchDeleteById(id, path);
  }
);

interface State {
  clients: Client[];
  isLoading: boolean;
  client?: Client;
  created?: Client;
  updated?: Client;
  error?: string;
}

const initialState: State = {
  clients: [],
  isLoading: false,
};

export const clientSlice = createSlice({
  name: "client",
  initialState,
  reducers: {
    setClientSync(state, action: PayloadAction<Client>) {
      return { ...state, client: action.payload };
    },
    cleanCreatedClientSync(state) {
      const { created, ...newState } = state;
      return { ...newState };
    },
  },
  extraReducers(builder) {
    //* GETALL
    builder.addCase(getAllClientsAsync.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllClientsAsync.fulfilled, (state, action) => {
      state.clients = action.payload;
      state.isLoading = false;
    });

    // * CREATE
    builder.addCase(createClientAsync.pending, (state) => {
      state.isLoading = true;
      state.error = "";
    });
    builder.addCase(createClientAsync.fulfilled, (state, action) => {
      const body = action.payload;
      state.clients.push(body);
      state.created = body;
      alert("El cliente se ha guardado");
      state.isLoading = false;
    });
    builder.addCase(createClientAsync.rejected, (state, action) => {
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
    builder.addCase(updateClientAsync.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateClientAsync.fulfilled, (state, action) => {
      const updated: Client = action.payload;
      const { id } = updated;
      const index = state.clients.findIndex((item) => item.id === id);
      state.clients[index] = updated;
      state.updated = updated;
      alert("El cliente se ha actualizado");
      state.isLoading = false;
    });

    //* DELETE
    builder.addCase(deleteClientAsync.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteClientAsync.fulfilled, (state, action) => {
      const deleted: Client = action.payload;
      const { id } = deleted;
      const index = state.clients.findIndex((item) => item.id === id);
      state.clients.splice(index, 1);
      alert("El cliente se ha eliminado");
      state.isLoading = false;
    });
  },
});

export const { setClientSync, cleanCreatedClientSync } = clientSlice.actions;
export const clientReducer = clientSlice.reducer;
