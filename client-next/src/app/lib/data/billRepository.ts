import { randomUUID } from "crypto"
import { Bill, CustomError } from "../definitions"
import { allEntities, saveAllEntities } from "./GetAndSaveJson"


export const create = async (input: Bill, path: string) => {
    const response = await allEntities<Bill>(path)
    if (response instanceof CustomError) return response
    let entities: Bill[] = response

    let lastBill = 1

    if (entities.length !== 0) {
        lastBill = entities[entities.length - 1].billNumber + 1
    }

    const [date, time] = new Date().toISOString().split('T')
    const [a, b] = time.split('.')

    const newBill: Bill = {
        id: randomUUID(),
        billNumber: lastBill,
        date: date + ' ' + a,
        ...input
    }



    if (entities) {
        entities.push(newBill)
    } else {
        entities = [newBill]
    }

    const responseSave = await saveAllEntities<Bill>(entities, path)
    if (responseSave instanceof CustomError) return responseSave

    return newBill

}