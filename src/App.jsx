import { useState } from 'react'
import Navbar from './components/navbar'
import Manager from './components/manager'
import Footer from './components/footer'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

return (
    <div className="min-h-screen select-none flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Manager />
      </main>
      <Footer />
    </div>
  )
}

export default App
