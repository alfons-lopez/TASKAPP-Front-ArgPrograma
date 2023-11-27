import { Link } from "react-router-dom";
import { Task } from "../../types/Task";

                      // array de objetos
const CategoriasTareas = ({ tasks } : { tasks: Task[] } ) => {

  const categorias = ['PORHACER', 'ENPRODUCCION', 'PORTESTEAR', 'COMPLETADA'];


  return (
    <section className="container-fluid mt-5" id="categorias">
    {/* <section className="container container-md constainer-sm mt-5" id="categorias"> */}
      { categorias.map((categoria, index) => (
        
        <section className="text-center mb-5" key={ index }>
          <h3 className="display-6"> { categoria } </h3>
   
          <div className="row row-cols-1 row-cols-md-2 row-cols-xl-4 justify-content-center g-4">

            { tasks.filter( tasks => tasks.estado === categoria.toUpperCase() )    // filtra las tareas por categoria
              .map(task => (

                // id
                <div className="col" key={ task.id }>
                  <div className="card h-100">

                    {/* imagen */}
                    <img 
                      // style={{ minHeight: '260px', maxHeight: '260px', objectFit: 'cover', objectPosition: 'top center' }} 
                      style={{ minHeight: '280px', maxHeight: '280px'}} 
                      className="card-img-top" 
                      src={ task.imagen } alt={ task.titulo }
                    />

                    <div className="card-body p-4">
                      <div className="text-center">

                        {/* body de la tarjeta */}
                        <h5 className="fw-bolder"> { task.titulo } </h5>
                        <span> { `Tiempo: ${ task.tiempo } días` } </span>
                        <br />
                        <span> { `Responsable: ${ task.responsable } ` } </span>

                      </div>
                    </div>

                    {/* botón de ver más, que nos redirige al detalle de la tarea */}
                    <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                      <div className="text-center d-flex gap-1 align-items-center justify-content-center">
                        <Link 
                          to={ `/detalle/${task.id}` } 
                          className="btn btn-primary" 
                          style={{ width: '100%' }}
                        >
                          DETALLE TAREA
                        </Link>
                      </div>
                    </div>

                  </div>
                </div>
              ))
            }
          </div>
        </section>
      ))}

    </section>
  )
}

export default CategoriasTareas;