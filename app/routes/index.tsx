import { authenticator } from "~/services/auth.server";
import { json, LoaderFunction, useLoaderData } from "remix";

export const loader: LoaderFunction = async ({ request }) => {
    const user = await authenticator.isAuthenticated(request, {
        failureRedirect: "/login",
    });

    return json({
        user,
    });
};

export default function Index() {
    const { user } = useLoaderData();
    return (
        <div>
            <h1>
                Hola {user.username}, si estás aquí es porque te has autenticado
                🦕
            </h1>
        </div>
    );
}
