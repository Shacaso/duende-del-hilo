"use client";
import { useAppSelector, useAppDispatch } from "@/lib/store";
import {
  getAllClientsAsync,
  //   getOneClientByIdAsync,
  //   createClientAsync,
  //   updateClientAsync,
  setClientSync,
  cleanCreatedClientSync,
} from "@/lib/features/client/client.slice";
import { Client } from "@/app/lib/definitions";

export function useClient() {
  const dispatch = useAppDispatch();
  const { clients, isLoading, client, created, error } = useAppSelector(
    (state) => state.clients
  );

  function getAllClients() {
    clients.length === 0 && dispatch(getAllClientsAsync());
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
  function setClient(client: Client) {
    dispatch(setClientSync(client));
  }
  function cleanCreatedClient() {
    dispatch(cleanCreatedClientSync());
  }

  return {
    clients,
    isLoading,
    client,
    created,
    error,
    getAllClients,
    // getOneClientById,
    // createClient,
    // updateClient,
    setClient,
    cleanCreatedClient,
  };
}
