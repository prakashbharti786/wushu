export default function({ store, env, redirect, route }) {
  // If the user is not authenticated redirect to sign in page with redirect url
  if (!store.getters['auth/isAuthenticated']) {
    return redirect('/')
  }
}
