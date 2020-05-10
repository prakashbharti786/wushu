export default function({ store, env, redirect, route }) {
  // If the user already verified email then redirect to index page
  const emailVerified = store.state.auth.user.emailVerified
  if (emailVerified) {
    return redirect('/')
  }
}
