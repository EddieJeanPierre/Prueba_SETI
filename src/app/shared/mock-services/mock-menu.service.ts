import { Injectable } from '@angular/core';
import { MenuItem } from '@shared/interfaces/menu.interfaces';
import { mockMenuItem } from '@shared/mock-responses/mock-menu.responses';
import { Observable, delay, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MockMenuService {

  private menuItem: MenuItem[] = mockMenuItem;

  constructor() {
    // Empty
  }

  getMenu(): Observable<MenuItem[]> {
    return of(this.menuItem).pipe(delay(1500));
  }

}
