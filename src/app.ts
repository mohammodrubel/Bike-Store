import cors from 'cors'
import express, { Application, Request, Response } from 'express'
import globalErrorHandler from './app/Error/global__Error'
import router from './app/router/router'
const app: Application = express()
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import morgan from 'morgan';


// parser
app.use(morgan('dev'));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(cookieParser())
app.use(
  cors({
    origin: ['http://localhost:3000'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders:
      'Content-Type, Authorization, Origin, X-Requested-With, Accept', 
    credentials: true, 
  })
);


// router
app.use('/api', router)

app.get('/', (req: Request, res: Response) => {
  res.send('server is running ...!')
})


app.use(globalErrorHandler)

export default app
