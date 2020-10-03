class Client {
  constructor() {
    const dataString = localStorage.getItem("data");
    this.data = JSON.parse(dataString);
    if (this.data === null) {
      this.data = {
        user: {
          name: "",
        },
        dog: {
          kind: "",
          name: "",
          createDatetime: "",
          maxHP: 0,
          hp: 0,
        },
        history: [],
      };
    }
  }

  updateUser(user) {
    this.data.user = user;
    this.updateLocalStorage();
  }

  updateDog(dog) {
    this.data.dog = dog;
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
