export class User {
  constructor({ id, name, email }) {
    this.id = id;
    this.name = name;
    this.email = email;
  }

  update({ name, email }) {
    if (name !== undefined) this.name = name;
    if (email !== undefined) this.email = email;
    return this;
  }
}