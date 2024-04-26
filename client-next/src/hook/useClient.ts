"use client";
import { useAppSelector, useAppDispatch } from "@/lib/store";
import {
  getAllClientsAsync,
  //   getOneClientByIdAsync,
  createClientAsync,
  updateClientAsync,
  deleteClientAsync,
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
  function deleteClient(id: string) {
    dispatch(deleteClientAsync(id));
  }
  //   function getOneClientById(id: string) {
  //     dispatch(getOneClientByIdAsync(id));
  //   }
  function createClient(body: Client) {
    dispatch(createClientAsync(body));
  }
  function updateClient(body: Client) {
    dispatch(updateClientAsync(body));
  }
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
    deleteClient,
    createClient,
    updateClient,
    setClient,
    cleanCreatedClient,
  };
}
