import React, { useEffect, useState } from 'react'
import { useTheme } from '@mui/material'
import { ResponsiveLine } from '@nivo/line'
import { tokens } from '../theme'
import { useAppContext } from '../Contexts/ContextProvider'

const LineChart = ({ isDashboard = false }) => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)

  const { partitionData, performanceData } = useAppContext()
  const [dataset, setDataset] = useState(null)

  useEffect(() => {
    const sources =
      performanceData && performanceData.map((item) => item.source)
    const filteredArray =
      partitionData &&
      partitionData.filter((item) => {
        const itemDate = new Date(item.date)
        const filterDate = new Date('2022-11-20')
        return itemDate > filterDate
      })
    const lineChartDataset =
      performanceData &&
      partitionData &&
      sources.map((source) => {
        const tempFilterData =
          filteredArray &&
          filteredArray.filter((item) => item.source === source)
        return {
          id: source,
          data:
            tempFilterData &&
            tempFilterData.map((item) => {
              return {
                x: item.date,
                y: item.spends,
              }
            }),
        }
      })
    setDataset(lineChartDataset)
  }, [partitionData, performanceData])

  return (
    dataset && (
      <ResponsiveLine
        data={dataset}
        theme={{
          // added
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
            ? { top: 50, right: 60, bottom: 60, left: 90 }
            : { top: 50, right: 310, bottom: 60, left: 60 }
        }
        xScale={{ type: 'point' }}
        yScale={{
          type: 'linear',
          min: 'auto',
          max: 'auto',
          stacked: true,
          reverse: false,
        }}
        yFormat=" >-.2f"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          orient: 'bottom',
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 30,
          legend: 'Days',
          legendOffset: 50,
          legendPosition: 'middle',
        }}
        axisLeft={{
          orient: 'left',
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Amount',
          legendOffset: -50,
          legendPosition: 'middle',
        }}
        enableGridX={false}
        enableGridY={false}
        pointSize={10}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabelYOffset={-12}
        useMesh={true}
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
                {e.point.serieId} : ${e.point.data.y}
              </div>
            </div>
          )
        }}
        legends={
          isDashboard
            ? undefined
            : [
                {
                  anchor: 'bottom-right',
                  direction: 'column',
                  justify: false,
                  translateX: 100,
                  translateY: 0,
                  itemsSpacing: 0,
                  itemDirection: 'left-to-right',
                  itemWidth: 80,
                  itemHeight: 20,
                  itemOpacity: 0.75,
                  symbolSize: 12,
                  symbolShape: 'circle',
                  symbolBorderColor: 'rgba(0, 0, 0, .5)',
                  effects: [
                    {
                      on: 'hover',
                      style: {
                        itemBackground: 'rgba(0, 0, 0, .03)',
                        itemOpacity: 1,
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

export default LineChart
