import React, { useEffect } from 'react'
import {  Router, Route, Switch } from 'react-router-dom'
import BaseStyles from './base-styles';
import history from '../utils/history';
import Content from '../components/content';
import Header from '../components/header';
import Footer from '../components/Footer';
import Login from '../views/login';
import Registration from '../views/registration';
import Home from '../views/home';
import Plans from '../views/plans';
import NotFound from '../views/notFound';
import Features from '../views/features';
import useLogin from '../state/auth/hooks/useLogin';
import Spinner from '../components/spinner'

const Root = props => {
  const { validateUser, isLoading } = useLogin();
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      validateUser(token);
    }
  }, []);

    return (<>
      <BaseStyles />
      <Spinner show={isLoading} />
        <Router history={history}>
          <>
            <Header />
            <Content>
              <Switch>
                <Route exact path="/sign-in" component={Login} />
                <Route exact path="/" component={Home} />
                <Route exact path="/features" component={Features} />
                <Route exact path="/plans" component={Plans} />
                <Route exact path="/registration" component={Registration} />
                <Route component={NotFound} />
              </Switch>
            </Content>
            <Footer/>
          </>
        </Router>
    </>)
};

export default Root
