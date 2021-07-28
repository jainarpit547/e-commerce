import React from 'react';
import jwt_decode from "jwt-decode";

import CIcon from '@coreui/icons-react'


// const token = localStorage.jwtToken;
// const decoded = jwt_decode(token);
// console.log('data from nav bar', decoded.user_type);
 var _nav;

// if(decoded.user_type === "admin" ){

    _nav =  [
      {
        _tag: 'CSidebarNavItem',
        name: 'Dashboard',
        to: '/dashboard',
        icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon"/>
      },
      {
        _tag: 'CSidebarNavDropdown',
        name: 'Users',
        route: '/users',
        icon: 'cil-user',
        _children: [
          {
            _tag: 'CSidebarNavItem',
            name: 'List',
            to: '/users',
          },
          {
            _tag: 'CSidebarNavItem',
            name: 'Add',
            to: '/users/add',
          },
        ],
      },
      {
        _tag: 'CSidebarNavDropdown',
        name: 'Clients',
        route: '/clients',
        icon: 'cil-user',
        _children: [
          {
            _tag: 'CSidebarNavItem',
            name: 'List',
            to: '/clients',
          },
          {
            _tag: 'CSidebarNavItem',
            name: 'Add',
            to: '/clients/add',
          },
        ],
      },
      {
        _tag: 'CSidebarNavDropdown',
        name: 'Projects',
        route: '/projects',
        icon: 'cil-envelope-closed',
        _children: [
          {
            _tag: 'CSidebarNavItem',
            name: 'List',
            to: '/projects',
          },
          {
            _tag: 'CSidebarNavItem',
            name: 'Add',
            to: '/projects/add',
          },
        ],
      },
      {
        _tag: 'CSidebarNavDropdown',
        name: 'Technologies',
        route: '/technologies',
        icon: 'cil-envelope-closed',
        _children: [
          {
            _tag: 'CSidebarNavItem',
            name: 'List',
            to: '/technologies',
          },
          {
            _tag: 'CSidebarNavItem',
            name: 'Add',
            to: '/technologies/add',
          },
        ],
      },
      // {
      //   _tag: 'CSidebarNavDropdown',
      //   name: 'Department',
      //   route: '/department',
      //   icon: 'cil-envelope-closed',
      //   _children: [
      //     {
      //       _tag: 'CSidebarNavItem',
      //       name: 'List',
      //       to: '/department',
      //     },
      //     {
      //       _tag: 'CSidebarNavItem',
      //       name: 'Add',
      //       to: '/department/add',
      //     },
      //   ],
      // },
      // {
      //   _tag: 'CSidebarNavDropdown',
      //   name: 'Designation',
      //   route: '/designation',
      //   icon: 'cil-envelope-closed',
      //   _children: [
      //     {
      //       _tag: 'CSidebarNavItem',
      //       name: 'List',
      //       to: '/designation',
      //     },
      //     {
      //       _tag: 'CSidebarNavItem',
      //       name: 'Add',
      //       to: '/designation/add',
      //     },
      //   ],
      // },
      // {
      //   _tag: 'CSidebarNavDropdown',
      //   name: 'Skill',
      //   route: '/skill',
      //   icon: 'cil-envelope-closed',
      //   _children: [
      //     {
      //       _tag: 'CSidebarNavItem',
      //       name: 'List',
      //       to: '/skill',
      //     },
      //     {
      //       _tag: 'CSidebarNavItem',
      //       name: 'Add',
      //       to: '/skill/add',
      //     },
      //   ],
      // },
      // {
      //   _tag: 'CSidebarNavDropdown',
      //   name: 'Manage Users',
      //   route: '/users',
      //   icon: 'cil-user',
      //   _children: [
      //     {
      //       _tag: 'CSidebarNavItem',
      //       name: 'List',
      //       to: '/users',
      //     },
      //     {
      //       _tag: 'CSidebarNavItem',
      //       name: 'Add',
      //       to: '/users/add',
      //     }
      //   ],
      // },
      // {
      //   _tag: 'CSidebarNavItem',
      //   name: 'CMS',
      //   to: '/cms',
      //   icon: 'cil-align-center'
      // },
      // {
      //   _tag: 'CSidebarNavItem',
      //   name: 'Email Templates',
      //   to: '/email',
      //   icon: 'cil-envelope-closed'
      // },
      // {
      //   _tag: 'CSidebarNavItem',
      //   name: 'Setting',
      //   to: '/setting',
      //   icon: 'cil-settings'
      // },
      
      {
        _tag: 'CSidebarNavItem',
        name: 'Change Password',
        to: '/changepassword',
        icon: 'cil-pencil'
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Logout',
        to: '/logout',
        icon: 'cil-lock-locked'
      },
      {
        _tag: 'CSidebarNavDivider',
        className: 'm-2'
      }
    ]

