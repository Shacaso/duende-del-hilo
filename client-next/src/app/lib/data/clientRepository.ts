import { Client, CustomError } from "../definitions"
import { allEntities } from "./GetAndSaveJson"
import { clientsPath } from "./paths"


export const getBlacklistClient = async () => {

    const response = await allEntities<Client>(clientsPath)
    if (response instanceof CustomError) return response
    const blacklistClient = response.filter((client: Client) => {
        return (
            !client.dischargeDate && (client.blacklist === true)
        )
    })
    
    return blacklistClient

}

export const getAllNoBlacklistClient = async () => {

    const response = await allEntities<Client>(clientsPath)
    if (response instanceof CustomError) return response

    const blacklistClient = response.filter((client: Client) => {
        return (
            !client.dischargeDate && !client.blacklist
        )
    })

    return blacklistClient

}