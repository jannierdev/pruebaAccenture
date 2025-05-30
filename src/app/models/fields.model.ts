export interface Fields {
    field: string;
    typeField: string;
    requerido: boolean;
    name: string;
    messageError: string;
    maxLength?: number;
    pattern?: string;
    options?: Options[];
    visible?: boolean
}

export interface Options {
    id: number;
    nombre: string;
}