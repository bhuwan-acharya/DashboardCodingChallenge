import React, { useState, useEffect } from 'react'
import { Box, Button, IconButton, Typography, useTheme } from '@mui/material'
import { tokens } from '../../theme'
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import CurrencyExchangeOutlinedIcon from '@mui/icons-material/CurrencyExchangeOutlined'
import TrendingUpOutlinedIcon from '@mui/icons-material/TrendingUpOutlined'
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined'
import Header from '../../components/Header'
import BarChart from '../../components/BarChart'
import LineChart from '../../components/LineChart'
import PieChart from '../../components/PieChart'
import StatBox from '../../components/CompanyStatBox'
import { useAppContext } from '../../Contexts/ContextProvider'

const Dashboard = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)

  const { summaryData, partitionData, performanceData } = useAppContext()

  const [summary, setSummary] = useState(null)
  const [performance, setPerformance] = useState(null)

  useEffect(() => {
    summaryData && setSummary(summaryData)
    performanceData && setPerformance(performanceData)
  }, [summaryData, partitionData, performanceData])

  return (
    summary && (
      <Box m="20px">
        {/* HEADER */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

          <Box>
            <Button
              sx={{
                backgroundColor: colors.blueAccent[700],
                color: colors.grey[100],
                fontSize: '14px',
                fontWeight: 'bold',
                padding: '10px 20px',
              }}
            >
              <DownloadOutlinedIcon sx={{ mr: '10px' }} />
              Download Reports
            </Button>
          </Box>
        </Box>

        {/* GRID & CHARTS */}
        <Box
          display="grid"
          gridTemplateColumns="repeat(12, 1fr)"
          gridAutoRows="95px"
          gap="20px"
        >
          {/* ROW 1 */}
          <Box
            gridColumn="span 3"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <StatBox
              title={`$${summary.revenue.toFixed(2)}`}
              subtitle="Total Revenue"
              progress="0.75"
              increase="+14%"
              icon={
                <TrendingUpOutlinedIcon
                  sx={{ color: colors.greenAccent[600], fontSize: '26px' }}
                />
              }
            />
          </Box>
          <Box
            gridColumn="span 3"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <StatBox
              title={`$${(summary.revenue - summary.spend).toFixed(2)}`}
              subtitle="Total Profit"
              progress="0.75"
              increase="+14%"
              icon={
                <PaidOutlinedIcon
                  sx={{ color: colors.greenAccent[600], fontSize: '26px' }}
                />
              }
            />
          </Box>
          <Box
            gridColumn="span 3"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <StatBox
              title={`$${summary.spend.toFixed(2)}`}
              subtitle="Total spend"
              progress="0.50"
              increase="+21%"
              icon={
                <AttachMoneyIcon
                  sx={{ color: colors.greenAccent[600], fontSize: '26px' }}
                />
              }
            />
          </Box>
          <Box
            gridColumn="span 3"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <StatBox
              title={`$${summary.conversions.toFixed(2)}`}
              subtitle="Total Conversion"
              progress="0.30"
              increase="+5%"
              icon={
                <CurrencyExchangeOutlinedIcon
                  sx={{ color: colors.greenAccent[600], fontSize: '26px' }}
                />
              }
            />
          </Box>
          {/* ROW 2 */}
          <Box
            gridColumn="span 7"
            gridRow="span 3"
            backgroundColor={colors.primary[400]}
          >
            <Box
              mt="13px"
              p="0 30px"
              display="flex "
              justifyContent="space-between"
              alignItems="center"
            >
              <Box>
                <Typography
                  variant="h5"
                  fontWeight="600"
                  color={colors.grey[100]}
                >
                  Spend Vs Revenue
                </Typography>
                <Typography
                  variant="p"
                  fontWeight="regular"
                  color={colors.greenAccent[500]}
                >
                  comparison between spend and revenue based on diffeerent
                  Sources of Advvertisement
                </Typography>
              </Box>
              <Box>
                <IconButton>
                  <DownloadOutlinedIcon
                    sx={{ fontSize: '26px', color: colors.greenAccent[500] }}
                  />
                </IconButton>
              </Box>
            </Box>
            <Box height="300px" m="-30px 0 0 0">
              <BarChart isDashboard={true} />
            </Box>
          </Box>
          <Box
            gridColumn="span 5"
            gridRow="span 3"
            backgroundColor={colors.primary[400]}
            overflow="auto"
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              colors={colors.grey[100]}
              p="15px"
            >
              <Typography
                color={colors.grey[100]}
                variant="h5"
                fontWeight="600"
              >
                Profit Table
              </Typography>
            </Box>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              colors={colors.grey[100]}
              p="15px"
            >
              <Typography
                color={colors.grey[100]}
                variant="h5"
                fontWeight="600"
                width={'300px'}
              >
                Source
              </Typography>
              <Typography
                color={colors.grey[100]}
                variant="h5"
                fontWeight="600"
                width={'50px'}
              >
                Spend
              </Typography>
              <Typography
                color={colors.grey[100]}
                variant="h5"
                fontWeight="600"
                width={'50px'}
              >
                Revenue
              </Typography>
              <Typography
                color={colors.grey[100]}
                variant="h5"
                fontWeight="600"
                width={'90px'}
              >
                Profit
              </Typography>
            </Box>
            {performance &&
              performance.map((data, i) => (
                <Box
                  key={`${data.source}-${i}`}
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  borderBottom={`4px solid ${colors.primary[500]}`}
                  p="15px"
                >
                  <Box>
                    <Typography
                      color={colors.greenAccent[500]}
                      variant="h5"
                      fontWeight="600"
                      width="300px"
                    >
                      {data.source}
                    </Typography>
                  </Box>
                  <Box color={colors.grey[100]} width="50px">
                    ${data.spend.toFixed(2)}
                  </Box>
                  <Box color={colors.grey[100]} width="50px">
                    ${data.revenue.toFixed(2)}
                  </Box>
                  <Box
                    backgroundColor={colors.greenAccent[500]}
                    p="5px 10px"
                    borderRadius="4px"
                    width={'90px'}
                  >
                    ${(data.revenue - data.spend).toFixed(2)}
                  </Box>
                </Box>
              ))}
          </Box>
          {/* ROW 3 */}
          <Box
            gridColumn="span 4"
            gridRow="span 3"
            backgroundColor={colors.primary[400]}
          >
            <Typography
              variant="h5"
              fontWeight="600"
              sx={{ padding: '30px 30px 0 30px' }}
            >
              Pie Chart
            </Typography>
            <Box height="250px" mt="-20px">
              <PieChart isDashboard={true} chart={'revenue'} />
            </Box>
          </Box>

          <Box
            gridColumn="span 8"
            gridRow="span 3"
            backgroundColor={colors.primary[400]}
          >
            <Typography
              variant="h5"
              fontWeight="600"
              sx={{ padding: '30px 30px 0 30px' }}
            >
              Line Chart
            </Typography>
            <Box height="250px" mt="-20px">
              <LineChart isDashboard={true} />
            </Box>
          </Box>
        </Box>
      </Box>
    )
  )
}

export default Dashboard
