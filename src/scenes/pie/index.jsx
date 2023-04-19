import React, { useState, useEffect } from 'react'
import { Box, Typography, useTheme } from '@mui/material'
import { tokens } from '../../theme'
import Header from '../../components/Header'
import PieChart from '../../components/PieChart'

const Pie = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)

  const [chart, setChart] = useState('spend')
  const [isActive, setIsActive] = useState('spend')

  const handleClick = (e) => {
    setChart(e)
  }

  useEffect(() => {}, [chart])

  const array = ['spend', 'revenue', 'conversions', 'roas', 'cpa']

  return (
    <>
      <Box m="20px">
        <Header
          title="Pie Chart"
          subtitle="Performance metrices as per the source"
        />

        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          colors={colors.grey[100]}
          // p="15px"
          width={'800px'}
          gap={2}
        >
          {array.map((item, index) => {
            return (
              <Typography
                color={colors.grey[400]}
                variant="h3"
                padding={1}
                width={'20px'}
                fontWeight="600"
                flex={1}
                backgroundColor={
                  isActive === item
                    ? colors.greenAccent[500]
                    : colors.greenAccent[400]
                }
                borderRadius={2}
                textAlign="center"
                onClick={(e) => {
                  handleClick(item)
                  setIsActive(item)
                }}
                key={index}
                textTransform={'capitalize'}
              >
                {item}
              </Typography>
            )
          })}
        </Box>
        <Box height="75vh">
          <PieChart chart={chart} />
        </Box>
      </Box>
    </>
  )
}

export default Pie
