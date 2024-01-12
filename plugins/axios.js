export default function ({ $axios, $cookies,app }, inject) {
  const api = $axios.create({
    baseURL: 'https://oas.api.training-stands.nextcontact.ru',
    headers: {
      Authorization: `Bearer ${app.$cookies.get('token')}`,

    },
  })
  inject('api', api)
}
