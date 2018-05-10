import * as React from "react";
import withBreadcrumbs from "react-router-breadcrumbs-hoc";
import { NavLink } from "react-router-dom";

// breadcrumbs can be any type of component or string
// const UserBreadcrumb = ({ match }:any) =>
//   <span>{match.params.userId}</span>; // use match param userId to fetch/display user name

// define some custom breadcrumbs for certain routes (optional)
const routes = [
  //   { path: '/users/:userId', breadcrumb: UserBreadcrumb },
  { path: "/jobs", breadcrumb: "Jobs" },
  { path: "/jobs/executions", breadcrumb: "Job Executions" },
  {
    path: "/jobs/executions/:executionId/steps",
    breadcrumb: "Steps"
  },
  { path: "/dashboard", breadcrumb: "Dashboard" }
];

// map & render your breadcrumb components however you want.
// each `breadcrumb` has the props `key`, `location`, and `match` included!
const Breadcrumbs = ({ breadcrumbs }: any) => (
  <div>
    {breadcrumbs.map((breadcrumb: any, index: any) => (
      <span key={breadcrumb.key}>
        <NavLink to={breadcrumb.props.match.url}>{breadcrumb}</NavLink>
        {index < breadcrumbs.length - 1 && <i> / </i>}
      </span>
    ))}
  </div>
);

export default withBreadcrumbs(routes)(Breadcrumbs);
