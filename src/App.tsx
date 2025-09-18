import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'

export default function App() {
  return (
    <div className="container">
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  )
}
