import { Component, OnInit, ViewChild } from '@angular/core';
import { TodoService } from 'src/app/services/todo.service';
import { Categorias } from 'src/app/models/categorys.model';
import { Fields } from 'src/app/models/fields.model';
import { fieldForm } from './fieldsForm';
import { IonModal } from '@ionic/angular';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-categorys',
  templateUrl: './categorys.page.html',
  styleUrls: ['./categorys.page.scss'],
  standalone: false,
})
export class CategorysPage implements OnInit {
  @ViewChild('modalCategory', { static: false }) modalCategory!: IonModal;

  public categorias: Categorias[] = [];
  public dataFields: Array<Fields> = fieldForm;
  public data: {} = {};
  public edit: boolean = true;
  public idCategoria: number = 0;

  private alertButtons = {
    text: 'Eliminar',
    role: 'confirm',
    handler: async () => {
      const validate = await this.todoService.getRegister(
        'tareas',
        'categoria',
        this.idCategoria
      );

      if (validate) {
        this.utilsService.showToast(
          'Esta categoria no se puede eliminar porque tiene tareas asignadas'
        );
        return;
      }

      this.todoService.delete('categorias', this.idCategoria);
      this.utilsService.showToast('Categoria eliminada');
      this.cargarCategorys();
    },
  };

  constructor(
    private todoService: TodoService,
    private utilsService: UtilsService
  ) {}

  ngOnInit() {}

  async ionViewDidEnter() {
    this.cargarCategorys();
  }

  async cargarCategorys() {
    this.categorias = await this.todoService.all('categorias');
  }

  editCategory(category: Categorias) {
    this.data = category;
    this.edit = true;
    this.modalCategory.present();
  }

  async deleteCategory(id: number) {
    this.idCategoria = id;
    this.utilsService.presentAlert(
      'Eliminar tarea',
      'Desea eliminar esta tarea?',
      this.alertButtons
    );
  }

  reloadData(data: any) {
    this.todoService.add('categorias', data);
    this.cargarCategorys();
    this.modalCategory.dismiss();
    this.edit = false;
  }

  onModalClosed(event: any) {
    this.edit = false;
  }
}
