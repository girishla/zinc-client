
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
    }
  ]
};

export default data;
