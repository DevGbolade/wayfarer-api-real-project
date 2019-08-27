import dotenv from 'dotenv';
import { Pool, Client } from 'pg';

import keys from '../utilities/configUtilities';

const { psqlUrl, psqlTest } = keys;
dotenv.config();

const pool = new Pool({
  connectionString: psqlUrl
});

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});


export default pool;
