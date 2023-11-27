import { useEffect, useState } from 'react'
import CarouselHome from '../components/CarouselHome/CarouselHome'
import CategoriaSelector from '../components/CategoriasSelector/CategoriasSelector'
import CategoriaTareas from '../components/CategoriasTareas/CategoriasTareas'
import { Task } from '../types/Task'
import { TaskService } from '../service/TaskService'

const LandingPage = () => {

  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);  // Estado para almacenar tareas filtradas
  const [selectedCategory, setSelectedCategory] = useState<string>(''); // Estado para la categoría seleccionada


  useEffect(() => {
    const fetchTasks = async () => {
      const tasksData = await TaskService.getAllTasks();
      setTasks(tasksData);
    }

    fetchTasks();

  }, [])


  // Efecto para filtrar las tareas cuando se selecciona una categoria
  useEffect(() => {
    if( selectedCategory ) {
      const filtered = tasks.filter( task => task.estado.toUpperCase() === selectedCategory.toUpperCase() );
      setFilteredTasks( filtered );

    } else {
      setFilteredTasks( tasks ); // si no hay categoria seleccionada, mostrar todas las tareas
    }

  }, [ selectedCategory, tasks ]);
  
  

  return (
    <>
        <CarouselHome />
        <CategoriaSelector  onSelectedCategory={ setSelectedCategory }/>
        <CategoriaTareas tasks={ filteredTasks.length > 0 ? filteredTasks : tasks } />
    </>
  )
}

export default LandingPage