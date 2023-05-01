import { USER_MUTATIONS } from './mutations/user';

const admin = require('firebase-admin');

const fetchAllUsers = (callback: any) => {
  admin.firestore().collection('users')
    .get()
    .then((item: any) => {
      const items: any[] = [];
      item.docs.forEach((item: any) => {
        console.log('Adding...');
        items.push(item.data());
      });
      return callback(items);
    })
    .catch((e: any) => console.log(e));
};

export default {
  Query: {
    users: () => {
      return new Promise((resolve, reject) => {
        fetchAllUsers((data: any) => {
          resolve(data);
        });
      });
    }
  },
  Mutation: {
    ...USER_MUTATIONS
  }
};

