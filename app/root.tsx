import {
    Links,
    LiveReload,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
    useLoaderData,
} from "remix";
import type { MetaFunction } from "remix";
import Nav from "./components/Nav";
import { LoaderFunction, ActionFunction } from "remix";

export const meta: MetaFunction = () => {
    return { title: "New Remix App" };
};

import { authenticator } from "~/services/auth.server";

export const action: ActionFunction = async ({ request }) => {
    const formData = await request.formData();
    const _action = formData.get("_action");
    if (_action === "logout") {
        await authenticator.logout(request, {
            redirectTo: "/login",
        });
    }

    return {
        msg: "ok",
    };
};

export const loader: LoaderFunction = async ({ request }) => {
    const user = await authenticator.isAuthenticated(request);

    return {
        user,
    };
};

export default function App() {
    const { user } = useLoaderData();
    return (
        <html lang="en">
            <head>
                <meta charSet="utf-8" />
                <meta
                    name="viewport"
                    content="width=device-width,initial-scale=1"
                />
                <script src="https://cdn.tailwindcss.com"></script>

                <Meta />
                <Links />
            </head>
            <body className="bg-gray-900 text-white">
                <Nav user={user} />
                <Outlet />
                <ScrollRestoration />
                <Scripts />
                {process.env.NODE_ENV === "development" && <LiveReload />}
            </body>
        </html>
    );
}
