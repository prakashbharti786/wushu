export default function({ store, env, redirect, route }) {
  // If the user is not authenticated redirect to sign in page with redirect url
  if (!store.getters['auth/isAuthenticated']) {
    let redirectUrl = env.baseUrl + route.fullPath.substring(1)
    redirectUrl = encodeURIComponent(redirectUrl)
    return redirect(
      env.baseUrl + 'auth/signin?service=app&continue=' + redirectUrl
    )
  }
}
