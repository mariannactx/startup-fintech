interface Database {
  findAll(): User[];
  findById(id: number): User;
  save(id: number, data: User): boolean;
}
