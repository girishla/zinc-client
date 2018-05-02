
import FontIcon from 'material-ui/FontIcon';
import * as React from 'react';
import { IMenu } from '../../../containers/Layout/menu';

const data: { menus: IMenu[] } = {
  menus: [
    {
      animating: true,
      animatingRootMenu: true,
      children: [],
      icon: <FontIcon className="material-icons"> assessment </FontIcon>,
      id: 'dashboard',
      index: 0,
      open: false,
      text: 'DashBoard',
      url: '/dashboard',
      willCloseMenu: false,
      willCloseRootMenu: false,
    },
    {
      animating: true,
      animatingRootMenu: true,
      children: [],
      icon: <FontIcon className="material-icons"> toc </FontIcon>,
      id: 'jobs',
      index: 0,
      open: false,
      text: 'Jobs',
      url: '/jobs',
      willCloseMenu: false,
      willCloseRootMenu: false,
    },
    {
      animating: true,
      animatingRootMenu: true,
      children: [],
      icon: <FontIcon className="material-icons"> schedule </FontIcon>,
      id: 'schedule',
      index: 0,
      open: false,
      text: 'Schedule',
      url: '/schedule',
      willCloseMenu: false,
      willCloseRootMenu: false,
    },
    {
      animating: true,
      animatingRootMenu: true,
      children: [],
      icon: <FontIcon className="material-icons"> transform </FontIcon>,
      id: 'executions',
      index: 0,
      open: false,
      text: 'Job Executions',
      url: '/executions',
      willCloseMenu: false,
      willCloseRootMenu: false,
    },
    {
      animating: true,
      animatingRootMenu: true,
      children: [],
      icon: <FontIcon className="material-icons"> settings </FontIcon>,
      id: 'settings',
      index: 0,
      open: false,
      text: 'Settings',
      url: '/settings',
      willCloseMenu: false,
      willCloseRootMenu: false,
    },
    {
      animating: true,
      animatingRootMenu: true,
      children: [],
      icon: <FontIcon className="material-icons"> account_circle </FontIcon>,
      id: 'profile',
      index: 0,
      open: false,
      text: 'Profile',
      url: '/profile',
      willCloseMenu: false,
      willCloseRootMenu: false,
    }

  ]
};

export default data;
