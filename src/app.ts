import express, { Application, NextFunction, Request, Response } from 'express'
import cors from 'cors'
import { productRouter } from './app/module/product/product.router'
import { orderRouter } from './app/module/order/order.router'
const app: Application = express()

// parser
app.use(express.json())
app.use(cors())

// router
app.use('/api', productRouter)
app.use('/api', orderRouter)

app.get('/', (req: Request, res: Response) => {
  res.send('server is running ...!')
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
app.use((err: any, req: Request, res: Response, _next: NextFunction) => {
  res.status(500).json({
    success: false,
    message: err.message || 'Internal Server Error',
    error: err,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  })
})

export default app
