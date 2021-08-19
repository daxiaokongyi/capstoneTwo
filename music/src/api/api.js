import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class musicApi {
    // the token for interactive with the API will be stored here.
    static token;
    
    static async request (endpoint, data = {}, method= "get") {
        console.debug("API Call:", endpoint, data, method);
        const url = `${BASE_URL}/${endpoint}`;
        const headers = {Authorization: `Bearer ${musicApi.token}`};
        const params = (method === 'get') ? data : {};

        try {
            return (await axios({url, method, data, params, headers})).data;
        } catch (error) {
            console.error("API Error:", error.response);
            let message = error.response.data.error.message;
            throw Array.isArray(message) ? message: [message];
        }
    }

    // Individual API routes

    /** Get the current user */
    static async getCurrentUser(username) {
        let res = await this.request(`users/${username}`);
        return res.user;
    }

    /** set a song as user's favorite one */
    static async setFavorite(username, songId) {
        await this.request(`users/${username}/songs/${songId}`, {}, 'post');
    }

    /** get token for login with username and password */
    static async login(data) {
        let res = await this.request('auth/token', data, 'post');
        return res.token;
    }

    /** signup for site */
    static async signup (data) {
        let res = await this.request(`auth/register`, data, 'post');
        return res.token;
    }

    /** Save the update for user profile */
    static async saveProfile(username, data) {
        let res = await this.request(`users/${username}`, data, 'patch');
        return res.user;
    }
}

export default musicApi;


