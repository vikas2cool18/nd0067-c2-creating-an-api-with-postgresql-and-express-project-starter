import supertest from 'supertest';
import app from '../server';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();
const { BCRYPT_PEPPER, BCRYPT_SALT_ROUNDS } = process.env;
const saltRounds = BCRYPT_SALT_ROUNDS as string;
const pepper = BCRYPT_PEPPER as string;

let token_1: string;
let category_1_id: number;
let category_2_id: number; 
let id_user_1 = -1;
let id_user_2 = -1;
let id_product_1: number;
let id_product_2: number;

const request = supertest(app);

describe('api endpoint user testing', () => {
  
 
  // first create two users
  it('CREATE route - test POST on /user', async () => {
      let res = await request.post('/user').send({ first_name: 'William', last_name: 'Clinton', password_digest: '1992%' });
      expect(res.status).toEqual(201);
      expect(res.body.first_name).toEqual('William');
      expect(res.body.last_name).toEqual('Clinton');
      expect(bcrypt.compareSync('1992%' + pepper, res.body.password_digest)).toBeTruthy();
      id_user_1 = res.body.id;
      res = await request.post('/user').send({ first_name: 'Donald', last_name: 'Trump', password_digest: 'MAGA2020' });
      expect(res.status).toEqual(201);
      expect(res.body.first_name).toEqual('Donald');
      expect(res.body.last_name).toEqual('Trump');
      expect(bcrypt.compareSync('MAGA2020' + pepper, res.body.password_digest)).toBeTruthy();
      id_user_2 = res.body.id;
  });

  // authenticate
  it('Authenticate user route - test POST on /user/authenticate', async () => {
    const res = await request
        .post('/user/authenticate')
        .send({ first_name: 'William', last_name: 'Clinton', password_digest: '1992%' });
        token_1=res.body;
    expect(res.status).toEqual(200);
    expect(res.body).not.toBeNull();
});


  it('INDEX route - test GET on /user', async () => {
      const res = await request.get('/user').set('Authorization', `Bearer ${token_1}`);
      expect(res.status).toEqual(200);
     // expect(res.body.contentList.length).toEqual(2); // could fail if some users were in the table at the start
      expect(res.body.contentList[0].first_name).toEqual('William');
      expect(res.body.contentList[1].first_name).toEqual('Donald');
  });

  // show 'Donald'
  it('SHOW route - test GET on /user/:id', async () => {
      const res = await request.get('/user/' + id_user_2.toString()).set('Authorization', `Bearer ${token_1}`);
      expect(res.status).toEqual(200);
      expect(res.body.id).toEqual(id_user_2);
      expect(res.body.first_name).toEqual('Donald');
  });

  
  // delete the two users
  it('DELETE route - test DELETE on /user', async () => {
      let res = await request.delete('/user/' + id_user_1.toString()).set('Authorization', `Bearer ${token_1}`);
      expect(res.status).toEqual(200);
      expect(res.body.first_name).toEqual('William');
      res = await request.delete('/user/' + id_user_2.toString()).set('Authorization', `Bearer ${token_1}`);
      expect(res.status).toEqual(200);
      expect(res.body.first_name).toEqual('Donald');
      // check that there no users left
     /*  res = await request.get('/user').set('Authorization', `Bearer ${token_1}`);
      expect(res.status).toEqual(200);
      expect(res.body.length).toEqual(0); */
  });
});

describe('api endpoint category and product testing', () => {
  
  // first create two categories
  it('CREATE route - test POST on /categories', async () => {
      let res = await request.post('/category').send({ name: 'book' }).set('Authorization', `Bearer ${token_1}`);
      expect(res.status).toEqual(201);
      expect(res.body.name).toEqual('book');
      category_1_id = res.body.id;
      res = await request.post('/category').send({ name: 'DVD' }).set('Authorization', `Bearer ${token_1}`);
      expect(res.status).toEqual(201);
      expect(res.body.name).toEqual('DVD');
      category_2_id = res.body.id;
  });

  it('INDEX route - test GET on /categories', async () => {
      const res = await request.get('/category').set('Authorization', `Bearer ${token_1}`);
      expect(res.status).toEqual(200);
      expect(res.body.contentList[0].name).toEqual('book');
      expect(res.body.contentList[1].name).toEqual('DVD');
  });

  it('SHOW route - test GET on /category/:id', async () => {
      const res = await request.get('/category/' + (category_1_id as number).toString()).set('Authorization', `Bearer ${token_1}`);
      expect(res.status).toEqual(200);
      expect(res.body.name).toEqual('book');
  });

  // first create two products
  it('CREATE route - test POST on /products', async () => {
    let res = await request
        .post('/product')
        .send({ name: 'The jungle book', price: 7.5, categoryId: category_1_id })
        .set('Authorization', `Bearer ${token_1}`);
    expect(res.status).toEqual(201);
    expect(res.body.name).toEqual('The jungle book');
    expect(res.body.price).toEqual(7.5);
    id_product_1 = res.body.id;
    res = await request
        .post('/product')
        .send({ name: 'Tarzan', price: 15.0, categoryId: category_2_id })
        .set('Authorization', `Bearer ${token_1}`);
    expect(res.status).toEqual(201);
    expect(res.body.name).toEqual('Tarzan');
    expect(res.body.price).toEqual(15.0);
    id_product_2 = res.body.id;
});

it('INDEX route - test GET on /products', async () => {
  const res = await request.get('/product').set('Authorization', `Bearer ${token_1}`);
  expect(res.status).toEqual(200);
  expect(res.body.contentList[0].name).toEqual('The jungle book');
  expect(res.body.contentList[1].name).toEqual('Tarzan');
});

});

 
