import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesContainerComponent } from './categories-container/categories-container.component';
import { SubcategoriesContainerComponent } from './subcategories-container/subcategories-container.component';
import { CardContainerComponent } from './card-container/card-container.component';
import { MenuContainerComponent } from './menu-container.component';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    MenuContainerComponent,
  	CategoriesContainerComponent,
    SubcategoriesContainerComponent,
    CardContainerComponent
  ],
  providers: [],
  exports: [MenuContainerComponent]
})
export class MenuContainerModule { }
