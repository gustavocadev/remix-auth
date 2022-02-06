import fs from 'fs/promises'
import path from 'path';


const dataPath = path.join(__dirname, '../../db/data.json')
console.log(__dirname);

const writeJSON = async (data: any[]) => {

    const jsonDB = {
        users: data
    }

    await fs.writeFile(dataPath, JSON.stringify(jsonDB, null, 4))

}


export { writeJSON }