// }else if(decoded.user_type === "sales"){
    
//   _nav =  [
//     {
//       _tag: 'CSidebarNavItem',
//       name: 'Dashboard',
//       to: '/dashboard',
//       icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon"/>
//     },
//     {
//       _tag: 'CSidebarNavDropdown',
//       name: 'Users',
//       route: '/users',
//       icon: 'cil-user',
//       _children: [
//         {
//           _tag: 'CSidebarNavItem',
//           name: 'List',
//           to: '/users',
//         },
//         // {
//         //   _tag: 'CSidebarNavItem',
//         //   name: 'Add',
//         //   to: '/users/add',
//         // },
//       ],
//     },
//     {
//       _tag: 'CSidebarNavDropdown',
//       name: 'Clients',
//       route: '/clients',
//       icon: 'cil-user',
//       _children: [
//         {
//           _tag: 'CSidebarNavItem',
//           name: 'List',
//           to: '/clients',
//         },
//         {
//           _tag: 'CSidebarNavItem',
//           name: 'Add',
//           to: '/clients/add',
//         },
//       ],
//     },
//     {
//       _tag: 'CSidebarNavDropdown',
//       name: 'Projects',
//       route: '/projects',
//       icon: 'cil-envelope-closed',
//       _children: [
//         {
//           _tag: 'CSidebarNavItem',
//           name: 'List',
//           to: '/projects',
//         },
//         {
//           _tag: 'CSidebarNavItem',
//           name: 'Add',
//           to: '/projects/add',
//         },
//       ],
//     },
//     // {
//     //   _tag: 'CSidebarNavDropdown',
//     //   name: 'Technologies',
//     //   route: '/technologies',
//     //   icon: 'cil-envelope-closed',
//     //   _children: [
//     //     {
//     //       _tag: 'CSidebarNavItem',
//     //       name: 'List',
//     //       to: '/technologies',
//     //     },
//     //     // {
//     //     //   _tag: 'CSidebarNavItem',
//     //     //   name: 'Add',
//     //     //   to: '/technologies/add',
//     //     // },
//     //   ],
//     // },
//     {
//       _tag: 'CSidebarNavDropdown',
//       name: 'Department',
//       route: '/department',
//       icon: 'cil-envelope-closed',
//       _children: [
//         {
//           _tag: 'CSidebarNavItem',
//           name: 'List',
//           to: '/department',
//         },
//         // {
//         //   _tag: 'CSidebarNavItem',
//         //   name: 'Add',
//         //   to: '/department/add',
//         // },
//       ],
//     },
//     {
//       _tag: 'CSidebarNavDropdown',
//       name: 'Designation',
//       route: '/designation',
//       icon: 'cil-envelope-closed',
//       _children: [
//         {
//           _tag: 'CSidebarNavItem',
//           name: 'List',
//           to: '/designation',
//         },
//         // {
//         //   _tag: 'CSidebarNavItem',
//         //   name: 'Add',
//         //   to: '/designation/add',
//         // },
//       ],
//     },
//     {
//       _tag: 'CSidebarNavItem',
//       name: 'Change Password',
//       to: '/changepassword',
//       icon: 'cil-pencil'
//     },
//     {
//       _tag: 'CSidebarNavItem',
//       name: 'Logout',
//       to: '/logout',
//       icon: 'cil-lock-locked'
//     },
//     {
//       _tag: 'CSidebarNavDivider',
//       className: 'm-2'
//     }
//   ]

