// cli.js
import {
    LowSync,
    JSONFileSync
} from 'lowdb'

const title = process.argv[2]
const adapter = new JSONFileSync('./public/datas/db.json')
const db = new LowSync(adapter)

db.read()

if (!db.data)
    db.data = [];

console.table(db.data);

// db.data.push({
//     title
// })

// db.write()