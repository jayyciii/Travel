import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Home from '../pages/home/Home';
import About from '../pages/miniPage/About';
import ContactUs from '../pages/miniPage/ContactUs';
import PrivacyPolicy from '../pages/miniPage/PrivacyPolicy';
import SingleBlog from '../pages/singleBlog/SingleBlog';
import Login from '../pages/user/Login';
import Register from '../pages/user/Register';
import AdminLayout from '../pages/admin/AdminLayout';
import Dashboard from '../pages/admin/dashboard/Dashboard';
import AddPost from '../pages/admin/post/AddPost';
import ManagePosts from '../pages/admin/post/ManagePosts';
import ManageUser from '../pages/admin/users/ManageUser';
import PrivateRouter from './PrivateRouter';
import UpdatePost from '../pages/admin/post/UpdatePost';
import ManageComments from '../pages/admin/comments/ManageComments';
import YourTrip from '../pages/miniPage/YourTrip';
import Viewtrip from '../view-trip/[trip-id]/Viewtrip';
import MyTrip from '../view-trip/mytrip/MyTrip';



const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/your-trip",
        element: <YourTrip />,
      },
      {
        path: "/privacy-policy",
        element: <PrivacyPolicy />,
      },
      {
        path: "/contact-us",
        element: <ContactUs />,
      },
      {
        path: "blogs/:id",
        element: <SingleBlog />
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/register",
        element: <Register />

      },
      {
        path: '/view-trip/:tripId',
        element: <Viewtrip />
      },
      {
        path: '/my-trip',
        element: <MyTrip />
      },
      
      {
        path: "/dashboard",
        element: <PrivateRouter><AdminLayout /></PrivateRouter>,
        children: [
          {
            path: '',
            element: <Dashboard />
          },
          {
            path: "add-new-post",
            element: <AddPost />
          },
          {
            path: "manage-items",
            element: <ManagePosts />
          },
          {
            path: "users",
            element: <ManageUser />
          },
          {
            path: 'update-items/:id',
            element: <UpdatePost />
          },
          {
            path: "manage-comments",
            element: <ManageComments />
          }
        ]
      }
    ],
  },
]);

export default router;
