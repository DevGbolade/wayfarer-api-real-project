import UserService from '../services/userServices';
import ResponseGenerator from '../utilities/responseUtilities';

const response = new ResponseGenerator();


class User {

static async getAll(req, res) {
    try {
      const users = await UserService.getAllUsers();
      if (users) {
        return response.sendSuccess(res, 200, users, users.length);
      }
      return response.sendError(res, 500, 'Something went wrong');
    } catch (err) {
      return response.sendError(res, 400, err.message);
    }
  }

  static async deleteAll(){
      try {

        await UserService.deleteAll();
        return response.sendError(res, 204, err.message);


          
      } catch (error) {
          
      }

  }

}
export default User;