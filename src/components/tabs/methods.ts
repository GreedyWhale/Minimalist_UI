function listenSelected(this: any) {
  if (this.eventBus && typeof this.eventBus.$on === "function") {
    this.eventBus.$on("update:selected", (selected: number | string) => {
      this.isActive = this.name === selected;
    });
  }
}

export { listenSelected };
