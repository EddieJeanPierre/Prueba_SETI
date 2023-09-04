import { Component, OnInit } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';
import { MockMenuService } from '@shared/mock-services/mock-menu.service';

@Component({
  selector: 'app-menu-sidebar',
  templateUrl: './menu-sidebar.component.html',
  styleUrls: ['./menu-sidebar.component.scss']
})
export class MenuSidebarComponent implements OnInit {

  menuItems: NbMenuItem[];

  constructor(
    private menuService: MockMenuService
  ) {
    this.menuItems = [];
  }

  ngOnInit() {
    this.getMenu();
  }

  /**
   * 
   */
  getMenu(): void {
    this.menuService.getMenu().subscribe((menuItems) => {
      menuItems.forEach((menuItem) => {
        if (menuItem.status) {
          this.menuItems.push({
            title: menuItem.title,
            link: menuItem.link,
            icon: menuItem.icon,
          });
        }
      });
    });

  }

}
