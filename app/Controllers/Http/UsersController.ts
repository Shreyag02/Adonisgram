import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

import { schema, rules } from '@ioc:Adonis/Core/Validator';
import User from 'App/Models/User';

export default class UsersController {
  public async create({ request, response }: HttpContextContract) {
    const req = await request.validate({
      schema: schema.create({
        name: schema.string(),
        email: schema.string({}, [
          rules.email({
            sanitize: true,
            ignoreMaxLength: true,
            domainSpecificValidation: true,
          }),
          rules.unique({ table: 'users', column: 'email' }),
        ]),

        username: schema.string({}, [rules.unique({ table: 'users', column: 'username' })]),

        password: schema.string({}, [
          rules.regex(/^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]{6,16}$/),
        ]),
      }),
      messages: {
        'required': 'The {{ field }} is required to create a new account',
        'username.unique': 'Username not available',
        'email.unique': 'Email already exists',
        'password.regex': 'Invalid password',
      },
    });

    const user = new User();
    user.name = req.name;
    user.email = req.email;
    user.username = req.username;
    user.password = req.password;
    await user.save();

    //send email

    user?.sendVerificationEmail();

    return response.redirect('/');
  }

  public async login({ request, response, auth }: HttpContextContract) {
    const req = await request.validate({
      schema: schema.create({
        email: schema.string({}, [
          rules.email({
            sanitize: true,
            ignoreMaxLength: true,
            domainSpecificValidation: true,
          }),
        ]),

        password: schema.string(),
      }),
      messages: {
        required: 'The {{ field }} is required to login',
      },
    });

    const { email, password } = req;

    const user = await auth.attempt(email, password);

    return response.redirect(`/${user.username}`);
  }

  public async logout({ response, auth }: HttpContextContract) {
    await auth.logout();

    return response.redirect('/');
  }
}
