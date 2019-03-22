import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import React from 'react';
import Login from '../Components/Shared/Login/Login';
import Otp from '../Components/Shared/Otp/Otp';
import NewVerificationRequest from '../Components/Recruiter/RecruiterVerificationRequest/NewVerificationRequest';
import ReviewChecks from '../Components/Recruiter/RecruiterVerificationRequest/ReviewChecks';
import Consent from '../Components/Candidate/Consent/Consent';
import Consented from '../Components/Candidate/Consented/Consented';
import ForgotPassword from '../Components/Shared/ForgotPassword/ForgotPassword';
import ChangePassword from '../Components/Shared/ChangePassword/ChangePassword';
import ForgotPasswordSuccess from '../Components/Shared/ForgotPasswordSuccess/ForgotPasswordSuccess';
import MainContainer from '../Components/Recruiter/RecruiterVerificationRequest/MainContainer';
import CaptureCandidateDetails from '../Components/Recruiter/RecruiterVerificationRequest/CaptureCandidateDetails';
import VerificationConfirmed from '../Components/Recruiter/RecruiterVerificationRequest/VerificationConfrimed/VerificationConfirmed';
import CreateJobProfile from '../Components/Admin/CreateJobProfile/CreateJobProfile';
import AdminPage from '../Components/Admin/AdminPage/AdminPage';
import JobProfiles from '../Components/Admin/JobProfiles/JobProfiles';
import assignRecruiters from '../Components/Admin/AssignRecruiters/assignRecruiters';
import Congratulations from '../Components/Admin/Congratulations/Congratulations';
import CreateJobProfilePage2 from '../Components/Admin/CreateJobProfile/CreateJobProfilePage2';
import CreateJobProfilePage3 from '../Components/Admin/CreateJobProfile/Page3/CreateJobProfilePage3';
import CreateJobProfilePage4 from '../Components/Admin/CreateJobProfile/Page4/CreateJobProfilePage4';
import AddRemoveChecks from '../Components/Recruiter/RecruiterVerificationRequest/AddRemoveChecks';
import ViewRecruiterJP from '../Components/Admin/ViewRecruiterJP/ViewRecruiterJP';
import Register from '../Components/Recruiter/Register/Register';
const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Login} />
                <Route path="/login" exact component={Login} />
                <Route path="/otp" exact component={Otp} />
                <Route path="/candidate/consent" exact component={Consent} />
                <Route path="/candidate/consented" exact component={Consented} />
                <Route path="/forgotPassword" exact component={ForgotPassword} />
                <Route path="/forgotPasswordSuccess" exact component={ForgotPasswordSuccess} />
                <Route path="/changePassword" exact component={ChangePassword} />
                <Route path="/ReviewChecks" exact component={ReviewChecks} />
                <Route path="/NewVerificationRequest" exact component={NewVerificationRequest} />
                <Route path="/candidate/bulk" exact component={MainContainer} />
                <Route path="/candidate/individual" exact component={CaptureCandidateDetails} />
                <Route path="/VerificationConfirmed" exact component={VerificationConfirmed} />
                <Route path="/Admin/CreateJobProfile" exact component={CreateJobProfile} />
                <Route path="/Admin/AdminPage" exact component={AdminPage} />
                <Route path="/Admin/CreateJobProfilePage2" exact component={CreateJobProfilePage2} />
                <Route path="/JobProfiles" exact component={JobProfiles} />
                <Route path="/Admin/CreateJobProfilePage3" exact component={CreateJobProfilePage3} />
                <Route path="/admin/recuiterJopProfiles" exact component={ViewRecruiterJP} />
                <Route path="/AddRemoveChecks" exact component={AddRemoveChecks} />
                <Route path="/Recruiter/Register/:userId" exact component={Register} />
                <Route path="/Admin/CreateJobProfilePage4" exact component={CreateJobProfilePage4} />
                <Route path="/Admin/AssignRecruiters" exact component={assignRecruiters} />
                <Route path="/Admin/Congratulations" exact component={Congratulations} />
                <Route render={() => <Redirect to="/" />} />
            </Switch>
        </BrowserRouter>
    );
};

export default Routes;