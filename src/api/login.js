/**
 * Mocking client-server processing
 */

const LATENCY = 3000;

export default {
    mockLogin(data, cb) {
        console.log('data for login ajax', data);
        const user = {
            name: 'win',
            last_login_time: '2019-01-17',
            interests: ['action'],
            about: '',
            review_count: 92,
            favorites: []
        }
        setTimeout(function () {
            cb(user)
        }, LATENCY)
    },
    mockLogout(cb) {
        setTimeout(function () {
            cb()
        }, LATENCY)
    }
}