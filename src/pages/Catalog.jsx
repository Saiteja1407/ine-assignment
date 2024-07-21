// import React,{useState,useEffect} from 'react'
// import CourseCard from '../components/CourseCard'
// import './Catalog.css'
// import axios from 'axios';
// import ButtonComp from '../components/ButtonComp';
// import InputComp from '../components/InputComp';
// import { useNavigate } from 'react-router-dom';

// const Catalog = () => {
//     const [Loading, setLoading] = useState(true)
//     const [courses, setCourses] = useState([]);
//     const [categories, setCategories] = useState([]);
//     const [query, setQuery] = useState('');
//     const navigate = useNavigate();

    

//     useEffect(() => {
      
      
      
//       const fetchCourses = async () => {
//         try {
//           const token = localStorage.getItem('token');
//           if(!token){
//             navigate(`/signup`)
//           }

//           const base_url = import.meta.env.VITE_API_URL;
//           const response = await axios.get(`${base_url}/api/courses`,{
//             headers:{
//               'Authorization':token
//             }
//           });
//           const data = response.data;
//           console.log(data.data);
//           setCourses(data.data);
          
//           setLoading(false);
//         } catch (error) {
//           console.error(error);
//           alert("sorry, for our fault")
//         }
//       };
//       fetchCourses()

//     }, [])

//     useEffect(()=>{
//       const set = new Set();
//       courses.length>0 && courses.forEach((course) => {
//         set.add(course.category);
//       })
//       const arr = [];
//       for(let item of set){
//         arr.push(item)
//       }
//       setCategories(arr)
//       console.log(categories.length>0 && categories)
//     },[courses])
     


    

//     const filteredCourses = courses.filter(course =>
//       course.title.toLowerCase().includes(query.toLowerCase()) ||
//       course.description.toLowerCase().includes(query.toLowerCase()) ||
//       course.instructor_name.toLowerCase().includes(query.toLowerCase())
//     );

//     const handleCategory = (category) => {
//       const filteredCourses = courses.filter(course => course.category === category);
//       setCourses(filteredCourses);
//     };

//   return (
//     <>
//     {Loading ? (<h1>Loading</h1>) : (<div>
//       <div className='search-container'>
//         <InputComp width='20rem' placeholder='search here' query={query} setQuery={setQuery}/>
//         <div className='filter-container'>
//         {categories.length>0 && categories.map((category) => (
//           <span onClick={()=>handleCategory(category)}>
//             <ButtonComp title={category}/>
//           </span>
          
//         ))}
//         </div>
//       </div>
//     </div>)}
//     <div className='course-catalog'>
//     {filteredCourses.length>0 && filteredCourses.map((category) => (
//           <CourseCard {...category}/>
//         ))}
//     </div>
//     </>
//   )
// }

// export default Catalog

import React, { useState, useEffect } from 'react';
import CourseCard from '../components/CourseCard';
import './Catalog.css';
import axios from 'axios';
import ButtonComp from '../components/ButtonComp';
import InputComp from '../components/InputComp';
import { useNavigate } from 'react-router-dom';

const Catalog = () => {
    const [loading, setLoading] = useState(true);
    const [courses, setCourses] = useState([]);
    const [filteredCourses, setFilteredCourses] = useState([]);
    const [categories, setCategories] = useState([]);
    const [query, setQuery] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    navigate(`/signup`);
                }

                const base_url = import.meta.env.VITE_API_URL;
                const response = await axios.get(`${base_url}/api/courses`, {
                    headers: {
                        'Authorization': token
                    }
                });
                const data = response.data;
                console.log(data.data);
                setCourses(data.data);
                setFilteredCourses(data.data);
                setLoading(false);
            } catch (error) { console.log(error)}
        };
        fetchCourses();
    }, [navigate]);

    useEffect(() => {
        const set = new Set();
        courses.forEach((course) => {
            set.add(course.category);
        });
        setCategories(Array.from(set));
        console.log(categories.length > 0 && categories);
    }, [courses]);

    const handleCategory = (category) => {
        const filtered = courses.filter(course => course.category === category);
        setFilteredCourses(filtered);
    };

    const handleSearch = (query) => {
        setQuery(query);
        const filtered = courses.filter(course =>
            course.title.toLowerCase().includes(query.toLowerCase()) ||
            course.description.toLowerCase().includes(query.toLowerCase()) ||
            course.instructor_name.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredCourses(filtered);
    };

    const handleClearFilter = () => {
      setQuery('');
      setFilteredCourses(courses);
  };


    return (
        <>
            {loading ? (<h1>Loading</h1>) : (
                <div>
                    <div className='search-container'>
                        <InputComp width='20rem' placeholder='search here' query={query} setQuery={handleSearch} />
                        <div className='filter-container'>
                            {categories.length > 0 && categories.map((category, index) => (
                                <span key={index} onClick={() => handleCategory(category)}>
                                    <ButtonComp title={category} />
                                </span>
                            ))}
                            <span onClick={handleClearFilter}>
                            <ButtonComp title="Clear Filter"  />
                            </span>
                              
                        </div>
                    </div>
                </div>
            )}
            <div className='course-catalog'>
                {filteredCourses.length > 0 && filteredCourses.map((course, index) => (
                    <CourseCard key={index} {...course} />
                ))}
            </div>
        </>
    );
};

export default Catalog;

