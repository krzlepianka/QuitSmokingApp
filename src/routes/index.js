import UserPage from 'components/UserPage';
import UserInfoPage from 'components/UserInfoPage';
import RegistrationForm from 'components/RegistrationForm';
import LoginForm from 'components/LoginForm';
import 'styles/mainStylesheet/mainStylesheet.scss';
import WithAuthentication from 'components/shared/hoc/withAuthentication';
import withNavbar from 'components/shared/hoc/withNavbar';

const routes = [
    {path: '/', exact: true, redirect: "/login"},
    {path: '/login', component: LoginForm},
    {path: '/registration', component: RegistrationForm},
    {path: '/addicition-form', component: WithAuthentication(withNavbar(UserPage))},
    {path: '/dashboard', component: WithAuthentication(withNavbar(UserInfoPage))},
];


export default routes;
