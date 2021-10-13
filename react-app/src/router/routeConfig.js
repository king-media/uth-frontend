import TodosPage from "../pages/TodosPage";
import CompletedTodosPage from "../pages/CompletedTodosPage";
import { Route } from "react-router-dom";
import React from "react";

const routes = [
    {
        path: "/todos",
        component: TodosPage,
    },
    {
        path: "/completed-todos",
        component: CompletedTodosPage,
    }
]

function RouteRenderer (route) {
    return (
        <Route
            path={route.path}
            render={props => (
                // pass the sub-routes down to keep nesting
                <route.component {...props}  />
            )}
        />
    )
}

export const routesRendererMap = routes.map(route => (
    <RouteRenderer {...route} key={route.path} />
))
