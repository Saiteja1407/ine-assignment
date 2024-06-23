import React,{useState,useEffect} from 'react'
import CourseCard from '../components/CourseCard'
import './Catalog.css'
import axios from 'axios';
import ButtonComp from '../components/ButtonComp';
import InputComp from '../components/InputComp';
import { useNavigate } from 'react-router-dom';

const Catalog = () => {
    const [Loading, setLoading] = useState(true)
    const [courses, setCourses] = useState([]);
    const [categories, setCategories] = useState([]);
    const [query, setQuery] = useState('');
    const navigate = useNavigate();

    

    useEffect(() => {
      
      
      
      const fetchCourses = async () => {
        try {
          const token = localStorage.getItem('token');
          if(!token){
            navigate(`/signup`)
          }

          const base_url = import.meta.env.VITE_API_URL;
          const response = await axios.get(`${base_url}/api/courses`,{
            headers:{
              'Authorization':token
            }
          });
          const data = response.data;
          console.log(data.data);
          setCourses(data.data);
          
          setLoading(false);
        } catch (error) {
          console.error(error);
          alert("sorry, for our fault")
        }
      };
      fetchCourses()

    }, [])

    useEffect(()=>{
      const set = new Set();
      courses.length>0 && courses.forEach((course) => {
        set.add(course.category);
      })
      const arr = [];
      for(let item of set){
        arr.push(item)
      }
      setCategories(arr)
      console.log(categories.length>0 && categories)
    },[courses])
     


    

    const filteredCourses = courses.filter(course =>
      course.title.toLowerCase().includes(query.toLowerCase()) ||
      course.description.toLowerCase().includes(query.toLowerCase()) ||
      course.instructor_name.toLowerCase().includes(query.toLowerCase())
    );

  return (
    <>
    {Loading ? (<h1>Loading</h1>) : (<div>
      <div className='search-container'>
        <InputComp width='20rem' placeholder='search here' query={query} setQuery={setQuery}/>
        <div className='filter-container'>
        {categories.length>0 && categories.map((category) => (
          <ButtonComp title={category}/>
        ))}
        </div>
      </div>
    </div>)}
    <div className='course-catalog'>
    {filteredCourses.length>0 && filteredCourses.map((category) => (
          <CourseCard {...category}/>
        ))}
    </div>
    </>
  )
}

export default Catalog
