import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-category-menu-item',
  templateUrl: './category-menu-item.component.html',
  styleUrls: ['./category-menu-item.component.css']
})
export class CategoryMenuItemComponent {
  @Input() categoryName: string;
  @Input() checked = false;
  @Output() selected = new EventEmitter<string>();

  onSelected() {
    this.selected.emit(this.categoryName);
  }
}
