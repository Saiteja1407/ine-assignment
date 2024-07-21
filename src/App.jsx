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

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/test' element={<Header/>}/>
          <Route path='/signup' element={<SignUp/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/' element={<LandingPage/>}/>
          <Route path='/user/' element={<Layout/>}>
          <Route index element={<Catalog/>}/>
          <Route path='/user/courses/:courseId' element={<CourseDetails/>}/>
          <Route path='/user/courses/:courseId/:lessonId' element={<Lesson/>}/>
          <Route path='/user/profile' element={<ProfilePage/>}/>
          <Route path='*' element={<NotFound/>}/>
          </Route>
          <Route path='/components' element={<FormOuter/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
