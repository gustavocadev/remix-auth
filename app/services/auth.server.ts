import { Authenticator, AuthorizationError  } from 'remix-auth'
import { FormStrategy } from 'remix-auth-form'
import { readJSON } from '~/helpers/readJSON'
import { User } from '~/models/user'
import { sessionStorage } from './session.server'
import bcryptjs from 'bcryptjs';

export const authenticator = new Authenticator<User>(sessionStorage)

authenticator.use(new FormStrategy(async ({ form }) => {
    const username = form.get('username') 
    const password = form.get('password') as string
    const { users } = await readJSON()
    if (!username) throw new AuthorizationError("Username is required");

    if (!password) throw new AuthorizationError("Password is required");

    const user = users.find((el) => el.username === username) as User

    if (!user) {
        throw new AuthorizationError("El usuario no existe");
    }

    const isMatchPassword = await bcryptjs.compare(password, user.password)

    if (!isMatchPassword) {
        throw new AuthorizationError("La contraseña es incorrecta");
    }
    return user
}))

