function listenSelected(this: any) {
  this.eventBus.$on("update:selected", (selected: number | string) => {
    this.isActive = this.name === selected;
  });
}

export { listenSelected };
