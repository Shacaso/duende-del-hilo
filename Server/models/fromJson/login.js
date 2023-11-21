import { allEntities, saveAllEntities } from './funcionesGETSAVE.js'

export class LoginModel {
    constructor({ jsonPath }) {
        this.jsonPath = jsonPath
    }

    login = async ({ input }) => {
        const { errorGet, messageGet } = await allEntities(this.jsonPath)
        if (errorGet) return { error: true, message: messageGet, codigo: 500 }
        const login = messageGet

        if (login.user === input.user && login.password === input.password) {
            return { error: false, message: {message: "Login ok"} }
        } else {
            return { error: true, message: "Usuario y contraseña inválidos", codigo: 400 }
        }        
    }

    changePassword = async ({ input }) => {
        const { errorGet, messageGet } = await allEntities(this.jsonPath)
        if (errorGet) return { error: true, message: messageGet, codigo: 500 }

        let login = messageGet
        
        login = {
            ...login,
            ...input
        }

        const { errorSave, messageSave } = await saveAllEntities(login, this.jsonPath)
        if (errorSave === true) return { error: true, message: messageSave, codigo: 500 }

        return { error: false, message: {message: "Contraseña cambiada"} }

    }
}