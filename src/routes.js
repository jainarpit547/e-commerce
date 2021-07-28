import React from 'react';

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));
const Changepassword = React.lazy(() => import('./views/changepassword/Changepassword'));

//Email
const Email = React.lazy(() => import('./views/emailtemplates/Index'));
const Editemail = React.lazy(() => import('./views/emailtemplates/Edit'));

//Technologies
const Technologies = React.lazy(() => import('./views/technologies/Index'));
const Addtechno = React.lazy(() => import('./views/technologies/Add'));
const Edittechno = React.lazy(() => import('./views/technologies/Edit'));

//Department
const Department = React.lazy(() => import('./views/department/Index'));
const Adddepart = React.lazy(() => import('./views/department/Add'));
const Editdepart = React.lazy(() => import('./views/department/Edit'));

//Skill
const Skill = React.lazy(() => import('./views/skill/Index'));
const Addskill = React.lazy(() => import('./views/skill/Add'));
const Editskill = React.lazy(() => import('./views/skill/Edit'));

//Designation
const Designation = React.lazy(() => import('./views/designation/Index'));
const Adddesig = React.lazy(() => import('./views/designation/Add'));
const Editdesig = React.lazy(() => import('./views/designation/Edit'));

//Client
const Clients = React.lazy(() => import('./views/client/Index'));
const AddClient = React.lazy(() => import('./views/client/Add'));
const EditClient = React.lazy(() => import('./views/client/Edit'));

//Projects
const Projects = React.lazy(() => import('./views/project/Index'));
const AddProject = React.lazy(() => import('./views/project/Add'));
const EditProject = React.lazy(() => import('./views/project/Edit'));
const ProjectDetail = React.lazy(()=> import('./views/project/Detail'));
const AssignUser = React.lazy(()=> import('./views/project/Assignuser'));
const AssignTech = React.lazy(()=> import('./views/project/Assign'));
const ProMilestone = React.lazy(()=> import('./views/project/Milestone'));
const ClientDetail = React.lazy(()=> import('./views/project/Clientdetail'));

//Users
const Users = React.lazy(() => import('./views/users/Index'));
const AddUser = React.lazy(() => import('./views/users/Add'));
const EditUser = React.lazy(() => import('./views/users/Edit'));
const AssignPro = React.lazy(() => import('./views/users/Assign'));
const UserDetail = React.lazy(() => import('./views/users/Detail'));
const AssignSkill = React.lazy(() => import('./views/users/Skill'));

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/changepassword', name: 'Change Password', component: Changepassword },

  //Technologies
  { path: '/technologies/add', name: 'Add Technologies', component: Addtechno },
  { path: '/technologies/edit/:id', name: 'Edit Technologies', component: Edittechno },
  { path: '/technologies', name: 'Technologies', component: Technologies }, 

  //Department
  { path: '/department/add', name: 'Add Department', component: Adddepart },
  { path: '/department/edit/:id', name: 'Edit Department', component: Editdepart },
  { path: '/department', name: 'Department', component: Department },

  //Skill
  { path: '/skill/add', name: 'Add Skill', component: Addskill },
  { path: '/skill/edit/:id', name: 'Edit Skill', component: Editskill },
  { path: '/skill', name: 'Skill', component: Skill },
  
   //Client
   { path: '/clients/add', name: 'Add Clients', component: AddClient },
   { path: '/clients/edit/:id', name: 'Edit Clients', component: EditClient },
   { path: '/clients', name: 'Clients', component: Clients },

   //Projects
   { path: '/projects/add', name: 'Add Projects', component: AddProject },
   { path: '/projects/technologies', name: 'Assign Technology', component: AssignTech },
   { path: '/projects/user', name: 'Assign User', component: AssignUser },
   { path: '/projects/milestones', name: 'Create Project Milestone', component: ProMilestone },
   { path: '/project/detail/:id', name: 'Project Details', component: ProjectDetail },
   { path: '/projects/clientdetail/:id', name: 'Client Detail', component:  ClientDetail },
   { path: '/projects/edit/:id', name: 'Edit Projects', component: EditProject },
   { path: '/projects', name: 'Projects', component: Projects },
  
   //Designation
  { path: '/designation/add', name: 'Add Designation', component: Adddesig },
  { path: '/designation/edit/:id', name: 'Edit Designation', component: Editdesig },
  { path: '/designation', name: 'Designation', component: Designation },

  //Email
  { path: '/email', name: 'Email', component: Email },
  { path: '/editemail/:id', name: 'Edit Email', component: Editemail },
  
  //Users
  { path: '/users/detail/:id', name: 'Users detail', component: UserDetail },
  { path: '/users/skill', name: 'Add Skill', component: AssignSkill },
  { path: '/users/project', name: 'Assign Project', component: AssignPro },
  { path: '/users/add', name: 'Add Users', component: AddUser },
  { path: '/users/edit/:id', name: 'Edit Users', component: EditUser },
  { path: '/users', name: 'Users', component: Users },
  
];

export default routes;
