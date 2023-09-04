export interface EventInterface {
    type: EventTypesEnum;
    payload?: any;
    id?: string;
    description?: string;
}

export enum EventTypesEnum {
    INITIAL = 'Initial',
    TOGGLE_THEME = 'Toggle theme',
    DARK_THEME_ACTIVE = 'Dark theme active',
    DESTROY_SUBSCRIPTIONS = "Destroy subscriptions",
}