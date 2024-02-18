import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';

const PublicRoute = ({ component, path, exact }) => {
  useEffect(() => {}, []);
  return <Route path={path} component={component} exact={exact} />;
};

export default PublicRoute;
