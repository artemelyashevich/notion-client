import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/layout/Layout";
import About from "./pages/about/About";
import Notes from "./pages/notes/Notes";
import Note from "./pages/note/Note";
import CreateNote from "./pages/createNote/CreateNote";
import EditNote from "./pages/editNote/EditNote";
import { PAGES } from "./constants";
import Notfound from "./pages/notfound/Notfound";
import Auth from "./pages/auth/Auth";
import AuthRequire from "./components/auth/AuthRequire";
import UserContextProvider from "./contexts/UserContextProvider";
import NotesContextProvider from "./contexts/NotesContextProvider";

export const routes = createBrowserRouter([
    {
        element: (
            <AuthRequire>
                <UserContextProvider>
                    <Layout />
                </UserContextProvider>
            </AuthRequire>
        ),
        path: PAGES.DASHBOARD,
        children: [
            {
                path: PAGES.ABOUT,
                element: <About />
            },
            {
                path: PAGES.NOTES,
                element: (
                    <NotesContextProvider>
                        <Notes />
                    </NotesContextProvider>
                )
            },
            {
                path: PAGES.NOTE,
                element: (
                    <NotesContextProvider>
                        <Note />
                    </NotesContextProvider>
                )
            },
            {
                path: PAGES.CREATE_NOTE,
                element: <CreateNote />
            },
            {
                path: PAGES.EDIT_NOTE,
                element: <EditNote />
            }
        ],
    },
    {
        path: PAGES.AUTH,
        element: <Auth />
    },
    {
        path: PAGES.NOTFOUND,
        element: <Notfound />
    }
])