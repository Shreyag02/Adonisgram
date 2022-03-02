/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from '@ioc:Adonis/Core/Route';

// Route.on('/', async ({ view }) => {
//   return view.render('welcome')
// })

// Route.get('/signup', async ({ view }) => {
//   return view.render('auth/signup')
// })

// Route.get('/login', async ({ view }) => {
//   return view.render('auth/login')
// })

// Route.on('/').render('welcome');
// Route.on('/login').render('auth/login').middleware('guest');
// Route.on('/signup').render('auth/signup').middleware('guest');

// Route.post('/verify-email', 'EmailVerifiesController.index').middleware('auth');
// // Route.get('/confirm-email/:userId/:token', 'EmailVerifiesController.store').middleware('auth');
// Route.get('/confirm-email/:email', 'EmailVerifiesController.confirm').as('confirmEmail');

// Route.post('/signup', 'UsersController.create');
// Route.post('/login', 'UsersController.login');
// Route.post('/logout', 'UsersController.logout');

// Route.get('/:username', 'ProfilesController.index').middleware('auth');

Route.get('/', 'HomeController.index');
Route.on('/signup').render('auth/signup').middleware('guest');
Route.on('/login').render('auth/login').middleware('guest');

Route.get('/confirm-email/:email', 'EmailVerifiesController.confirm').as('confirmEmail');
Route.post('/verify-email', 'EmailVerifiesController.index').middleware('auth');
// Route.get('/verify-email/:email', 'EmailVerifiesController.confirm').as('verifyEmail');

Route.post('/signup', 'UsersController.create');
Route.post('/login', 'UsersController.login');
Route.post('/logout', 'UsersController.logout');

Route.get('/posts/create', 'PostsController.create').middleware('auth');
Route.post('/posts/create', 'PostsController.store').middleware('auth');

Route.post('/follow/:userid', 'FollowsController.store').middleware('auth');
Route.delete('/follow/:userid', 'FollowsController.destroy').middleware('auth');

Route.get('/accounts/edit', 'ProfilesController.edit').middleware('auth');
Route.post('/accounts/edit', 'ProfilesController.update').middleware('auth');
Route.get('/:username', 'ProfilesController.index').middleware('auth');
