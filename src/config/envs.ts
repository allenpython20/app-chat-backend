import 'dotenv/config'
import {get} from 'env-var'

export class Envs {



    public static readonly PORT = get('PORT').required().asPortNumber()
    public static readonly MONGO_DB_NAME = get('MONGO_DB_NAME').required().asString()
    public static readonly MONGO_URL = get('MONGO_URL').required().asString()
    public static readonly JWT_SEED = get('JWT_SEED').required().asString()
    
}