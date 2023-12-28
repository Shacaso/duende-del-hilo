
const url = 'http://localhost:1234/costumes'

export const getAllCostumes = async () => {
    
    const res = await fetch(url)
    const json = res.json()

    return json
}