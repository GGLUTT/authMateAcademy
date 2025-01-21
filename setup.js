import 'dotenv/config';

import { User } from './login-server/src/models/user.js'
import { client } from './login-server/src/utils/db.js'


client.sync({force: true})