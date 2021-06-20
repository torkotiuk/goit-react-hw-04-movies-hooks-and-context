import { NavLink } from 'react-router-dom';
// Nav styles
import NavStyle from './Nav.scss';
import Nav from './Nav.module.scss';
//
import routes from '../../routes';

const Navigation = () => {
  return (
    <ul className={Nav.List}>
      <li className={Nav.ListItem}>
        <NavLink
          exact
          to={routes.home}
          style={NavStyle.Navlink}
          activeStyle={NavStyle.active}
        >
          Home
        </NavLink>
      </li>
      <li className={Nav.ListItem}>
        <NavLink to={routes.movies}>Movies</NavLink>
      </li>
      <li className={Nav.ListItem}>
        <NavLink to={routes.test}>Test</NavLink>
      </li>
    </ul>
  );
};

export default Navigation;
