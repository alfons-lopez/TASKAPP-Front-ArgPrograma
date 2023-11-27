import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { RiDeleteBin6Line } from "react-icons/ri";
import { GrDocumentUpdate } from "react-icons/gr";
import { Task } from '../../types/Task';
import { TaskService } from '../../service/TaskService';
import 'react-toastify/dist/ReactToastify.css';
import { Button } from 'react-bootstrap';


const DetalleTarea = () => {

  const { taskId } = useParams<{ taskId?: string }>(); // para pasar un id a la url

  const [ task, setTask ] = useState<Task | null>(null); // estado de la tarea
  const [ estado, setEstado ] = useState<string>('');
  const [ relatedTasks, setRelatedTasks ] = useState<Task[]>([]);//  tareas relacionadas a un estado en particular

  const navigate = useNavigate(); // Redirigir al  usuario a la pagina principal (navegar entre paginas)


  //----------- OBTENER UNA TAREA  ----------------
  useEffect(() => {

    const fetchTask = async () => {
      try {
        if( taskId && !isNaN(parseInt( taskId, 10 )) ) { // isNaN = no es un numero
          //* obtener una tarea
          const taskData = await TaskService.getOneTask(parseInt( taskId, 10 ));
          setTask( taskData );

          //* obtener las tareas relacionadas a esa categoria
          const tasksInCategory = await TaskService.getTasksInCategory( taskData.estado );
          setRelatedTasks( tasksInCategory );

        } else {
          console.error('Identificador de una tarea no válido');          
        }
        
      } catch (error) {
        console.error('Error al cargar la tarea:', error);
      }      
    }

    fetchTask();

  }, [ taskId ]);  // se reenderiza por primera ves o cuando taskId cambie - (id de la tarea)



  // ---------- CAMBIAR EL ESTADO A UNA TAREA -----------
const handleUpdateState = async () => { 

  if( estado !== '' ) {
    try {
      
      const updatedTask = await TaskService.updateStateTask(parseInt( taskId!, 10), estado);

      // Actualiza la tarea local con la tarea actualizada
      setTask( updatedTask );

      // Muestra una notificación de éxito utilizanod react-toastify
      toast.success('Estado de la tarea actualizado correctamente', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000
      });

    } catch (error) {
      // Maneja errores de la actualización de la tarea y muestra una notificación de error
      toast.error('Error al actualizar es estado de la tarea:', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000
      });
      
      console.error('Error al actualizar es estado de la tarea:', error);
    }

  } else {
    // Si el estado está vacío, muestra un mensaje de error y una notificación
    toast.error('Selecciona un estado válido', {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2000
    });
    
    console.error('Selecciona un estado válido');
  }

};


// ----------- ELIMINAR UNA TAREA ------------
const handleDeleteTask =  async () => {
  try {
    
    if( taskId ) {
      await TaskService.deleteTask(parseInt( taskId, 10 ));
      toast.success('Tarea eliminada correctamente', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000
      });
      console.log('Tarea eliminada con éxito');

      // Redirige al usuario a la página principal después de eliminar la tarea
      navigate('/');
    }

  } catch (error) {
    
    toast.error('Error al eliminar la tarea', {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2000
    });

    console.error('Error al eliminar la tarea:', error);
  }
}


  return (
    <div className='container mt-5'>
      { task && (
        <div className='row border-bottom'>
          <h3 className='text-center bg-primary text-white fw-bolder p-4 mb-4'> Detalles de la tarea con ID: { task.id } </h3>
          <h1 className="display-6 fw-bolder mb-4"> Titulo: { task.titulo } </h1>

          <div className='col-12 col-md-6'>
            <img 
              src={ task.imagen } alt={ task.titulo } 
              className='card-img-top mb-5'
              style={{ minHeight: '300px', maxHeight: '340px'  }} 
            />
          </div>

          <div className='col-12 col-md-6'>
            
            <p className="lead">Descripción: { task.descripcion }</p>
            <h5> Estado actual: { task.estado } </h5>
            <p className="lead">Tiempo: { task.tiempo } días</p>
            <p className="lead">Responsable: { task.responsable }</p>

            <div className="p-2 bg-body-secondary rounded">
              <p className='fw-bolder'>¿Desea Modificar el estado?</p>
              <select className='form-select mb-3' onChange={ (e) => setEstado(e.target.value) } value={ estado }>
                <option value=""> Seleccionar estado </option>
                <option value="PORHACER"> Por hacer </option>
                <option value="ENPRODUCCION"> En producción </option>
                <option value="PORTESTEAR"> Por testear </option>
                <option value="COMPLETADA"> Completada </option>
              </select>

              <div className='d-flex flex-nowrap'>
                <button className='btn btn-danger d-flex align-items-center' onClick={ handleDeleteTask }><RiDeleteBin6Line /> Eliminar tarea</button>
                <button className='btn btn-primary ms-2 d-flex align-items-center' onClick={ handleUpdateState }> <GrDocumentUpdate /> Actualizar estado</button>

              </div>
              
            </div>
          </div>

        </div>
      )}

      {/* tareas relacionadas */}
      <div className="row mt-5">
        { relatedTasks.map((relatedTask) => (
          <div className='col-12 col-md-4 mb-4' key={ relatedTask.id }>
            <div className="card h-100">
              <img 
                src={ relatedTask.imagen } alt={ relatedTask.titulo } 
                style={{ minHeight: '260px', maxHeight: '260px' }}   
                className='card-img-top' 
              />

              <div className="card-body p-4 text-center">
                <h5 className="fw-bolder">{ relatedTask.titulo }</h5>
                <span className="fw-bolder">Tiempo: { relatedTask.tiempo } días</span>
                <br />
                <span className="card-text">Responsable: { relatedTask.responsable }</span>
              </div>

                <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">

                  <Button 
                    variant="primary" 
                    style={{ width: '100%' }} 
                    onClick={ () => navigate(`/detalle/${relatedTask.id}`) } 
                    >
                    DETALLE TAREA               
                  </Button>
                </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DetalleTarea