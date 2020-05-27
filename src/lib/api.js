import fetch from 'cross-fetch'
import * as R from 'ramda'

export function makeApiClient(apiOrigin) {
  async function fetchJSON(url, options = {}) {
    if (!url.startsWith("http")) {
      url = apiOrigin + url
    }
    options = R.mergeDeepRight(options, {
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
      },
      body: JSON.stringify(options.body)
    })

    let response = await fetch(url, options)
    if ((response.headers.get('content-type') || '').includes('application/json')) {
      try {
        return response.json()
      } catch (error) {
        throw new Error('API: Invalid JSON')
      }
    } else {
      throw new Error ('API: Invalid mime-type')
    }
  }
  return {
    fetchJSON
  }
}
