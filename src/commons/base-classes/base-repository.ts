type OmitImmutableColumns<T> = Omit<T, 'id'>;

abstract class BaseModel<Entity> {
  create: (params: unknown) => Promise<Entity>;
  findUnique: (params: unknown) => Promise<Entity>;
  update: (params: unknown) => Promise<Entity>;
  delete: (params: unknown) => Promise<Entity>;
}

class BaseRepository<Entity, Model> {
  constructor(protected model: Model & BaseModel<Entity>) {}

  async create(data: OmitImmutableColumns<Entity>) {
    const createdRow = await this.model.create({ data });
    return createdRow;
  }

  async get(id: number) {
    const row = await this.model.findUnique({ where: { id } });
    return row;
  }

  async update(id: number, data: Partial<OmitImmutableColumns<Entity>>) {
    const updatedRow = await this.model.update({ data, where: { id } });
    return updatedRow;
  }

  async delete(id: number) {
    const deletedRow = await this.model.delete({ where: { id } });
    return deletedRow;
  }
}

export default BaseRepository;
