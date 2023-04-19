import React, { useEffect, useState } from 'react'
import { ResponsivePie } from '@nivo/pie'
import { tokens } from '../theme'
import { useTheme } from '@mui/material'

import { useAppContext } from '../Contexts/ContextProvider'

const PieChart = ({ isDashboard = false, chart }) => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)

  const { performanceData } = useAppContext()
  const [data, setData] = useState()

  const pieChartData = (data, value) => {
    if (value === 'revenue') {
      const tempData = data.map((item) => {
        return {
          id: item.source,
          value: item.revenue,
        }
      })

      return tempData
    } else if (value === 'spend') {
      const tempData = data.map((item) => {
        return {
          id: item.source,
          value: item.spend,
        }
      })
      return tempData
    } else if (value === 'roas') {
      const tempData = data.map((item) => {
        return {
          id: item.source,
          value: item.roas,
        }
      })
      return tempData
    } else if (value === 'conversions') {
      const tempData = data.map((item) => {
        return {
          id: item.source,
          value: item.conversions,
        }
      })
      return tempData
    } else if (value === 'cpa') {
      const tempData = data.map((item) => {
        return {
          id: item.source,
          value: item.cpa,
        }
      })
      return tempData
    }
  }

  useEffect(() => {
    if (performanceData) {
      setData(pieChartData(performanceData, chart))
    }
  }, [performanceData, chart])

  return (
    data && (
      <ResponsivePie
        data={data}
        theme={{
          axis: {
            domain: {
              line: {
                stroke: colors.grey[100],
              },
            },
            legend: {
              text: {
                fill: colors.grey[100],
              },
            },
            ticks: {
              line: {
                stroke: colors.grey[100],
                strokeWidth: 1,
              },
              text: {
                fill: colors.grey[100],
              },
            },
          },
          legends: {
            text: {
              fill: colors.grey[100],
            },
          },
        }}
        margin={
          isDashboard
            ? { top: 80, right: 80, bottom: 40, left: 80 }
            : { top: 40, right: 80, bottom: 80, left: 80 }
        }
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        borderColor={{
          from: 'color',
          modifiers: [['darker', 0.2]],
        }}
        enableArcLinkLabels={isDashboard ? true : false}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor={colors.grey[100]}
        arcLinkLabelsThickness={2}
        enableArcLabels={false}
        arcLinkLabelsColor={{ from: 'color' }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{
          from: 'color',
          modifiers: [['darker', 2]],
        }}
        tooltip={function (e) {
          return (
            <div
              style={{
                color: colors.grey[500],
                background: 'white',
                padding: '9px 12px',
                border: '1px solid #ccc',
              }}
            >
              <div>
                {e.datum.data.id} : ${e.datum.data.value}
              </div>
            </div>
          )
        }}
        legends={
          isDashboard
            ? undefined
            : [
                {
                  anchor: 'bottom',
                  direction: 'column',
                  justify: false,
                  translateX: 350,
                  translateY: 80,
                  itemsSpacing: 0,
                  itemWidth: 100,
                  itemHeight: 18,
                  itemTextColor: '#999',
                  itemDirection: 'left-to-right',
                  itemOpacity: 1,
                  symbolSize: 18,
                  symbolShape: 'circle',
                  effects: [
                    {
                      on: 'hover',
                      style: {
                        itemTextColor: '#000',
                      },
                    },
                  ],
                },
              ]
        }
      />
    )
  )
}

export default PieChart
