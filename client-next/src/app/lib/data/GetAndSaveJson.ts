"use server";
import { readFile, writeFile } from "fs/promises";
import { copy } from "fs-extra";
import { CustomError, Entity, UserLogin } from "../definitions";

export async function allEntities<T extends Entity | UserLogin>(path: string) {
	try {
		const data = await readFile(path, "utf-8");
		const jsonData = JSON.parse(data);

		if (jsonData && jsonData.password) {
			return jsonData;
		} else if (jsonData) {
			const entities: T[] = jsonData;
			return entities;
		} else {
			const entities: T[] = [];
			return entities;
		}
	} catch (e: Error | any) {
		return new CustomError(true, e.message, 500);
	}
}

export async function saveAllEntities<T extends Entity | UserLogin>(
	data: T[] | UserLogin,
	path: string
) {
	try {
		const jsonData = JSON.stringify(data, null, 2);

		await writeFile(path, jsonData, "utf-8");

		const backupPath = path.replace("./public/dbs/", "C:\\Dbs\\");

		await copy(path, backupPath);

		return true;
	} catch (e: Error | any) {
		return new CustomError(true, e.message, 500);
	}
}
