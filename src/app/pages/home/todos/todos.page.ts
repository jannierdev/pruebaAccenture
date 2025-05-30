import { Component, ViewChild } from '@angular/core';
import { Fields } from 'src/app/models/fields.model';
import { Tareas } from 'src/app/models/todo.model';
import { TodoService } from 'src/app/services/todo.service';
import { fieldForm } from './fieldsForm';
import { Categorias } from 'src/app/models/categorys.model';
import { IonModal } from '@ionic/angular';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.page.html',
  styleUrls: ['./todos.page.scss'],
  standalone: false,
})
export class TodosPage {
  @ViewChild('modal', { static: false }) modal!: IonModal;

  public tareas: Tareas[] = [];
  public categorias: Categorias[] = [];
  public dataFields: Array<Fields> = [];
  public idTarea: number = 0;
  public idCategoria: number = 0;

  private alertButtons = {
    text: 'Eliminar',
    role: 'confirm',
    handler: async () => {
      await this.todoService.delete('tareas', this.idTarea);
      this.utilsService.showToast('Tarea eliminada');
      this.cargarTareas();
    },
  };

  constructor(
    private todoService: TodoService,
    private utilsService: UtilsService
  ) {}

  ngOnInit() {}

  async ionViewDidEnter() {
    this.cargarTareas();
    this.cargarCategorys();
  }

  async cargarTareas() {
    const loadier = this.utilsService.loading('Por favor espere...');

    this.tareas = [];
    let tareas = [];

    if (this.idCategoria === 0) tareas = await this.todoService.all('tareas');
    else
      tareas = await this.todoService.filterToCategory(
        'tareas',
        'categoria',
        this.idCategoria
      );

    if (tareas) (await loadier).dismiss();

    for (let item of tareas) {
      const nombreCategoria = await this.todoService.getRegister(
        'categorias',
        'id',
        item.categoria
      );
      this.tareas.push({
        ...item,
        nombreCategoria: nombreCategoria.nombre,
      });
    }
  }

  async cargarCategorys() {
    this.dataFields = [];
    this.categorias = await this.todoService.all('categorias');
    this.categorias.unshift({ id: 0, nombre: 'Seleccionar todo' });
    const categorias = await this.todoService.all('categorias');
    this.dataFields.push(...fieldForm, {
      field: 'categoria',
      typeField: 'select',
      name: 'Categoria',
      requerido: true,
      messageError: 'Campo obligatorio',
      options: categorias,
    });
  }

  async completar(id: number) {
    this.todoService.update('tareas', id);
    this.utilsService.showToast('Tarea completada');
    this.cargarTareas();
  }

  async eliminar(id: number) {
    this.idTarea = id;
    this.utilsService.presentAlert(
      'Eliminar tarea',
      'Desea eliminar esta tarea?',
      this.alertButtons
    );
  }

  async getRegister(id: number) {
    const category = await this.todoService.getRegister('categorias', 'id', id);
    return category.nombre;
  }

  reloadData(data: any) {
    this.todoService.add('tareas', { completado: false, ...data });
    this.utilsService.showToast('Tarea creada');
    this.cargarTareas();
    this.modal.dismiss();
  }
}
