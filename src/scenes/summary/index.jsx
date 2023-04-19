import React, { useEffect } from 'react'
import { Box, useTheme } from '@mui/material'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import { tokens } from '../../theme'

import Header from '../../components/Header'
import { useAppContext } from '../../Contexts/ContextProvider'

const AdSource = () => {
  const { performanceData } = useAppContext()
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)

  const columns = [
    { field: 'source', headerName: 'Source', flex: 1 },
    {
      field: 'spend',
      headerName: 'Spend',
      flex: 1,
      cellClassName: 'name-column--cell',
    },
    {
      field: 'revenue',
      headerName: 'Revenue',
      type: 'number',
      headerAlign: 'left',
      align: 'left',
      flex: 1,
    },
    {
      field: 'conversions',
      headerName: 'Conversions',
      type: 'number',
      headerAlign: 'left',
      align: 'left',
      flex: 1,
    },
    {
      field: 'roas',
      headerName: 'ROAS',
      type: 'number',
      headerAlign: 'left',
      align: 'left',
      flex: 1,
    },
    {
      field: 'cpa',
      headerName: 'CPA',
      type: 'number',
      headerAlign: 'left',
      align: 'left',
      flex: 1,
    },
  ]

  useEffect(() => {}, [performanceData])

  return (
    <Box m="20px">
      <Header
        title="AdSource"
        subtitle="All the Advertising sources and its performance report"
      />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          '& .MuiDataGrid-root': {
            border: 'none',
          },
          '& .MuiDataGrid-cell': {
            borderBottom: 'none',
          },
          '& .name-column--cell': {
            color: colors.greenAccent[300],
          },
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: colors.blueAccent[700],
            borderBottom: 'none',
          },
          '& .MuiDataGrid-virtualScroller': {
            backgroundColor: colors.primary[400],
          },
          '& .MuiDataGrid-footerContainer': {
            borderTop: 'none',
            backgroundColor: colors.blueAccent[700],
          },
          '& .MuiCheckbox-root': {
            color: `${colors.greenAccent[200]} !important`,
          },
          '& .MuiDataGrid-toolbarContainer .MuiButton-text': {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        {performanceData && (
          <DataGrid
            rows={performanceData}
            columns={columns}
            getRowId={() => Math.random()}
            components={{ Toolbar: GridToolbar }}
          />
        )}
      </Box>
    </Box>
  )
}

export default AdSource
