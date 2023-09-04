import { Component, Input } from '@angular/core';
import { EventService } from '@core/services/event/event.service';
import { NbSidebarService } from '@nebular/theme';
import { EventInterface, EventTypesEnum } from '@shared/interfaces/event.interfaces';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  // Input Data
  @Input() compactMenu: boolean = false;
  // Theme active
  darkThemeActive: boolean;

  constructor(private sideBarService: NbSidebarService, private eventService: EventService) {
    this.darkThemeActive = false;
    this.subscribeEvents();
  }

  toggleSideBar() {
    console.log("this.compactMenu2:", this.compactMenu);
    this.sideBarService.toggle(this.compactMenu);
  }

  /**
   * Emits the change theme event
   */
  toggleThme(): void {
    const toggleThemeEvent: EventInterface = {
      type: EventTypesEnum.TOGGLE_THEME
    };
    this.eventService.emitEvent(toggleThemeEvent);
  }

  /**
   * Subscribes the events and register its subscription
   */
  subscribeEvents(): void {
    this.eventService.event$.subscribe((event) => {
      this.processEvent(event);
    });
  }

  /**
   * 
   * @param event Event service event emitted
   * 
   * Process the event from the event service
   */
  processEvent(event: EventInterface): void {
    if (event.type === EventTypesEnum.DARK_THEME_ACTIVE) {
      this.darkThemeActive = event.payload;
    }
  }
}
