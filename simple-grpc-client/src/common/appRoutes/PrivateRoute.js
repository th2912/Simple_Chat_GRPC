import { isEmpty } from 'lodash';
import { Redirect, Route } from 'react-router-dom';
import { APP_ROUTE } from '../../utils/constants';
import { useContext, useEffect } from 'react';
import { Context } from '../context/Context';

const PrivateRoute = ({ component, path, exact = true }) => {
  const [user, setUser] = useContext(Context);

  if (!user) {
    return <Redirect to={APP_ROUTE.LOGIN} />;
  }
  return <Route path={path} component={component} exact={exact} />;
};
export default PrivateRoute;
