import React, { useEffect, useState } from 'react'
import { useTheme } from '@mui/material'
import { ResponsiveBar } from '@nivo/bar'
import { tokens } from '../theme'
import { useAppContext } from '../Contexts/ContextProvider'

const BarChart = ({ isDashboard = false }) => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)

  const { performanceData } = useAppContext()
  const [data, setData] = useState(null)

  useEffect(() => {
    performanceData && setData(performanceData)
  }, [performanceData])

  return (
    data && (
      <ResponsiveBar
        data={data}
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
        keys={['spend', 'revenue']}
        indexBy="source"
        margin={
          isDashboard
            ? { top: 50, right: 130, bottom: 100, left: 80 }
            : { top: 50, right: 130, bottom: 100, left: 300 }
        }
        padding={0.3}
        groupMode="stacked"
        layout={isDashboard ? 'vertical' : 'horizontal'}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={{ scheme: 'nivo' }}
        borderRadius={2}
        borderColor={{
          from: 'color',
          modifiers: [['darker', 1.6]],
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: isDashboard ? 20 : 0,
          legend: isDashboard ? undefined : 'Spend and Revenue',
          legendPosition: 'middle',
          legendOffset: 72,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 10,
          tickRotation: 0,
          legend: isDashboard ? undefined : 'sources',
          legendPosition: 'middle',
          legendOffset: -130,
        }}
        enableGridX={false}
        enableGridY={false}
        labelSkipWidth={1}
        labelSkipHeight={200}
        labelTextColor={{
          from: 'color',
          modifiers: [['darker', 1.6]],
        }}
        // animate={false}
        legends={[
          {
            dataFrom: 'keys',
            anchor: 'bottom-right',
            direction: 'column',
            justify: false,
            translateX: 120,
            translateY: 0,
            itemsSpacing: 2,
            itemWidth: 100,
            itemHeight: 20,
            itemDirection: 'left-to-right',
            itemOpacity: 0.85,
            symbolSize: 20,
            effects: [
              {
                on: 'hover',
                style: {
                  color: 'red',
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
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
                {e.id} : ${e.value}
              </div>
            </div>
          )
        }}
        role="application"
        ariaLabel="Nivo bar chart demo"
        barAriaLabel={function (e) {
          return e.id + ': ' + e.formattedValue + ' in country: ' + e.indexValue
        }}
      />
    )
  )
}

export default BarChart
