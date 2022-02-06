import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import {
    ActionFunction,
    Form,
    json,
    LoaderFunction,
    useLoaderData,
    useTransition,
} from "remix";
import { authenticator } from "~/services/auth.server";
import Error from "../components/Error";
import { sessionStorage } from "../services/session.server";

type LoaderData = {
    error: { message: string } | null;
};

export const action: ActionFunction = async ({ request }) => {
    await authenticator.authenticate("form", request, {
        successRedirect: "/",
        failureRedirect: "/login",
        // throwOnError: true,
    });
};

export const loader: LoaderFunction = async ({ request }) => {
    await authenticator.isAuthenticated(request, {
        successRedirect: "/",
    });

    const session = await sessionStorage.getSession(
        request.headers.get("Cookie")
    );

    const error = session.get(
        authenticator.sessionErrorKey
    ) as LoaderData["error"];

    return json({
        error,
    });
};

export default function Login() {
    const { error } = useLoaderData<LoaderData>();
    const [isSubmit, setIsSubmit] = useState(false);

    const handleSubmit = () => {
        setIsSubmit(true);
    };
    return (
        <>
            <div className="w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800 mt-10">
                <div className="px-6 py-4">
                    <h2 className="text-3xl font-bold text-center text-gray-200 dark:text-white">
                        Brand
                    </h2>

                    <h3 className="mt-1 text-xl font-medium text-center text-gray-600 dark:text-gray-200">
                        Welcome Back
                    </h3>

                    <p className="mt-1 text-center text-gray-500 dark:text-gray-400">
                        Inicia Sesion
                    </p>

                    <Form method="post" onSubmit={handleSubmit}>
                        <div className="w-full mt-4">
                            <input
                                className="block w-full px-4 py-2 mt-2 text-gray-200 placeholder-gray-500 bg-white border rounded-md dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                                type="text"
                                placeholder="username"
                                aria-label="username"
                                name="username"
                                autoComplete="off"
                            />
                        </div>

                        <div className="w-full mt-4">
                            <input
                                className="block w-full px-4 py-2 mt-2 text-gray-200 placeholder-gray-500 bg-white border rounded-md dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                                type="text"
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
                                Login
                            </button>
                        </div>
                        {error && isSubmit && (
                            <Error className="mt-4">{error.message}</Error>
                        )}
                    </Form>
                </div>
            </div>
        </>
    );
}
