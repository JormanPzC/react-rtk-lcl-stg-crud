import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask, editTask } from "../features/tasks/taskSlice";
import { v4 as uuid } from "uuid";
import { useNavigate, useParams } from "react-router-dom";

function TaskForm() {
  const [task, setTask] = useState({
    title: "",
    description: "",
  });

  //These are Hooks
  //  dispatch is used to be able to alter (do something) the State
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  //  useSelector is the way in which the State data can be brought or selected
  //  In state.tasks that "tasks" is what I define in Store (inside reducer)
  const tasks = useSelector((state) => state.tasks);

  //Function that receives an event
  const handleChange = (e) => {
    //setTask is the state change operation for task (which is a state that was declared with useState)
    setTask({
      //copy all the data that task initially has
      ...task,
      [e.target.name]: e.target.value,
      //
    });
  };

  //Function to determine if a new task (card) is edited or created
  const handleSubmit = (e) => {
    e.preventDefault();

    if (params.id) {
      dispatch(editTask(task));
    } else {
      dispatch(addTask({ ...task, id: uuid() }));
    }

    navigate("/");
  };

  useEffect(() => {
    //Params are the URL data
    if (params.id) {
      setTask(tasks.find((task) => task.id === params.id));
    }
  }, [params.id, tasks]);

  return (
    <form onSubmit={handleSubmit} className="bg-zinc-800 max-w-sm p-4 mb-2">
      <label htmlFor="title" className="block text-xs font-bold mb-2">
        Title Task:
      </label>
      <input
        name="title"
        type="text"
        placeholder="Write a title"
        onChange={handleChange}
        value={task.title}
        className="w-full p-2 rounded-md bg-zinc-600 mb-2"
        autoFocus
      />
      <label htmlFor="description" className="block text-xs font-bold mb-2">
        Description:
      </label>
      <textarea
        name="description"
        placeholder="Write a description"
        onChange={handleChange}
        value={task.description}
        className="w-full p-2 rounded-md bg-zinc-600 mb-2"
      ></textarea>
      <button type="submit" className="bg-indigo-600 px-2 py-1">
        Save
      </button>
    </form>
  );
}

export default TaskForm;
