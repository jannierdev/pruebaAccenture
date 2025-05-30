export const fieldForm = [
  {
    field: 'titulo',
    typeField: 'input',
    name: 'Título',
    requerido: true,
    maxLength: 20,
    messageError: 'El titulo es obligatorio',
  },
  {
    field: 'descripcion',
    typeField: 'textarea',
    name: 'Descripción',
    requerido: true,
    maxLength: 50,
    messageError: 'La descripción es obligatoria',
  },
  // {
  //   field: 'categoria',
  //   typeField: 'select',
  //   name: 'Categoría',
  //   requerido: true,
  //   messageError: 'La categoria es obligatoria',
  //   options: [
  //     { value: 'A', descripcion: 'Activo' },
  //     { value: 'I', descripcion: 'Inactivo' },
  //   ],
  // },
];
