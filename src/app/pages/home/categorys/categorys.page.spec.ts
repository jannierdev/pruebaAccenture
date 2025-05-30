import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CategorysPage } from './categorys.page';

describe('CategorysPage', () => {
  let component: CategorysPage;
  let fixture: ComponentFixture<CategorysPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CategorysPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
