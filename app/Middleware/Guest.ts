import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class Guest {
  public async handle({ auth, response }: HttpContextContract, next: () => Promise<void>) {
    // code for middleware goes here. ABOVE THE NEXT CALL

    if (auth.isAuthenticated) {
      const username = auth.user?.toJSON().username;
      return response.redirect(`/${username}`);
    }

    await next();
  }
}
