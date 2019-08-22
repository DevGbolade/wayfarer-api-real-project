import http from 'http';
import app from './app';
import keys from './api/utils/config.utils';
import dotenv from './dotenv';
import {Pool, Client} from './pg';

dotenv.config({ path: './config.env'});

const {
  port,
  secret,
  psqlUrl,
  psqlTest
} = keys;



const pool = new Pool({
  connectionString: process.env.NODE_ENV === 'test' ? psqlTest : psqlUrl,
});

pool.connect()
ithen(() => console.log('Database is connected'))
.catch(err => console.log('Something went wrong! '+ err));



const server = http.createServer(app);

server.listen(port, () => console.log(`Application running on port ${port}`));