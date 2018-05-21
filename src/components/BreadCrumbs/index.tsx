import * as React from "react";
import withBreadcrumbs from "react-router-breadcrumbs-hoc";
import { NavLink } from "react-router-dom";

// breadcrumbs can be any type of component or string
// const UserBreadcrumb = ({ match }:any) =>
//   <span>{match.params.userId}</span>; // use match param userId to fetch/display user name

const routes = [
  // { path: '/users/:userId', breadcrumb: UserBreadcrumb },
  { path: "/jobs", breadcrumb: "Jobs List" },
  { path: "/jobs/executions", breadcrumb: "Job Executions" },
  { path: "/schedule", breadcrumb: "Schedule List" },
  {
    path: "/jobs/executions/:executionId",
    breadcrumb: ({ match }: any) => (
      <span>Execution {match.params.executionId}</span>
    )
  },

  {
    path: "/jobs/executions/:executionId/steps",
    breadcrumb: "Steps List"
  },
  { path: "/dashboard", breadcrumb: "Dashboard" },
  { path: "/setup/sobjects", breadcrumb: "Salesforce Objects" }
];

// each `breadcrumb` has the props `key`, `location`, and `match` included
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
