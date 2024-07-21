print(' ');
print(' mongo-init ####################################### ');

const database = 'fintech';
db = db.getSiblingDB(database);
db.createUser({
  user: 'fintech_user',
  pwd: 'fintech',
  roles: [{ role: 'readWrite', db: database }],
});
db.createCollection('users');
