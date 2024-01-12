export default function ({ store, redirect, app }) {
  if (!store.state.auth && !app.$cookies.get('token')) {
    return redirect('/login')
  }
}
