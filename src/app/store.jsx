import { configureStore  } from '@reduxjs/toolkit';

// Import your reducers here
// import counterReducer from './counterSlice';
// import todosReducer from './todosSlice';

const store = configureStore({
    reducer: {
        // Add your reducers here
        // counter: counterReducer,
        // todos: todosReducer,
    },
});

export default store;