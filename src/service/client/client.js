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

  async updateUser(user) {
    this.data.user = user;
    await this.updateLocalStorage();
  }

  async updateDog(dog) {
    this.data.dog = dog;
    await this.updateLocalStorage();
  }

  async appendHistory(history) {
    this.data.history.append(history);
    await this.updateLocalStorage();
  }

  async updateLocalStorage() {
    localStorage.setItem("data", JSON.stringify(this.data));
  }
}

export { Client };