// }else if(decoded.user_type === "manager"){

//   _nav =  [
//     {
//       _tag: 'CSidebarNavItem',
//       name: 'Dashboard',
//       to: '/dashboard',
//       icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon"/>
//     },
//     {
//       _tag: 'CSidebarNavDropdown',
//       name: 'Users',
//       route: '/users',
//       icon: 'cil-user',
//       _children: [
//         {
//           _tag: 'CSidebarNavItem',
//           name: 'List',
//           to: '/users',
//         },
//         {
//           _tag: 'CSidebarNavItem',
//           name: 'Add',
//           to: '/users/add',
//         },
//       ],
//     },
//     {
//       _tag: 'CSidebarNavDropdown',
//       name: 'Clients',
//       route: '/clients',
//       icon: 'cil-user',
//       _children: [
//         {
//           _tag: 'CSidebarNavItem',
//           name: 'List',
//           to: '/clients',
//         },
//         // {
//         //   _tag: 'CSidebarNavItem',
//         //   name: 'Add',
//         //   to: '/clients/add',
//         // },
//       ],
//     },
//     {
//       _tag: 'CSidebarNavDropdown',
//       name: 'Projects',
//       route: '/projects',
//       icon: 'cil-envelope-closed',
//       _children: [
//         {
//           _tag: 'CSidebarNavItem',
//           name: 'List',
//           to: '/projects',
//         },
//         // {
//         //   _tag: 'CSidebarNavItem',
//         //   name: 'Add',
//         //   to: '/projects/add',
//         // },
//       ],
//     },
//     {
//       _tag: 'CSidebarNavDropdown',
//       name: 'Technologies',
//       route: '/technologies',
//       icon: 'cil-envelope-closed',
//       _children: [
//         {
//           _tag: 'CSidebarNavItem',
//           name: 'List',
//           to: '/technologies',
//         },
//         {
//           _tag: 'CSidebarNavItem',
//           name: 'Add',
//           to: '/technologies/add',
//         },
//       ],
//     },
//     {
//       _tag: 'CSidebarNavDropdown',
//       name: 'Department',
//       route: '/department',
//       icon: 'cil-envelope-closed',
//       _children: [
//         {
//           _tag: 'CSidebarNavItem',
//           name: 'List',
//           to: '/department',
//         },
//         // {
//         //   _tag: 'CSidebarNavItem',
//         //   name: 'Add',
//         //   to: '/department/add',
//         // },
//       ],
//     },
//     {
//       _tag: 'CSidebarNavDropdown',
//       name: 'Designation',
//       route: '/designation',
//       icon: 'cil-envelope-closed',
//       _children: [
//         {
//           _tag: 'CSidebarNavItem',
//           name: 'List',
//           to: '/designation',
//         },
//         // {
//         //   _tag: 'CSidebarNavItem',
//         //   name: 'Add',
//         //   to: '/designation/add',
//         // },
//       ],
//     },
//     {
//       _tag: 'CSidebarNavItem',
//       name: 'Change Password',
//       to: '/changepassword',
//       icon: 'cil-pencil'
//     },
//     {
//       _tag: 'CSidebarNavItem',
//       name: 'Logout',
//       to: '/logout',
//       icon: 'cil-lock-locked'
//     },
//     {
//       _tag: 'CSidebarNavDivider',
//       className: 'm-2'
//     }
//   ]

