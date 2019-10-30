import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import Notifications from "@material-ui/icons/Notifications";

const AdminRoutes = [
  {
    path: "/admin/dashboard",
    name: "Dashboard",
    icon: Dashboard,
    // component: DashboardPage,
    layout: "/admin"
  },
  {
    path: "/admin/user",
    name: "User",
    icon: Person,
    // component: UserProfile,
    layout: "/admin"
  },
  {
    path: "/admin/table",
    name: "Table List",
    icon: LibraryBooks,
    // component: TableList,
    layout: "/admin"
  },
  {
    path: "/admin/notifications",
    name: "Notifications",
    icon: Notifications,
    // component: NotificationsPage,
    layout: "/admin"
  },
];

export default AdminRoutes;