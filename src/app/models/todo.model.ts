export interface Tareas {
  id?: number;
  titulo: string;
  descripcion: string;
  categoria: number;
  completado: boolean;
  nombreCategoria?: string
}
