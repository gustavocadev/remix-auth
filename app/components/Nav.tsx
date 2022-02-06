import { User } from "~/models/user";
import {
    Link,
    LoaderFunction,
    useLoaderData,
    ActionFunction,
    Form,
} from "remix";

interface NavProps {
    user: User;
}

export default function Nav({ user }: NavProps) {
    return (
        <nav className="bg-white shadow dark:bg-gray-800">
            <div className="container flex items-center justify-center p-6 mx-auto text-gray-600 capitalize dark:text-gray-300">
                {!user ? (
                    <>
                        <Link
                            to="/login"
                            className="border-b-2 border-transparent hover:text-gray-800 transition-colors duration-200 transform dark:hover:text-gray-200 hover:border-blue-500 mx-1.5 sm:mx-6"
                        >
                            Iniciar sesion
                        </Link>

                        <Link
                            to="/signup"
                            className="border-b-2 border-transparent hover:text-gray-800 transition-colors duration-200 transform dark:hover:text-gray-200 hover:border-blue-500 mx-1.5 sm:mx-6"
                        >
                            Registrarte
                        </Link>
                    </>
                ) : (
                    <>
                        <Link
                            to="/"
                            className="text-gray-800 transition-colors duration-200 transform dark:text-gray-200 border-b-2 border-blue-500 mx-1.5 sm:mx-6"
                        >
                            home
                        </Link>
                        <Form method="post">
                            <button
                                name="_action"
                                value="logout"
                                type="submit"
                                className="text-gray-800 transition-colors duration-200 transform dark:text-gray-200 border-b-2 border-blue-500 mx-1.5 sm:mx-6"
                            >
                                Logout
                            </button>
                        </Form>
                    </>
                )}
            </div>
        </nav>
    );
}
