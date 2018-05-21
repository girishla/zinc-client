import FontIcon from "material-ui/FontIcon";
import * as React from "react";
// import { IMenu } from "../../../containers/Layout/menu";

const data: any = {
  menus: [
    {
      animating: true,
      animatingRootMenu: true,
      children: [],
      icon: <FontIcon className="material-icons"> assessment </FontIcon>,
      id: "dashboard",
      index: 0,
      open: false,
      text: "DashBoard",
      url: "/dashboard",
      willCloseMenu: false,
      willCloseRootMenu: false
    },
    {
      animating: true,
      animatingRootMenu: true,
      children: [],
      icon: <FontIcon className="material-icons"> toc </FontIcon>,
      id: "jobs",
      index: 1,
      open: false,
      text: "Jobs",
      url: "/jobs",
      willCloseMenu: false,
      willCloseRootMenu: false
    },
    {
      animating: true,
      animatingRootMenu: true,
      children: [],
      icon: <FontIcon className="material-icons"> transform </FontIcon>,
      id: "executions",
      index: 3,
      open: false,
      text: "Job Executions",
      url: "/jobs/executions",
      willCloseMenu: false,
      willCloseRootMenu: false
    },
    {
      animating: true,
      animatingRootMenu: true,
      children: [],
      icon: <FontIcon className="material-icons"> schedule </FontIcon>,
      id: "schedule",
      index: 2,
      open: false,
      text: "Schedule",
      url: "/schedule",
      willCloseMenu: false,
      willCloseRootMenu: false
    },

    {
      animating: true,
      animatingRootMenu: true,
      children: [
        {
          id: "salesforce-objects",
          text: "Salesforce Objects",
          url: "/config/sources/salesforce/sobjects",
          index: 5
        }
      ],
      icon: <FontIcon className="material-icons"> settings </FontIcon>,
      id: "config",
      // index: 4,
      open: false,
      text: "Configuration",
      // url: "/settings",
      willCloseMenu: false,
      willCloseRootMenu: false
    },
    {
      animating: true,
      animatingRootMenu: true,
      children: [],
      icon: <FontIcon className="material-icons"> account_circle </FontIcon>,
      id: "profile",
      index: 4,
      open: false,
      text: "Profile",
      url: "/profile",
      willCloseMenu: false,
      willCloseRootMenu: false
    }
  ]
};

export default data;