// // }else if(decoded.user_type === "user"){

// //   _nav =  [
// //     {
// //       _tag: 'CSidebarNavItem',
// //       name: 'Dashboard',
// //       to: '/dashboard',
// //       icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon"/>
// //     },
// //     {
// //       _tag: 'CSidebarNavDropdown',
// //       name: 'Users',
// //       route: '/users',
// //       icon: 'cil-user',
// //       _children: [
// //         {
// //           _tag: 'CSidebarNavItem',
// //           name: 'List',
// //           to: '/users',
// //         },
// //         // {
// //         //   _tag: 'CSidebarNavItem',
// //         //   name: 'Add',
// //         //   to: '/users/add',
// //         // },
// //       ],
// //     },
// //     // {
// //     //   _tag: 'CSidebarNavDropdown',
// //     //   name: 'Clients',
// //     //   route: '/clients',
// //     //   icon: 'cil-user',
// //     //   _children: [
// //     //     {
// //     //       _tag: 'CSidebarNavItem',
// //     //       name: 'List',
// //     //       to: '/clients',
// //     //     },
// //     //     {
// //     //       _tag: 'CSidebarNavItem',
// //     //       name: 'Add',
// //     //       to: '/clients/add',
// //     //     },
// //     //   ],
// //     // },
// //     {
// //       _tag: 'CSidebarNavDropdown',
// //       name: 'Projects',
// //       route: '/projects',
// //       icon: 'cil-envelope-closed',
// //       _children: [
// //         {
// //           _tag: 'CSidebarNavItem',
// //           name: 'List',
// //           to: '/projects',
// //         },
// //         // {
// //         //   _tag: 'CSidebarNavItem',
// //         //   name: 'Add',
// //         //   to: '/projects/add',
// //         // },
// //       ],
// //     },
// //     // {
// //     //   _tag: 'CSidebarNavDropdown',
// //     //   name: 'Technologies',
// //     //   route: '/technologies',
// //     //   icon: 'cil-envelope-closed',
// //     //   _children: [
// //     //     {
// //     //       _tag: 'CSidebarNavItem',
// //     //       name: 'List',
// //     //       to: '/technologies',
// //     //     },
// //     //     // {
// //     //     //   _tag: 'CSidebarNavItem',
// //     //     //   name: 'Add',
// //     //     //   to: '/technologies/add',
// //     //     // },
// //     //   ],
// //     // },
// //     {
// //       _tag: 'CSidebarNavDropdown',
// //       name: 'Department',
// //       route: '/department',
// //       icon: 'cil-envelope-closed',
// //       _children: [
// //         {
// //           _tag: 'CSidebarNavItem',
// //           name: 'List',
// //           to: '/department',
// //         },
// //         // {
// //         //   _tag: 'CSidebarNavItem',
// //         //   name: 'Add',
// //         //   to: '/department/add',
// //         // },
// //       ],
// //     },
// //     {
// //       _tag: 'CSidebarNavDropdown',
// //       name: 'Designation',
// //       route: '/designation',
// //       icon: 'cil-envelope-closed',
// //       _children: [
// //         {
// //           _tag: 'CSidebarNavItem',
// //           name: 'List',
// //           to: '/designation',
// //         },
// //         // {
// //         //   _tag: 'CSidebarNavItem',
// //         //   name: 'Add',
// //         //   to: '/designation/add',
// //         // },
// //       ],
// //     },
// //     {
// //       _tag: 'CSidebarNavItem',
// //       name: 'Change Password',
// //       to: '/changepassword',
// //       icon: 'cil-pencil'
// //     },
// //     {
// //       _tag: 'CSidebarNavItem',
// //       name: 'Logout',
// //       to: '/logout',
// //       icon: 'cil-lock-locked'
// //     },
// //     {
// //       _tag: 'CSidebarNavDivider',
// //       className: 'm-2'
// //     }
// //   ]

// // }



export default _nav
