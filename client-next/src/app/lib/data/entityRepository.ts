import { randomUUID } from "crypto"
import { CustomError, Entity, UserLogin } from "../definitions"
import { allEntities, saveAllEntities } from "./GetAndSaveJson"

export const getAll = async <T extends Entity>(path: string) => {
    const response = await allEntities<T>(path)
    if (response instanceof CustomError) return response
    
    return response
}

export const getAllActives = async <T extends Entity>(path: string) => {
    const response = await allEntities<T>(path)
    if (response instanceof CustomError) return response
    
    const activesEntities = response.filter((entity: T) => {
        return (
            !entity.dischargeDate
        )
    })

    return activesEntities
}

export const getAllNoActives = async <T extends Entity>(path: string) => {
    const response = await allEntities<T>(path)
    if (response instanceof CustomError) return response
    
    const activesEntities = response.filter((entity: T) => {
        return (
            entity.dischargeDate
        )
    })

    return activesEntities
}

export const getById = async <T extends Entity>(id: string, path: string) => {
    const response = await allEntities<T>(path)
    if (response instanceof CustomError) return response

    const entities: T[] = response

    const entity: T | undefined = entities.find(entity => entity.id == id)
    if (entity) return entity

    return new CustomError(true, 'Id no encontrado', 404)
}

export const create = async <T extends Entity>(input: T, path: string) => {

    const newEntity: T = {
        id: randomUUID(),
        ...input,
        dischargeDate: '',
    }

    const response = await allEntities<T>(path)
    if (response instanceof CustomError) return response

    let entities: T[] = response

    if (entities) {
        entities.push(newEntity)
    } else {
        entities = [newEntity]
    }

    const responseSave = await saveAllEntities<T>(entities, path)
    if (responseSave instanceof CustomError) return responseSave

    return newEntity

}

export const update = async <T extends Entity>(id: string, input: T, path: string) => {
    const response = await allEntities<T>(path)
    if (response instanceof CustomError) return response
    const entities: T[] = response

    const entityIndex = entities.findIndex(entity => entity.id === id)

    if (entityIndex === -1) return new CustomError(true, 'Id no encontrado', 404)

    entities[entityIndex] = {
        ...entities[entityIndex],
        ...input
    }

    const responseSave = await saveAllEntities<T>(entities, path)
    if (responseSave instanceof CustomError) return responseSave

    return entities[entityIndex]
}

export const hardDelete = async <T extends Entity>(id: string, path: string) => {
    const response = await allEntities<T>(path)
    if (response instanceof CustomError) return response
    const entities: T[] = response

    const entityAEliminar = entities.filter(entity => entity.id === id)

    if (entityAEliminar.length === 0) {
        return new CustomError(true, 'Id no encontrado', 404)
    } else {
        const newEntities = entities.filter(entity => entity.id !== id)
        const responseSave = await saveAllEntities<T>(newEntities, path)
        if (responseSave instanceof CustomError) return responseSave
        return entityAEliminar[0]
    }
}

export const logicDelete = async <T extends Entity>(id: string, path: string) => {
    const response = await allEntities<T>(path)
    if (response instanceof CustomError) return response
    const entities: T[] = response

    const entityIndex = entities.findIndex(entity => entity.id === id)
    if (entityIndex === -1) return new CustomError(true, 'Id no encontrado', 404)


    const [date, time] = new Date().toISOString().split('T')
    const [a, b] = time.split('.')

    const dischargeDate = {
        dischargeDate: date + ' ' + a
    }

    entities[entityIndex] = {
        ...entities[entityIndex],
        ...dischargeDate
    }

    const responseSave = await saveAllEntities<T>(entities, path)
    if (responseSave instanceof CustomError) return responseSave

    return entities[entityIndex]
}

export const login = async (input: UserLogin, path: string) => {
    const response = await allEntities<UserLogin>(path)
    if (response instanceof CustomError) return response
    const userRight: UserLogin = response

    if (input.user === userRight.user && input.password === userRight.password) {
        const response = {
            message: 'Login ok',
            status : 200
        }
        return response
    }

    const responseLogin: CustomError = new CustomError(true, 'User y/o contraseña invalidos', 400)
    return responseLogin

}

export const changePassword = async (input: UserLogin, path: string) => {
    const response = await allEntities<UserLogin>(path)
    if (response instanceof CustomError) return response
    let user: UserLogin = response

    user = {
        ...user,
        ...input
    }

    const responseSave = await saveAllEntities<UserLogin>(user, path)
    if (responseSave instanceof CustomError) return responseSave

    const responseOk = {
        message: 'Contraseña cambiada',
        status : 200
    }
    return responseOk

}