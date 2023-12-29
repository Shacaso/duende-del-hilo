"use server";
import fs from "fs/promises";
import { User } from "../definitions";

const url = "./public/dbs/users.json";

let client: User = {
  id: "",
  name: "TEST",
  surname: "TEST",
  dni: 35123123,
  phoneNumber: 2615123123,
  email: "enzo@gmail.com",
  address: "Calle falsa 123",
  departament: "Ciudad",
  postalCode: 5539,
  blacklist: false,
  dischargeDate: "",
};

export const getAllClients = async () => {
  const res = await fs.readFile(url, "utf-8");
  const json = JSON.parse(res);

  return json;
};

export const createClient = async () => {
  try {
    console.log("entro a crear");

    let clients: User[] = await getAllClients();

    if (clients) {
      clients.push(client);
    } else {
      clients = [client];
    }
    const jsonData = JSON.stringify(clients, null, 2);

    await fs.writeFile(url, jsonData, "utf-8");

    console.log("client guardado");
  } catch (error) {
    return console.log(error);
  }
};
