import React, { useContext, useEffect, useState } from 'react'

const AppContext = React.createContext()

export const ContextProvider = ({ children }) => {
  const partitionUrl =
    'https://demo-api.adtriba.app/v1/api/partitions/932561105d21a54d3d1d2a941164ffec321cd76b/data'
  const performanceReportUrl =
    'https://demo-api.adtriba.app/v1/api/partitions/932561105d21a54d3d1d2a941164ffec321cd76b/report/performance'
  const summaryUrl =
    'https://demo-api.adtriba.app/v1/api/partitions/932561105d21a54d3d1d2a941164ffec321cd76b/totals'

  // change state value
  const [partitionData, setPartitionData] = useState(null)
  const [performanceData, setPerformanceData] = useState(null)
  const [summaryData, setSummaryData] = useState(null)

  const fetchData = async (url, setData) => {
    try {
      const resp = await (
        await fetch(url, {
          method: 'GET',
          withCredentials: true,
          headers: {
            'x-api-key': process.env.REACT_APP_KEY,
            'Content-Type': 'application/json',
          },
        })
      ).json()
      setData(resp)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchData(partitionUrl, setPartitionData)
    fetchData(performanceReportUrl, setPerformanceData)
    fetchData(summaryUrl, setSummaryData)
  }, [])

  useEffect(() => {}, [summaryData, partitionData, performanceData])

  return (
    <AppContext.Provider
      value={{ partitionData, performanceData, summaryData }}
    >
      {children}
    </AppContext.Provider>
  )
}
// make sure use
export const useAppContext = () => {
  return useContext(AppContext)
}
