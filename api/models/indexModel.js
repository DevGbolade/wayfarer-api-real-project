import dotenv from 'dotenv';
import { Pool, Client } from 'pg';

import keys from '../utilities/configUtilities';
dotenv.config({ path: './config.env'});

const {
  psqlUrl,
  psqlTest,
  travisDb
} = keys;



const pool = new Pool({
  connectionString: process.env.NODE_ENV === 'test' ? travisDb : psqlUrl
  // ssl: true
});

// const pool = new Pool({
//   connectionString: psqlUrl
// });

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});


export default pool;
