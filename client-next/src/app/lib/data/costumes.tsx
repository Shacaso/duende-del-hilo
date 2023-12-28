'use server'
import fs from 'fs/promises'
import { Costume } from '../definitions'

const url = './public/dbs/costumes.json'

let costume: Costume= {
    id: '',
    name: 'prueba',
    price: 123,
    category: '123123',
    details: 'string',
    discharge: '',
}

export const getAllCostumes = async () => {
    
    const res = await fs.readFile(url, 'utf-8')
    const json = JSON.parse(res)
    
    return json
}

export const createCostume = async () => {
    try {
        console.log('entro a crear')
        

        let costumes: Costume[] = await getAllCostumes()
        
        if (costumes) {
            costumes.push(costume)
        } else {
            costumes = [costume]
        }
        const jsonData = JSON.stringify(costumes, null, 2)

        await fs.writeFile(url, jsonData, 'utf-8')

        console.log('costume guardado')
    } catch (error) {
        return console.log(error)
    }
}