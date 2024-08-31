import './App.css'
import { BrowserRouter, Routes , Route} from 'react-router-dom'
import SignUp from './pages/signUp'
import Login from './pages/Login'
import Catalog from './pages/Catalog'
import CourseDetails from './pages/CourseDetails'
import Layout from './components/Layout'
import ProfilePage from './pages/ProfilePage'
import Lesson from './pages/Lesson'
import NotFound from './pages/NotFound'
import FormOuter from './components/FormOuter'
import LandingPage from './pages/LandingPage'
import Header from './components/Header'
import CategoryFilter from './components/CategoryFilter'
import Cart from './pages/Cart'
import CheckOut from './pages/CheckOut'
import PaymentComplete from './pages/PaymentComplete'
import Test from './components/Test'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/test' element={<CategoryFilter/>}/>
          <Route path='/signup' element={<SignUp/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/' element={<LandingPage/>}/>
          <Route path='/user/' element={<Layout/>}>
          <Route index element={<Catalog/>}/>
          <Route path='/user/courses/:courseId' element={<CourseDetails/>}/>
          <Route path='/user/courses/:courseId/:lessonId' element={<Lesson/>}/>
          <Route path='/user/enrolledcourses' element={<ProfilePage/>}/>
          <Route path='/user/cart' element={<Cart/>}/>
          <Route path='/user/checkout' element={<CheckOut/>}/>
          <Route path='/user/complete' element={<PaymentComplete/>}/>
          <Route path='*' element={<NotFound/>}/>
          </Route>
          <Route path='/components' element={<Test/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
