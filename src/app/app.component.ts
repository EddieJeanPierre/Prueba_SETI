import { Component, OnInit, HostListener } from '@angular/core';
import { EventService } from '@core/services/event/event.service';

import { environment } from '@environment/environment';
import { NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService } from '@nebular/theme';
import { Store } from '@ngrx/store';
import { breakPointsMenuConstant } from '@shared/constants/app.constants';
import { BreakPointInterface } from '@shared/interfaces/app.interfaces';
import { EventInterface, EventTypesEnum } from '@shared/interfaces/event.interfaces';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  // Dark theme flag
  darkThemeActive: boolean;
  breakPoints: BreakPointInterface[];
  compactMenu: boolean;

  constructor(
    private themeService: NbThemeService,
    private eventService: EventService,
    private sideBarService: NbSidebarService,
    private menuService: NbMenuService,
    private mediaBreakpointsService: NbMediaBreakpointsService
  ) {
    this.compactMenu = false;
    this.breakPoints = breakPointsMenuConstant;
    this.darkThemeActive = environment.darkThemeActive;
    this.subscribeEvents();
    this.onResize();
  }

  ngOnInit(): void {
    this.onResize(window.innerWidth);
    this.setThemeActive();
    this.sideBarService.collapse();
  }

  /**
   * Sets the active theme in the nebular theme service
   */
  setThemeActive(): void {
    this.themeService.changeTheme(this.darkThemeActive ? 'dark' : 'default');
  }

  /**
   * Toggles the active theme, depending on darkThemeActive var
   */
  toggleTheme(): void {
    this.darkThemeActive = !this.darkThemeActive;
    this.setThemeActive();
  }

  /**
   * Subscribes the Events
   */
  subscribeEvents(): void {
    this.onThemeChange();
    this.onMenuItemClick();
    this.subscribeEventsService();
  }

  /**
   * Detects the on theme change event from nebular theme service and emits its value
   */
  onThemeChange(): void {
    this.themeService.onThemeChange()
      .subscribe(() => {
        this.emitThemeActive();
      });
  }

  onMenuItemClick(): void {
    this.menuService.onItemClick().subscribe(() => {
      if (this.compactMenu) {
        this.sideBarService.compact();
      } else {
        this.sideBarService.collapse();
      }
    });
  }

  /**
   * Emits the dark active theme value
   */
  emitThemeActive(): void {
    const darkThemeActiveEvent: EventInterface = {
      type: EventTypesEnum.DARK_THEME_ACTIVE,
      payload: this.darkThemeActive
    };
    this.eventService.emitEvent(darkThemeActiveEvent);
  }

  /**
   * Subscribes the events from event service
   */
  subscribeEventsService(): void {
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
    if (event.type === EventTypesEnum.TOGGLE_THEME) {
      this.toggleTheme();
    } else if (event.type === EventTypesEnum.DESTROY_SUBSCRIPTIONS) {
      console.log("Destroy Subscriptions:", event.description);
      event.payload.forEach((subscription: Subscription) => {
        if (subscription) {
          subscription.unsubscribe();
        }
      })
    }
  }

  /**
   * 
   */
  @HostListener('window:resize', ['$event'])
  onResize(event?: any): void {
    const currentBreakPoint = this.mediaBreakpointsService.getByWidth(window.innerWidth);
    const breakPointSelected = this.breakPoints.find((breakPoint) => breakPoint.name == currentBreakPoint.name);
    this.compactMenu = breakPointSelected.compact;
    console.log("this.compactMenu:", this.compactMenu);
    this.changeSideBarStatus();
  }

  /**
   * 
   */
  changeSideBarStatus(): void {
    if (this.compactMenu) {
      this.sideBarService.compact();
    } else {
      this.sideBarService.collapse();
    }
  }

}
