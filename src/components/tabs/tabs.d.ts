interface EventHandler {
  (eventName: string, ...rest: any[]): any;
}

interface EventBus {
  $on: EventHandler;
  $emit: EventHandler;
}

export { EventBus };
