// import "./App.css";
// import {
//   BrowserRouter as Router,
//   Route,
//   Routes,
//  } from "react-router-dom";
// import Login from "./components/login/login";
// import 'bootstrap/dist/css/bootstrap.min.css';
// import SignUpForm from "./components/signup/signup";
// import Nav from "./components/sidebar/sidebar";
// import UserHome from "./components/user/userdata";
// import AdminHome from "./components/admin/admin";
// import EmployeeModule from "./components/user/employee/employee";
// import CandidateModule from "./components/user/candidate/candidate";
// import ExpensesModule from "./components/user/expenses/expenses";
// import HelpcenterModule from "./components/user/helpcenter/helpcenter";
// import ConsultancyModule from "./components/user/consultancy/consultancy";
// import SkillsModule from "./components/user/skill/skill";
// import ProfileModule from "./components/user/profile/profile";
// import Navbar from "./components/navbar/navbar";
// import AboutHome from "./components/admin/AdminModule/adminModule";
// import ChangePassword from "./components/admin/changepassword/changepassword";
// import EditProfile from "./components/admin/EditProfileModule/EditProfile";
// import Userdata from "./components/admin/UserDataModule/UserData";



// function App() {
//   return (
//        <Router>
//         <Routes>
//           <Route path="/sidebar" element={<Nav />} />
//           <Route path="/navbar" element={<Navbar />} />
//           <Route path="/*" element={<Login />} />
//           <Route path="/signup" element={<SignUpForm />} />
//           <Route path="/user" element={<UserHome />} />
//           <Route path="/admin" element={<AdminHome />} />
//           <Route path="/employee" element={<EmployeeModule />} />
//           <Route path="/candidate" element={<CandidateModule />} />
//           <Route path="/expenses" element={<ExpensesModule />} />
//           <Route path="/helpcenter" element={<HelpcenterModule />} />
//           <Route path="/consultancy" element={<ConsultancyModule />} />
//           <Route path="/skills" element={<SkillsModule />} />
//           <Route path="/profiles" element={<ProfileModule />} />


//           <Route path="/admin-about" element={<AboutHome />} />
//           <Route path="/changepassword" element={<ChangePassword />} />
//           <Route path="/edit-profile" element={<EditProfile />} />
//           <Route path="/admin-user" element={<Userdata />} />

//         </Routes>
//       </Router>
      
//    );
//   }

// export default App;






import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Login from "./components/login/login";
import 'bootstrap/dist/css/bootstrap.min.css';
import SignUpForm from "./components/signup/signup";
import Nav from "./components/sidebar/sidebar";
import UserHome from "./components/user/userdata";
import AdminHome from "./components/admin/admin";
import EmployeeModule from "./components/user/employee/employee";
import CandidateModule from "./components/user/candidate/candidate";
import ExpensesModule from "./components/user/expenses/expenses";
import HelpcenterModule from "./components/user/helpcenter/helpcenter";
import ConsultancyModule from "./components/user/consultancy/consultancy";
import SkillsModule from "./components/user/skill/skill";
import ProfileModule from "./components/user/profile/profile";
import Navbar from "./components/navbar/navbar";
import AboutHome from "./components/admin/AdminModule/adminModule";
import ChangePassword from "./components/admin/changepassword/changepassword";
import EditProfile from "./components/admin/EditProfileModule/EditProfile";
import Userdata from "./components/admin/UserDataModule/UserData";
import ProtectedRoute from "./components/routes/ProtectedRoute"; // Import the ProtectedRoute component

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/sidebar" element={<Nav />} />
        <Route path="/navbar" element={<Navbar />} />
        <Route path="/*" element={<Login />} />
        <Route path="/signup" element={<SignUpForm />} />

        {/* User-specific routes */}
        <Route 
          path="/user" 
          element={
            <ProtectedRoute requiredRole="user">
              <UserHome />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/employee" 
          element={
            <ProtectedRoute requiredRole="user">
              <EmployeeModule />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/candidate" 
          element={
            <ProtectedRoute requiredRole="user">
              <CandidateModule />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/expenses" 
          element={
            <ProtectedRoute requiredRole="user">
              <ExpensesModule />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/helpcenter" 
          element={
            <ProtectedRoute requiredRole="user">
              <HelpcenterModule />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/consultancy" 
          element={
            <ProtectedRoute requiredRole="user">
              <ConsultancyModule />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/skills" 
          element={
            <ProtectedRoute requiredRole="user">
              <SkillsModule />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/profiles" 
          element={
            <ProtectedRoute requiredRole="user">
              <ProfileModule />
            </ProtectedRoute>
          } 
        />

        {/* Admin-specific routes */}
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminHome />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin-about" 
          element={
            <ProtectedRoute requiredRole="admin">
              <AboutHome />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/changepassword" 
          element={
            <ProtectedRoute requiredRole="admin">
              <ChangePassword />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/edit-profile" 
          element={
            <ProtectedRoute requiredRole="admin">
              <EditProfile />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin-user" 
          element={
            <ProtectedRoute requiredRole="admin">
              <Userdata />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;
