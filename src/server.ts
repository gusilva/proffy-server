import express from 'express'
import swaggerUI from 'swagger-ui-express'
import cors from 'cors'
import routes from './routes/routes'
import yaml from 'yamljs'

const swaggerDoc = yaml.load('./src/swagger/swagger.yaml')
const app = express()

app.use(cors())
app.use(express.json())
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDoc))
app.use('/api/v1', routes)

export { app }
