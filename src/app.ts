import cors from 'cors'
import express, { Application, Request, Response } from 'express'
import globalErrorHandler from './app/Error/global__Error'
import router from './app/router/router'
const app: Application = express()
import cookieParser from 'cookie-parser'


// parser
app.use(express.json())
app.use(
  cors({
    origin: ['http://localhost:5173'], 
    credentials: true, 
  })
);
app.use(cookieParser())

// router
app.use('/api', router)

app.get('/', (req: Request, res: Response) => {
  res.send('server is running ...!')
})


app.use(globalErrorHandler)

export default app
