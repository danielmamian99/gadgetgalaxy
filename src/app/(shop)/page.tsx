'use client'

import React, { useState, useEffect } from 'react'
import { getComponents, postLogin } from '../services'
import { Products } from '@/components/products'

export default function Home() {
  const [dataComponents, setDataComponents] = useState<any>(null)
  const [token, setToken] = useState<string | null>(null)
  const [error, setError] = useState<boolean>(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        //  // Login and get token
        //   const { isSuccess, data } = await postLogin()
        //   if (
        //     !isSuccess ||
        //     !data ||
        //     ![200, 201, 202, 203, 204].includes(data.status)
        //   ) {
        //     setError(true)
        //     return
        //   }
        //   setToken(data.access_token)

        // Fetch components
        const { isSuccess: isSuccessComponents, data: componentsData } =
          await getComponents({
            limit: 35,
            offset: 0,
          })
        if (
          !isSuccessComponents ||
          !componentsData ||
          ![200, 201, 202, 203, 204].includes(componentsData.status)
        ) {
          setError(true)
          return
        }

        setDataComponents(componentsData.data)
      } catch (err) {
        console.error('Error fetching data:', err)
        setError(true)
      }
    }

    fetchData()
  }, []) // Empty dependency array ensures this runs only once on mount

  if (error) {
    return <div>Error loading data</div>
  }

  return (
    <div>
      {dataComponents ? (
        <Products dataComponents={dataComponents} token={token} />
      ) : (
        <div>Loading...</div>
      )}
    </div>
  )
}
