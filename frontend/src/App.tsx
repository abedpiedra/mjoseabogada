import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
// Future pages imports
// import Services from './pages/Services'
// import About from './pages/About'
// import Contact from './pages/Contact'
// import Blog from './pages/Blog'

function App(): JSX.Element {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Future routes */}
        {/* <Route path="/servicios" element={<Services />} /> */}
        {/* <Route path="/sobre-mi" element={<About />} /> */}
        {/* <Route path="/contacto" element={<Contact />} /> */}
        {/* <Route path="/blog" element={<Blog />} /> */}
      </Routes>
    </Layout>
  )
}

export default App
