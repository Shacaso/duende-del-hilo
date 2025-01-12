import { CustomError, Entity } from "./definitions";

const urlServer = "http://localhost:3000/api/";

export async function fetchGetAll(path: string) {
  const response = await fetch(urlServer + path, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    mode: "cors",
  })
    .then(async (res) => {
      if (!res.ok) {
        const message = await res.json();
        throw new CustomError(true, message.message);
      }
      return res.json();
    })
    .catch((e) => {
      console.log(e.message);
      // alert("Hubo un error en la API con el guardado del dato: " + e.message);
    });

  return response;
}

export async function fetchGetAllActives(path: string) {
  const response = await fetch(urlServer + path + "/actives", {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    mode: "cors",
  })
    .then(async (res) => {
      if (!res.ok) {
        const message = await res.json();
        throw new CustomError(true, message.message);
      }
      return res.json();
    })
    .catch((e) => {
      console.log(e.message);
      // alert("Hubo un error en la API con el guardado del dato: " + e.message);
    });

  return response;
}

export async function fetchGetAllNoActives(path: string) {
  const response = await fetch(urlServer + path + "/noActives", {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    mode: "cors",
  })
    .then(async (res) => {
      if (!res.ok) {
        const message = await res.json();
        throw new CustomError(true, message.message);
      }
      return res.json();
    })
    .catch((e) => {
      console.log(e.message);
      // alert("Hubo un error en la API con el guardado del dato: " + e.message);
    });

  return response;
}

export async function fetchGetById(id: string, path: string) {
  const response = await fetch(urlServer + path + "/" + id, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    mode: "cors",
  })
    .then(async (res) => {
      if (!res.ok) {
        const message = await res.json();
        throw new CustomError(true, message.message);
      }
      return res.json();
    })
    .catch((e) => {
      console.log(e.message);
      // alert("Hubo un error en la API con el guardado del dato: " + e.message);
    });

  return response;
}

export async function fetchPost<T extends Entity>(input: T, path: string) {
  const response = await fetch(urlServer + path, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  })
    .then(async (res) => {
      if (!res.ok) {
        const message = await res.json();
        throw new CustomError(true, message.message);
      }
      return res.json();
    })
    .catch((e) => {
      console.log(e.message);
      // alert("Hubo un error en la API con el guardado del dato: " + e.message);
    });

  return response;
}

export async function fetchPatch<T extends Entity>(
  id: string,
  input: T,
  path: string
) {
  const response = await fetch(urlServer + path + "/" + id, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  })
    .then(async (res) => {
      if (!res.ok) {
        const message = await res.json();
        throw new CustomError(true, message.message);
      }
      return res.json();
    })
    .catch((e) => {
      console.log(e.message);
      // alert("Hubo un error en la API con el guardado del dato: " + e.message);
    });

  return response;
}

export async function fetchDeleteById(id: string, path: string) {
  const response = await fetch(urlServer + path + "/" + id, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    mode: "cors",
  })
    .then(async (res) => {
      if (!res.ok) {
        const message = await res.json();
        throw new CustomError(true, message.message);
      }
      return res.json();
    })
    .catch((e) => {
      console.log(e.message);
      // alert("Hubo un error en la API con el guardado del dato: " + e.message);
    });

  return response;
}

export async function fetchGetAllBlacklist() {
  const response = await fetch(urlServer + "clients/" + "/blacklist", {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    mode: "cors",
  })
    .then(async (res) => {
      if (!res.ok) {
        const message = await res.json();
        throw new CustomError(true, message.message);
      }
      return res.json();
    })
    .catch((e) => {
      console.log(e.message);
      // alert("Hubo un error en la API con el guardado del dato: " + e.message);
    });

  return response;
}

export async function fetchGetAllNoBlacklist() {
  const response = await fetch(urlServer + "client/" + "/noBlacklist", {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    mode: "cors",
  })
    .then(async (res) => {
      if (!res.ok) {
        const message = await res.json();
        throw new CustomError(true, message.message);
      }
      return res.json();
    })
    .catch((e) => {
      console.log(e.message);
      // alert("Hubo un error en la API con el guardado del dato: " + e.message);
    });

  return response;
}
