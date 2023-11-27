import { useState, useEffect } from 'react';
import { Task } from '../../types/Task';
import { TaskService } from '../../service/TaskService';
import CategoriasSelector from '../CategoriasSelector/CategoriasSelector';
import CategoriasTareas from '../CategoriasTareas/CategoriasTareas';


const Categoria = () => {

    const [ tasks, setTasks ] = useState<Task[]>([]);// tiene array de las tareas
    const [ selectedCategory, setSelectedCategory ] = useState<string>(''); // Estado para la categoria seleccionada -- filtrado de tareas

    useEffect(() => {
        const fetchTasks = async () => {
            const tasksData = await TaskService.getAllTasks();
            setTasks( tasksData );
        };

        fetchTasks();

    }, []);


    // Filtra las tareas por la categoria seleccionada
    const filteredTasks = selectedCategory 
        ? tasks.filter( task => task.estado.toUpperCase() === selectedCategory.toUpperCase() ) 
        : tasks;
    

    return (
        <div className='container mt-5'>
            {/* pasa la funcion para manejar la selección de categoria */}
            <CategoriasSelector onSelectedCategory={ setSelectedCategory } /> 

            {/* pasa las tareas filtradas al componente categoriasTareas */}
            <CategoriasTareas tasks={ filteredTasks }/> 
        </div>
    )
}

export default Categoria;