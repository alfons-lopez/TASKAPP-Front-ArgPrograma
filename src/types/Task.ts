
// es lo que recibimos de la api
export interface Task {
    id?: number,
    titulo: string,
    descripcion: string,
    tiempo: number,
    imagen: string,
    responsable: string,
    estado: string
}