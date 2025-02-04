import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import NotFound from './pages/NotFound'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import { BrowserRouter as Router } from 'react-router-dom'
import { GithubProvider } from './context/github/GithubContext.jsx'
import { AlertProvider } from './context/alert/AlertContext.jsx'

const App = () => {
  return (
    <GithubProvider>
      <AlertProvider>
        <Router>
          <div className="flex flex-col justify-start h-screen">
            <Navbar />
            <main className="flex-grow container mx-auto px-3">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/notfound" element={<NotFound />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </AlertProvider>
    </GithubProvider>
  )
}
export default App
