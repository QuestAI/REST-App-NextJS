import React from 'react'

const APIKEY = 'ftj2Lu7WhYmsHHSjJTGRl2NEYT8sARqVmYDxfVzaxRn1FW5rLBGAcQJZ'
const BASE_URL = `https://api.pexels.com/v1`
let RESOURCE = `/photos`
let PATH_PARAMS = `/`
let QUERY_PARAMS = ``

export function useCard7Service(adapter = (data) => data, props = {}) {
  const [data, setData] = React.useState({})
  const [error, setError] = React.useState(null)
  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => {
    PATH_PARAMS = `/${props.id}`
    const url = new URL(`${BASE_URL}${RESOURCE}${PATH_PARAMS}${QUERY_PARAMS}`)
    const callApi = async () => {
      try {
        setError(null)
        setLoading(true)
        const result = await fetch(url, {
          method: 'GET',
          headers: {
            Authorization: APIKEY,
          },
        })

        const json = await result.json()

        setData(adapter(json))
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    callApi()
  }, [props])

  return { data, error, loading }
}
