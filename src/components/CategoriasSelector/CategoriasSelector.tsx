import { BsBookmarkCheck, BsCheck, BsGear, BsPencilSquare } from 'react-icons/bs';

interface CategoriasSelectorProps {
  onSelectedCategory: (categoria: string) => void; // categoria seleccionada
}

const CategoriasSelector: React.FC<CategoriasSelectorProps> = ({ onSelectedCategory }) => {

  const categorias = [
    { nombre: 'PORHACER', icono: <BsCheck /> },
    { nombre: 'ENPRODUCCION', icono: <BsGear /> },
    { nombre: 'PORTESTEAR', icono: <BsPencilSquare /> },
    { nombre: 'COMPLETADA', icono: <BsBookmarkCheck /> },
  ]
 

  return (
    <section className='container mt-3' id='selector-categorias'>
      <p className='fs-3 text-center text-uppercase'> Seleccione una categoria</p>
      
      <div className='row gap-4'>

         {/* acceder al array de categorias */}
        { categorias.map(( categoria, index ) => (
          <div className='col d-flex justify-content-center p-4' key={ index }>
            <button 
              onClick={ () => onSelectedCategory( categoria.nombre ) }
              className='btn btn-primary border border-0 border-black d-flex gap-1 align-items-center rounded p-2 px-4 text-decoration-none'
              style={ { cursor: 'pointer' }}
            >
              { categoria.icono } { categoria.nombre }
            </button>
          </div>
        ))}

      </div>
    </section>
  )
}

export default CategoriasSelector