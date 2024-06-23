import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes , Route} from 'react-router-dom'
import SignUp from './pages/signUp'
import Login from './pages/Login'
import ButtonComp from './components/ButtonComp'
import InputComp from './components/InputComp'
import Menu from './components/Menu'
import AvatarComp from './components/Avatar'
import CourseCard from './components/CourseCard'
import Catalog from './pages/Catalog'
import CourseDetails from './pages/CourseDetails'
import ProgressBar from './components/ProgressBar'
import VideoPlayer from './components/VideoPlayer'
import Content from './components/Content'
import Layout from './components/Layout'
import ProfilePage from './pages/ProfilePage'
import EnrolledCourse from './components/EnrolledCourse'
import Lesson from './pages/Lesson'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/signup' element={<SignUp/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/' element={<Layout/>}>
          <Route index element={<Catalog/>}/>
          <Route path='/courses/:courseId' element={<CourseDetails/>}/>
          <Route path='/courses/:courseId/:lessonId' element={<Lesson/>}/>
          <Route path='/:id/profile' element={<ProfilePage/>}/>
          <Route path='/:id/components' element={<EnrolledCourse/>}/>
          </Route>
          <Route path='*' element={<h1>404 Not Found</h1>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
