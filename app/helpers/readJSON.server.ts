import fs from 'fs/promises'
import { User } from '~/models/user'

type ReadJSON = {
    [property: string]: User[]
}

const readJSON = async (): Promise<ReadJSON> => {
    const data = await fs.readFile('./app/db/data.json', 'utf-8')
    return JSON.parse(data)

}


export { readJSON }