import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "../features/tasks/taskSlice";
import { tasksMiddleware } from "../features/tasks/taskSlice";

//taskReducer imports the default, so it only receives the reducers, so it doesn't bring the unstructured (taskSlice object)

//Here all the files that are States are grouped, in this way their access is centralized.
export const store = configureStore({
  reducer: {
    tasks: taskReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tasksMiddleware),
});

//Reducers are something similar to setState in a class component
//configureStore set a middleware for default, so to add some custom middleware without lose the defualts is better to use getDefaultMiddleware().concat(customMiddleware)
