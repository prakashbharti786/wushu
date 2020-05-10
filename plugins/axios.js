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
