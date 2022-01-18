// cli.js
import {
    LowSync,
    JSONFileSync
} from 'lowdb'

const title = process.argv[2]
const adapter = new JSONFileSync('./public/datas/file.json')
const db = new LowSync(adapter)

db.read()

if (!db.data)
    db.data = {
        posts: []
    }

db.data.posts.push({
    title
})

db.write()