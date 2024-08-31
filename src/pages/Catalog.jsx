import React, { useState, useEffect } from 'react';
import CourseCard from '../components/CourseCard';
import './Catalog.css';
import axios from 'axios';
import ButtonComp from '../components/ButtonComp';
import InputComp from '../components/InputComp';
import { useNavigate } from 'react-router-dom';
import CategoryFilter from '../components/CategoryFilter';

const Catalog = () => {
    const [loading, setLoading] = useState(true);
    const [courses, setCourses] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [category, setCategory] = useState(null);
    const [lastPage, setLastPage] = useState(false);
    const [categories, setCategories] = useState([]);
    const [query, setQuery] = useState('');
    const [debounceQuery, setDebounceQuery] = useState(query);
    const itemsPerPage = 6;
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    navigate(`/signup`);
                    return;
                }

                const base_url = import.meta.env.VITE_API_URL;
                const response = await axios.get(`${base_url}/api/courses`, {
                    params: {
                        page: currentPage,
                        limit: itemsPerPage,
                        category: category || undefined,
                        search: debounceQuery || undefined
                    },
                    headers: {
                        'Authorization': token
                    }
                });

                const data = response.data;
                console.log(data);
                setCourses(data.data);
                setLastPage(!data.hasMoreCourses);
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        };
        fetchCourses();
    }, [currentPage, category, debounceQuery]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const token = localStorage.getItem('token');
                const base_url = import.meta.env.VITE_API_URL;
                const response = await axios.get(`${base_url}/api/courses/categories`, {
                    headers: {
                        'Authorization': token
                    }
                });
                const data = response.data;
                setCategories(data.categories);  
            } catch (error) {
                console.error(error);
            }
        };
    
        fetchCategories();
    }, []);
    
    useEffect(()=>{
        const debounceFn = setTimeout(() => {
            setDebounceQuery(query);
        },400)
        return () => clearTimeout(debounceFn);
    },[query])

    const handleCategory = (selectedCategory) => {
        setCategory(selectedCategory);
        setCurrentPage(1); // Reset to the first page when the category changes
    };

    const handleSearch = (searchQuery) => {
        setQuery(searchQuery);
        setCurrentPage(1); // Reset to the first page when the search query changes
    };

    const handleClearFilter = () => {
        setCategory(null);
        setQuery('');
        setCurrentPage(1); // Reset to the first page when filters are cleared
    };

    return (
        <>
            {loading ? (<h1>Loading...</h1>) : (
                <div>
                    <div className='search-container px-4 md:px-8 lg:px-20'>
                        <InputComp width='20rem' placeholder='Search here' query={query} setQuery={handleSearch} />
                        <CategoryFilter handleCategory={handleCategory} categories={categories} clearFilter={handleClearFilter}/>
                    </div>
                    <div className='course-catalog'>
                        {courses.length > 0 ? courses.map((course, index) => (
                            <CourseCard key={index} {...course} />
                        )) : <p>No courses found.</p>}
                    </div>
                    <div className='my-5  mx-auto w-3/4 flex justify-center gap-28 '>
                        <ButtonComp onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1} title='Prev'/>
                        <ButtonComp onClick={() => setCurrentPage(currentPage + 1)} disabled={lastPage} title='Next'/>
                    </div>
                </div>
            )}
        </>
    );
};

export default Catalog;
