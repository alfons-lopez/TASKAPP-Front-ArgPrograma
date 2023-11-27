import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import NavBar from './components/NavBar/NavBar';
import Footer from './components/Footer/Footer';
import AppRoutes from './routes/AppRoutes';
import 'react-toastify/dist/ReactToastify.css';


function App() {

  return (
    <>
      <ToastContainer />
      <Router>
        <NavBar />
        <AppRoutes />
        <Footer />      
      </Router>
    </>
  )
}

export default App



