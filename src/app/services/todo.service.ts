import { Injectable } from '@angular/core';
import { Tareas } from '../models/todo.model';
import Dexie, { Table } from 'dexie';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  db!: Dexie;
  todoLists!: Table<Tareas, number>;

  constructor() {
    this.db = new Dexie('toDoList');
    this.db.version(4).stores({
      tareas: '++id,titulo,descripcion,categoria,completado',
      categorias: '++id,nombre',
    });
  }

  async all(table: string) {
    return this.db.table(table).toArray();
  }

  async add(table: string, data: Tareas) {
    return this.db.table(table).put(data);
  }

  async update(table: string, id: number) {
    return this.db.table(table).update(id, { completado: true });
  }

  async delete(table: string, id: number) {
    return this.db.table(table).delete(id);
  }

  async getRegister(table: string, field: string, id: number) {
    return this.db.table(table).where(field).equals(id).first();
  }

  async filterToCategory(table: string, field: string, id: number) {
    return this.db.table(table).where(field).equals(id).toArray();
  }
}
