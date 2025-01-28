import dotenv from 'dotenv'
import path from 'path'

dotenv.config({path:path.join((process.cwd(),'.env'))})

export default {
    node__env:process.env.NODE_ENV,
    port : process.env.PORT ,
    mongoose__connection : process.env.MONGOOSE_CONNECTION_URL,
    jwt__access__token__secret:process.env.JWT__ACCESS__TOKEN,
    jwt__refresh__token__secret:process.env.JWT__REFRESH__TOKEN,
    jwt__access__token__time:process.env.JWT__ACCESS__TOKEN__EXPIRE__TIME,
    jwt__refresh__token__time:process.env.JWT__REFRESH__TOKEN__EXPIRE__TIME
}