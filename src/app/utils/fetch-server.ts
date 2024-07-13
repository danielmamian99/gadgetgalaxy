export const snakeToCamel = (obj: { [key: string]: any }): any => {
  if (obj instanceof Array) {
    return obj?.map((v) => snakeToCamel(v))
  } else if (obj !== null && obj?.constructor === Object) {
    return Object.keys(obj)?.reduce((result: { [key: string]: any }, key) => {
      const newKey = key?.replace(/_([a-z])/g, (_, letter) =>
        letter?.toUpperCase()
      )
      const value = obj?.[key]
      result[newKey] = snakeToCamel(value)
      return result
    }, {})
  }
  return obj
}

export const fetchServerAuth = async (
  url: string,
  token: string,
  options?: RequestInit
) => {
  const res = await fetch(url, {
    ...options,
    headers: {
      ...options?.headers,
      Authorization: `Bearer ${token}`
    }
  })
  const data = await res?.json()

  return {
    data: data ? snakeToCamel(data) : res,
    status: res?.status,
    isError: !res?.ok
  }
}
