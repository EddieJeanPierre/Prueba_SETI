import { Injectable } from '@angular/core';
import { EventInterface, EventTypesEnum } from '@shared/interfaces/event.interfaces';

import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private event = new BehaviorSubject<EventInterface>({
    type: EventTypesEnum.INITIAL,
    payload: null,
  });

  event$ = this.event.asObservable();

  constructor() {
    // Empty
  }

  emitEvent(event: EventInterface): void {
    console.log("New Event:", event.type);
    this.event.next(event);
  }

}
