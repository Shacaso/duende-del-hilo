import { Client, CustomError } from "../definitions";
import { allEntities } from "./GetAndSaveJson";
import { clientsPath } from "./paths";

export const getBlacklistClient = async () => {
	const response = await allEntities<Client>(clientsPath);
	if (response instanceof CustomError) return response;
	const blacklistClient = response.filter((client: Client) => {
		return client.blacklist === true;
	});

	return blacklistClient;
};

export const getAllNoBlacklistClient = async () => {
	const response = await allEntities<Client>(clientsPath);
	if (response instanceof CustomError) return response;

	const blacklistClient = response.filter((client: Client) => {
		return !client.blacklist;
	});

	return blacklistClient;
};

export async function getClientByDNI(
	dniClient: number
): Promise<Client | CustomError> {
	const responseClient: Client[] | CustomError = await allEntities<Client>(
		clientsPath
	);

	if (responseClient instanceof CustomError) return responseClient;
	let clientFound: Client = responseClient.filter((client: Client) => {
		return client.dni === dniClient;
	})[0];

	return clientFound;
}
