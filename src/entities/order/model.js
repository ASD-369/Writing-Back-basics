export class Order {
  constructor({ id, userId, productIds, total, status }) {
    this.id = id;
    this.userId = userId;
    this.productIds = productIds || [];
    this.total = total || 0;
    this.status = status || 'new';
  }

  update({ userId, productIds, total, status }) {
    if (userId !== undefined) this.userId = userId;
    if (productIds !== undefined) this.productIds = productIds;
    if (total !== undefined) this.total = total;
    if (status !== undefined) this.status = status;
    return this;
  }
}