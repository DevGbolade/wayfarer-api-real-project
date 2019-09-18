import ResponseGenerator from '../utilities/responseUtilities'
import UserService from '../services/userServices';
const response = new ResponseGenerator();

class AuthController {
  /**
   * @param {object} request express request object
   * @param {object} response express request object
   * @returns {json} json
   * @memberof UserController
   */

  static async signup(req, res) {
    try {
      const user = await UserService.addUser(req);
      if (user) {
        return response.sendSuccess(
          res,
          201,
          user,
        );
        
      }
      return response.sendError(res, 500, 'Something went wrong');
    } catch (err) {
      return response.sendError(res, 400, err.message);
    }
  }

  static async signin(req, res) {
    try {
      const user = await UserService.login(req);
      if (user) {
        return response.sendSuccess(
          res,
          200,
          user,
        );
      }
      return response.sendError(res, 500, 'Something went wrong');
    } catch (err) {
      return response.sendError(res, 400, err.message);
    }
  }
}


export default AuthController;






















































// const findByEmail = async (param) => {

  
//   try {
    
//   const query = `SELECT * from users WHERE email = $1 `;
//     const {rows} = await pool.query(query, param);

//     return rows[0];
//   } catch (err) {
//     throw err;
//   }
// };

// const insertIntoDB =  async (columns, selector, values) => {
//   const query = `INSERT INTO ${
//     this.table
//   } (${columns}) VALUES(${selector}) RETURNING *`;
//   try {
//     const response = await this.pool.query(query, values);
//     return response;
//   } catch (err) {
//     throw err;
//   }
// }

// const createANewUser = async (req, is_admin, password) => {
//   try {
//     const { rows } = await insertIntoDB(
//       'email, first_name, last_name, is_admin, password',
//       '$1, $2, $3, $4, $5',
//       [req.email, req.first_name, req.last_name, is_admin, password],
//     );
//     return rows[0];
//   } catch (err) {
//     throw err;
//   }
// }




// exports.register = async (req, res) => {

//   try {
//     const {
//       email,
//       first_name,
//       last_name,
//       password,
//       is_admin
//     } = req.body;
  
//     const foundUser = await findByEmail([email]);
  
//     if (foundUser) {
//       throw new Error('Email is already in use');
//     }
  
  
//   const hashedPassword = await GeneralUtils.hash(password);



  
//   const text = `
//   INSERT INTO 
//   users(email, first_name, last_name, password, is_admin)
//   VALUES($1, $2, $3, $4, $5) 
//   returning user_id, email, first_name, last_name, is_admin, password`;
//   const value = [email, first_name, last_name, hashedPassword, is_admin];
//   const {rows} = await pool.query(text, value)



//   const token = GeneralUtils.signToken(rows[0].user_id);
  
  
  
//   return res.status(201).json({
//     status: "success",
//     data:{
//       token,
//       user: rows[0],
//     }
//   });
    
//   } catch (error) {
//     throw error;
    
//   }
 

// }

// exports.login = async (req, res) =>{

//   if(!email && !password ) {
//       throw new Error('Please supply login credentials');
//   }


//   const {
//     email,
//     password
//   } = req.body

//   const foundEmail = await findByEmail([email]);

//   if(!foundEmail && !password ) {
//     throw new Error('Email or Password incorrect');

//   }
  
// }