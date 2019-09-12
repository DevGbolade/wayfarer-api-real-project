import TripService from '../services/tripServices';
import ResponseGenerator from '../utilities/responseUtilities';

const response = new ResponseGenerator();

class TripController {
  /**
   * @param {object} request express request object
   * @param {object} response express request object
   * @returns {json} json
   * @memberof TripController
   */

  static async addTrip(req, res) {
    try {
      const trip = await TripService.addTrip(req);
      if (trip) {
        return response.sendSuccess(res, 200, trip);
      }
      return response.sendError(res, 500, 'Something went wrong');
    } catch (err) {
      return response.sendError(res, 400, err.message);
    }
  }

  static async getAll(req, res) {
    try {
      const trip = await TripService.getAllTrips(req);
      if (trip) {
        return response.sendSuccess(res, 200, trip);
      }
      return response.sendError(res, 500, 'Something went wrong');
    } catch (err) {
      return response.sendError(res, 400, err.message);
    }
  }
}

export default TripController;
