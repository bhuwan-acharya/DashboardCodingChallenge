// import { useAppContext } from './Contexts/ContextProvider'
import { ColorModeContext, useMode } from './theme'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { Routes, Route } from 'react-router-dom'
import Sidebar from './scenes/global/Sidebar'
import Topbar from './scenes/global/Topbar'
import Dashboard from './scenes/dashboard'
import AdSource from './scenes/summary'
import CalendarEvent from './scenes/calender'
import Bar from './scenes/bar'
import Line from './scenes/line'
import Pie from './scenes/pie'

function App() {
  const [theme, colorMode] = useMode()

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar />
          <main className="content">
            <Topbar />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/summary" element={<AdSource />} />
              <Route path="/calendar" element={<CalendarEvent />} />
              <Route path="/bar" element={<Bar />} />
              <Route path="/line" element={<Line />} />
              <Route path="/pie" element={<Pie />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}

export default App
