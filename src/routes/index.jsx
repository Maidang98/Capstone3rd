import { Route } from "react-router-dom";
import { lazy } from "react";
import Another from "../pages/Another";

const routes = [
  {
    path: "",
    element: lazy(() => import("./../pages/HomeTemplate")),
    nested: [
      { path: "", element: lazy(() => import("./../pages/HomeTemplate/Home")) },
      { path: "checkout/:maLichChieu", element: lazy(() => import("../pages/HomeTemplate/Checkout")) },
      { path: "list-movie", element: lazy(() => import("../pages/HomeTemplate/ListMovie")) },
      { path: "login", element: lazy(() => import("../pages/HomeTemplate/Login")) },
      { path: "register", element: lazy(() => import("../pages/HomeTemplate/Register")) },
      { path: "booking", element: lazy(() => import("../pages/HomeTemplate/Booking")) },
      { path: "detail/:maPhim", element: lazy(() => import("../pages/HomeTemplate/Detail")) },
    ],
  },
  {
    path: "admin",
    element: lazy(() => import("../pages/AdminTemplate")),
    nested: [
      { path: "dashboard", element: lazy(() => import("../pages/AdminTemplate/DashBoard")) },
      { path: "films", element: lazy(() => import("../pages/AdminTemplate/Films")) },
      { path: "films/addnew", element: lazy(() => import("../pages/AdminTemplate/Films/addNew")) },
      { path: "films/edit/:id", element: lazy(() => import("../pages/AdminTemplate/Films/Edit")) },
      { path: "user", element: lazy(() => import("../pages/AdminTemplate/User/index")) },
      { path: "user/add-user", element: lazy(() => import("../pages/AdminTemplate/AddUser")) },
      { path: "user/edit/:taiKhoan", element: lazy(() => import("../pages/AdminTemplate/User/Edit")) },
    ],
  },
  { path: "auth", element: lazy(() => import("../pages/AdminTemplate/Auth")) },
  { path: "another", element: Another },
  { path: "*", element: lazy(() => import("../pages/PageNotFound")) },
];

export const renderRoutes = () => {
  return routes.map((route) => {
    const Element = route.element;
    if (route.nested) {
      return (
        <Route key={route.path} path={route.path} element={<Element />}>
          {route.nested.map((item) => {
            const NestedElement = item.element;
            return (
              <Route
                key={item.path}
                path={item.path}
                element={<NestedElement />}
              />
            );
          })}
        </Route>
      );
    } else {
      return <Route key={route.path} path={route.path} element={<Element />} />;
    }
  });
};
