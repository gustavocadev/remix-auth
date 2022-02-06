import {
    Form,
    LoaderFunction,
    ActionFunction,
    json,
    useNavigate,
    redirect,
    useActionData,
} from "remix";
import { readJSON } from "~/helpers/readJSON";
import { authenticator } from "~/services/auth.server";
import { v4 as uuidv4 } from "uuid";
import { writeJSON } from "~/helpers/writeJSON";
import bcryptjs from "bcryptjs";
import Error from "~/components/Error";

export const action: ActionFunction = async ({ request }) => {
    const formData = await request.formData();

    const password = formData.get("password") as string;
    const username = formData.get("username") as string;

    if (!password || !username) {
        return json({
            error: "No llego la información correctamente 😢",
        });
    }
    const { users } = await readJSON();

    const usernameFound = users.find((user) => user.username === username);

    if (usernameFound) {
        return json({
            error: "el username ya existe 😢",
        });
    }

    const salt = await bcryptjs.genSalt();
    const passwordHash = await bcryptjs.hash(password, salt);

    const newUser = {
        password: passwordHash,
        username,
        id: uuidv4(),
    };

    users.push(newUser);

    await writeJSON(users);
    return redirect("/login");
};

export const loader: LoaderFunction = async ({ request }) => {
    return await authenticator.isAuthenticated(request, {
        successRedirect: "/",
    });
};

export default function SignUp() {
    const actionData = useActionData();
    console.log(actionData);
    return (
        <div className="w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800 mt-10">
            <div className="px-6 py-4">
                <h2 className="text-3xl font-bold text-center text-gray-700 dark:text-white">
                    Genial, te vas a crear una cuenta 😀
                </h2>

                <h3 className="mt-1 text-xl font-medium text-center text-gray-600 dark:text-gray-200">
                    Welcome Back
                </h3>

                <p className="mt-1 text-center text-gray-500 dark:text-gray-400">
                    Create una cuenta
                </p>

                <Form method="post">
                    <div className="w-full mt-4">
                        <input
                            className="block w-full px-4 py-2 mt-2 text-gray-200 placeholder-gray-500 bg-white border rounded-md dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                            type="text"
                            placeholder="Username"
                            name="username"
                            autoComplete="off"
                        />
                    </div>

                    <div className="w-full mt-4">
                        <input
                            className="block w-full px-4 py-2 mt-2 text-gray-200 placeholder-gray-500 bg-white border rounded-md dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                            type="password"
                            placeholder="Password"
                            aria-label="Password"
                            name="password"
                            autoComplete="off"
                        />
                    </div>

                    <div className="flex items-center justify-between mt-4">
                        <button
                            className="px-4 py-2 leading-5 text-white transition-colors duration-200 transform bg-gray-700 rounded hover:bg-gray-600 focus:outline-none"
                            type="submit"
                        >
                            Registrarte
                        </button>
                    </div>
                    {actionData?.error && (
                        <Error className="mt-4">{actionData.error}</Error>
                    )}
                </Form>
            </div>
        </div>
    );
}
