import fs from 'fs/promises'


const writeJSON = async (data: any[]) => {

    const jsonDB = {
        users: data
    }

    await fs.writeFile('./app/db/data.json', JSON.stringify(jsonDB, null, 4))

}


export { writeJSON }