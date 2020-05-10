// Token Refresh
// eslint-disable-next-line no-unused-vars
const isAlreadyFetchingAccessToken = false
let subscribers = []

// eslint-disable-next-line no-unused-vars
function onAccessTokenFetched(accessToken) {
  subscribers = subscribers.filter((callback) => callback(accessToken))
}

// eslint-disable-next-line no-unused-vars
function addSubscriber(callback) {
  subscribers.push(callback)
}

export default function({ $axios, store }) {
  $axios.onRequest((config) => {
    config.headers['Content-Type'] = 'application/json'
    config.headers['Access-Control-Allow-Origin'] = '*'
    if (store.getters['auth/isAuthenticated']) {
      config.headers.Authorization = `Bearer ${store.getters['auth/token']}`
    }
  })
  $axios.interceptors.response.use(
    (response) => {
      return response
    },
    function(error) {
      return Promise.reject(error.response)
    }
  )
}
