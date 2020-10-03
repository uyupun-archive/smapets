class Client {
  constructor() {
    const dataString = localStorage.getItem("data");
    this.data = JSON.parse(dataString);
    if (this.data === null) {
      this.data = {
        pet: {
          kind: "",
          name: "",
          createDatetime: "",
          deathDatetime: "",
          maxHP: 0,
          hp: 0,
        },
        history: [],
      };
    }
  }

  updatePet(pet) {
    this.data.pet = pet;
    this.updateLocalStorage();
  }

  appendHistory(history) {
    this.data.history.push(history);
    this.updateLocalStorage();
  }

  updateLocalStorage() {
    localStorage.setItem("data", JSON.stringify(this.data));
  }
}

export { Client };
