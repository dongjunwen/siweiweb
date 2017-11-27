import React from 'react'
import PropTypes from 'prop-types'
import { Switch, Route, Redirect, routerRedux } from 'dva/router'
import dynamic from 'dva/dynamic'
import App from 'routes/app'

const { ConnectedRouter } = routerRedux

const Routers = function ({ history, app }) {
  const error = dynamic({
    app,
    component: () => import('./routes/error'),
  })
  const routes = [
    {
      path: '/dashboard',
      models: () => [import('./models/dashboard')],
      component: () => import('./routes/dashboard/'),
    }, {
      path: '/login',
      models: () => [import('./models/login')],
      component: () => import('./routes/login/'),
    }, {
      path: '/material',
      component: () => import('./routes/material/'),
    }, {
      path: '/formular',
      component: () => import('./routes/formular/'),
    }, {
      path: '/comp',
      component: () => import('./routes/comp/'),
    }, {
      path: '/depart',
      component: () => import('./routes/depart/'),
    }, {
      path: '/createOrder',
      component: () => import('./routes/order/createOrder/'),
    }, {
      path: '/orderApply',
      component: () => import('./routes/order/orderApply/'),
    }, {
      path: '/orderAudit',
      component: () => import('./routes/order/orderAudit/'),
    }, {
      path: '/orderList',
      component: () => import('./routes/order/orderList/'),
    }, {
      path: '/deliverCreate',
      component: () => import('./routes/deliverOrder/createOrder/'),
    }, {
      path: '/deliverApply',
      component: () => import('./routes/deliverOrder/deliverApply/'),
    }, {
      path: '/deliverAudit01',
      component: () => import('./routes/deliverOrder/deliverAudit01/'),
    }, {
      path: '/deliverAudit',
      component: () => import('./routes/deliverOrder/deliverAudit/'),
    }, {
      path: '/deliverList',
      component: () => import('./routes/deliverOrder/deliverOrderList/'),
    },
  ]

  return (
    <ConnectedRouter history={history}>
      <App>
        <Switch>
          <Route exact path="/" render={() => (<Redirect to="/dashboard" />)} />
          {
            routes.map(({ path, ...dynamics }, key) => (
              <Route key={key}
                exact
                path={path}
                component={dynamic({
                  app,
                  ...dynamics,
                })}
              />
            ))
          }
          <Route component={error} />
        </Switch>
      </App>
    </ConnectedRouter>
  )
}

Routers.propTypes = {
  history: PropTypes.object,
  app: PropTypes.object,
}

export default Routers
