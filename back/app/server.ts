import express from 'express'
import ApiEdificioRoute from '../api/routes/route.api.edificios'
import ApiInstalacionesRoute from '../api/routes/route.api.instalaciones'
import ApiDispositivosRoute from '../api/routes/route.api.dispositivos'
import ApiAuthRoute from '../api/routes/route.api.auth'
import cors from 'cors'


const app = express()

app.use(express.urlencoded({ extended: true }));
app.use("/", express.static("public"));
app.use(express.json());                        
app.use(cors())


app.use('/api', ApiEdificioRoute)
app.use('/api', ApiInstalacionesRoute)
app.use('/api', ApiDispositivosRoute)
app.use('/api', ApiAuthRoute)


app.listen(2024)