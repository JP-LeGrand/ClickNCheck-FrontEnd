export const BASE_URL = 'https://localhost:44347/api/';/* alternative url for testing on local db https://localhost:44347/api/ or https://clicknchecksite.z13.web.core.windows.net/api/ */
export const IS_LOGGED_IN = 'authentication/isLoggedIn';
export const ADD_USER = 'Users/PostUsers';
export const GET_USER_TYPES = 'Users/userTypes';
export const REGISTER_USER = 'users/register';
export const CANDIDATE_VERIFICATION = 'candidate/sendVerification';
export const GET_CANDIDATE = 'Candidates/GetCandidate/';
export const GET_JOB_PROFILE_CHECKS = 'JobProfiles/jobChecks/';
export const CANDIDATE_CONSENT = 'Candidates/PutConsent/';
export const RECRUITER_MANAGERS = 'users/recruiter/organisation/managers/';
export const OTP_AUTHENTICATION = 'authentication/otp';
export const CREATE_CANDIDATE = 'Candidates/CreateCandidate/';
export const RECRUITER_JOB_PROFILES = 'JobProfiles/recruiterJobs/';
export const GET_ALL_JOB_PROFILE_CHECKS = 'JobProfiles/getAllChecks';
export const AUTHENTICATE_LOGIN = 'authentication/login';
export const CHECK_OTP = 'authentication/checkOtp';
export const FORGOT_PASSWORD_EMAIL = 'authentication/ForgotPassword/email';
export const FORGOT_PASSWORD_PHONE = 'authentication/ForgotPassword/phone';
export const CHANGE_PASSWORD = 'Users/UpdatePassword/';
export const PASS_EXPIRED = 'Users/IsPasswordExpired/';
export const GET_RECRUITERS = 'Users/GetRecruiters';
export const GET_RECRUITER_JOB_PROFILE = 'JobProfiles/GetRecruiterJobProfile/';
export const GET_ALL_JOB_PROFILES = 'JobProfiles/GetAllJobProfilesRecruiters';
export const GET_UNASSIGNED_JOB_PROFILES = 'JobProfiles/GetUnassignedJobProfilesRecruiters';
export const GET_ASSIGNED_JOB_PROFILES = 'JobProfiles/GetAssignedJobProfilesRecruiters';
export const GET_ALL_SERVICES = 'Available/services';
export const GET_MANAGERS = 'users/recruiter/organisation/managers/';
export const CREATE_JOBPROFILE = 'JobProfiles/CreateJobProfile';
export const GET_RECRUITERS_NAMES='Users/GetRecruiterNames';