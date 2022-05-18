import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import { ToastProvider } from "react-toast-notifications";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/js/src/collapse.js";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import "./App.css";
// import "./house-budget.css";
import "./buddy-budget.scss";

// import CustomToastComponent from "./components/toast/customToastComponent";

const Header = lazy(() => import("./components/header/header"));
const Footer = lazy(() => import("./components/footer/footer"));

const Landing = lazy(() => import("./pages/landingPage/landingPage"));

const Login = lazy(() => import("./pages/loginPage/loginPage"));
const Registration = lazy(() =>
  import("./pages/registrationPage/registrationPage")
);
const PasswordReset = lazy(() =>
  import("./pages/passwordResetPage/passwordResetPage")
);
const ForgotPassword = lazy(() =>
  import("./pages/forgotPasswordPage/forgotPasswordPage")
);
const UserVerifyEmail = lazy(() => import("./pages/userPage/userVerifyEmail"));
const UserVerifyEmailSuccess = lazy(() =>
  import("./pages/userPage/userVerifyEmailSuccess")
);

const Dashboard = lazy(() => import("./pages/dashboardPage/dashboardPage"));
const UserListview = lazy(() => import("./pages/userPage/userListview"));
const UserProfile = lazy(() => import("./pages/userPage/userProfile"));

const SalaryPage = lazy(() => import("./pages/salaryPage/salaryPage"));
const SalaryListviewPage = lazy(() =>
  import("./pages/salaryPage/salaryListviewPage")
);

const ExpensesPage = lazy(() => import("./pages/expensesPage/expensesPage"));

const ReportsPage = lazy(() => import("./pages/reportsPage/reportsPage"));

const ThanksPage = lazy(() => import("./pages/thanksPage/thanksPage"));
const FeedbackPage = lazy(() => import("./pages/feedbackPage/feedbackPage"));
const FeedbackThanksPage = lazy(() =>
  import("./pages/feedbackPage/feedbackThanksPage")
);

const App = () => {
  /* Redirect To Landing Page When close Or Reload The Page --- Start */
  window.addEventListener("beforeunload", () => {
    localStorage.removeItem("userInfos");
  });

  const PrivateRoute = (props) => {
    const { children } = props;
    const auth = localStorage.getItem("userInfos");

    // If authorized, return that will render child elements
    // If not, return element that will navigate to landing page
    return auth ? <>{children}</> : <Navigate to="/" />;
  };
  /* Redirect To Landing Page When close Or Reload The Page --- End */

  return (
    <Suspense fallback={<></>}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route exact path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route
            path="/buddy-budget/user/forgot-password"
            element={<ForgotPassword />}
          />
          <Route
            path="/buddy-budget/user/reset-password/:userId"
            element={
              <PrivateRoute>
                <PasswordReset />
              </PrivateRoute>
            }
          />

          <Route
            path="/buddy-budget/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />

          <Route
            path="/buddy-budget/user/lists"
            element={
              <PrivateRoute>
                <UserListview />
              </PrivateRoute>
            }
          />
          <Route
            path="/buddy-budget/user/profile/:userId"
            element={
              <PrivateRoute>
                <UserProfile />
              </PrivateRoute>
            }
          />
          <Route
            path="/buddy-budget/user/verify-email/:verificationEmail"
            element={<UserVerifyEmail />}
          />

          <Route
            exact
            path="/user/email-account/activate/:token"
            element={<UserVerifyEmailSuccess />}
          />

          <Route
            path="/buddy-budget/salary/:salaryId"
            element={
              <PrivateRoute>
                <SalaryPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/buddy-budget/salary"
            element={
              <PrivateRoute>
                <SalaryPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/buddy-budget/salary/lists"
            element={
              <PrivateRoute>
                <SalaryListviewPage />
              </PrivateRoute>
            }
          />

          <Route
            path="/buddy-budget/expenses"
            element={
              <PrivateRoute>
                <ExpensesPage />
              </PrivateRoute>
            }
          />

          <Route
            path="/buddy-budget/reports"
            element={
              <PrivateRoute>
                <ReportsPage />
              </PrivateRoute>
            }
          />

          <Route
            path="/buddy-budget/thanks"
            element={
              <PrivateRoute>
                <ThanksPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/buddy-budget/feedback"
            element={
              <PrivateRoute>
                <FeedbackPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/buddy-budget/feedback/success"
            element={
              <PrivateRoute>
                <FeedbackThanksPage />
              </PrivateRoute>
            }
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </Suspense>
  );
};

export default App;

// const MyCustomToast = (props) => {
//   return <CustomToastComponent {...props}></CustomToastComponent>;
// };
