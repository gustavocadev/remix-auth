import fs from 'fs/promises'
import { User } from '~/models/user'
import path from 'path'

type ReadJSON = {
    [property: string]: User[]
}

const dataPath = path.join(__dirname, '../../db/data.json')
console.log(path.join(__dirname, '../../db/data.json'));

const readJSON = async (): Promise<ReadJSON> => {
    const data = await fs.readFile(dataPath, 'utf-8')
    return JSON.parse(data)

}


export { readJSON }