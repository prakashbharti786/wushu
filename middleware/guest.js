export default function({ store, env, redirect, route }) {
  // If the user is authenticated redirect to home page
  if (store.getters['auth/isAuthenticated']) {
    return redirect('/')
  }
}
