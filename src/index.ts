import {app} from './app'
import {SETTINGS} from './settings'
import {runDB} from "./db/mongoDB";

const startApp = async () => {
    const res = await runDB(SETTINGS.MONGO_URL)
    if(!res) process.exit(1)
}

app.listen(SETTINGS.PORT, async () => {
   await startApp()
    console.log('...server started in port ' + SETTINGS.PORT)
})