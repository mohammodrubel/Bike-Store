import dotenv from 'dotenv'
import path from 'path'

dotenv.config({path:path.join((process.cwd(),'.env'))})

export default {
    node__env:process.env.NODE_ENV,
    port : process.env.PORT ,
    mongoose__connection : process.env.MONGOOSE_CONNECTION_URL
}