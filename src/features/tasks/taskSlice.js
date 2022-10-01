import { createSlice } from "@reduxjs/toolkit";

//Estado inicial del Slice, osea, parte inicial del Estado inicial del Store
const initialState = [
  {
    id: "1",
    title: "Task 1",
    description: "Task 1 description",
    completed: false,
  },
  {
    id: "2",
    title: "Task 2",
    description: "Task 2 description",
    completed: false,
  },
];

export const taskSlice = createSlice({
  name: "task",
  initialState: () => {
    if (localStorage.getItem("tasks") !== null) {
      return JSON.parse(localStorage.getItem("tasks")); // re-hydrate the store
    } else return initialState;
  },
  //Los reducers son funciones que permiten alterar el Estado
  reducers: {
    addTask: (state, action) => {
      //console.log(state, action);
      //El state es inmuntable, pero Redux toolkit permite escribir lo siguiente:
      state.push(action.payload);
      //Lo cual es equivalente a [...state, action.payload]
    },
    editTask: (state, action) => {
      //console.log(action.payload);
      const { id, title, description } = action.payload;
      const taskFound = state.find((task) => task.id === id);
      if (taskFound) {
        taskFound.title = title;
        taskFound.description = description;
      }
    },
    deleteTask: (state, action) => {
      //console.log(action.payload);
      const taskFound = state.find((task) => task.id === action.payload);
      if (taskFound) {
        state.splice(state.indexOf(taskFound), 1);
      }
      console.log(taskFound);
    },
  },
});

//MIDDLEWARE for the taskSlice. This is the way to save the redux States in LocalStorage
export const tasksMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  if (action.type?.startsWith("task/")) {
    const tasksState = store.getState().tasks;
    localStorage.setItem("tasks", JSON.stringify(tasksState));
  }
  return result;
};

export const { addTask, deleteTask, editTask } = taskSlice.actions;
//taskSlice is an object that was created with the createSlice function, so it has certain properties.
//The default export only passes the reducer operations
export default taskSlice.reducer;

//A slice is a part of the state. According to the proposed structure, this slice is in charge of the features that have to do with Task (the cards).
