export class Product {
  constructor({ id, title, price, description }) {
    this.id = id;
    this.title = title;
    this.price = price;
    this.description = description || '';
  }

  update({ title, price, description }) {
    if (title !== undefined) this.title = title;
    if (price !== undefined) this.price = price;
    if (description !== undefined) this.description = description;
    return this;
  }
}