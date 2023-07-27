export interface CRUDRepository<Entity, Id, Return> {
  create(entity: Entity): Promise<Return>;
  remove(id: Id): Promise<void>;
  update(id: Id, entity: Entity): Promise<Return>;
  findById(id: Id): Promise<Return | null>;
}
