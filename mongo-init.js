print(' ');
print(' mongo-init ');
print(' ');

rs.initiate({
  _id: 'myReplicaSet',
  members: [{ _id: 0, host: '127.0.0.1' }],
});

let createdCollection = false;

while (!createdCollection) {
  try {
    replicaStatus = rs.status();

    print(' ');
    print(' mongo-init: Creating collection');

    db = db.getSiblingDB('fintech');
    db.createCollection('users');
    createdCollection = true;

    print(' ');
    print(' mongo-init: Created collection');

    db.users.createIndex({ email: 1 }, { unique: true });
    db.users.createIndex({ cpf: 1 }, { unique: true });

  } catch (err) {
    print(' ');
    print(' mongo-init Error');
    print(err.message);
  }
}
