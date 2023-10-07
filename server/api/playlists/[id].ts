import axios from 'axios'

const config = {
  method: 'get',
  maxBodyLength: Infinity,
  url: 'https://play.radiojavan.com/api/p/mp3_playlist_with_items?id=',
  headers: {
    'sec-ch-ua':
      '"Microsoft Edge";v="117", "Not;A=Brand";v="8", "Chromium";v="117"',
    'sec-ch-ua-mobile': '?0',
    'User-Agent':
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36 Edg/117.0.2045.40',
    Accept: 'application/json, text/plain, */*',
    'x-rj-user-agent':
      'Radio Javan/4.0.2/8628502c9ebf6c174520fdda144362ad799d4d48 com.radioJavan.rj.web',
    Referer: 'https://play.radiojavan.com/',
    'x-api-key':
      '40e87948bd4ef75efe61205ac5f468a9fd2b970511acf58c49706ecb984f1d67',
    'sec-ch-ua-platform': '"Windows"',
    Cookie:
      '_rj_web=BAh7CEkiD3Nlc3Npb25faWQGOgZFVEkiJTY3OWQ0MTFhNjIxZjI3MmMyMWE0MDA5NjM2NmNiYmI3BjsAVEkiDGdlb2luZm8GOwBGewg6D2lwX2FkZHJlc3NJIhMxMDQuMjguMjE0LjE2MQY7AFQ6DGV4cGlyZXNJdToJVGltZQ1K4x6AT%2B62MAo6C29mZnNldGn%2BwMc6CXpvbmVJIghFRFQGOwBGOg1uYW5vX251bWkC4gI6DW5hbm9fZGVuaQY6DXN1Ym1pY3JvIgdzgDoHZGJ7CzoRY291bnRyeV9jb2RlSSIHSVIGOwBUOhFjb3VudHJ5X25hbWVJIglJcmFuBjsAVDoJY2l0eUkiC1RlaHJhbgY7AFQ6C3JlZ2lvbkkiBzIzBjsAVDoNbGF0aXR1ZGVmDDM1LjY4MjQ6DmxvbmdpdHVkZWYMNTEuNDE1OEkiDGFwcF9rZXkGOwBGSSIKUkpLRVkGOwBU--0a4df2e0c94ab22fc172e32b9a79f80c8fe854e9'
  }
}

export default defineEventHandler((event) => {
  const id = getRouterParam(event, 'id')
  config.url = config.url + id
  return axios
    .request(config)
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      return error
    })
})
