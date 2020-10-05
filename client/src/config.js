import React from "react";
import {
  CloudUpload,
  ViewCompact,
  DataUsage,
  Person,
  ExitToApp,
  Security,
  Group,
  FindInPage,
} from "@material-ui/icons";
import RecordUploadView from "./components/RecordUploadView/RecordUploadView.jsx";
import RecordViewer from "./components/RecordViewer/RecordViewer.jsx";
import StatisticsViewer from "./components/StatisticesViewer/StatisticsViewer";
import UserProfile from "./components/UserProfile/UserProfile";
import LogOutMenuItem from "./components/UserDashboardView/LogOutMenuItem"
import SecurityView from "./components/SecurityView/SecurityView";
export const config = {
  appID: {
    displayName: "iSAVR.",
    author: "JoniBach",
  },
  securitySettings: {
    catagories: [
      {
        title: "Account Access",
        subTitle: "Change how you log in",
        description: "",
        subCatagories: [
          {
            title: "Your Password",
            description: "Update your password here. Remember to use both caps and lowercase letters as well as 1 or more symbols i.e. '@£$%",
            actions: [
              {
                title: "Update",
                onClick: ""
              }
            ],
            fields: [
              {
                isPassword: true,
                id: "prvPassword",
                label: "Old Password",
                type: "text",
              },
              {
                isPassword: true,
                id: "password",
                label: "New Password",
                type: "text",
              }
            ]
          },
          {
            title: "2 Factor MFA",
            description: "Improve your account security by adding an extra layer of protection i.e. call, sms etc.",
            actions: [
              {
                title: "Change",
                onClick: ""
              }
            ],
            fields: [
              {
                id: "mobNumber",
                label: "Mobile Number",
                type: "number",
              },
            ]
          },
        ],
      },
      {
        title: "Recovery",
        subTitle: "Just in case you lose access",
        description: "",
        subCatagories: [
          {
            title: "By phone",
            description: "Update your mobile number so we can help you get into your account and tell us which way is best to reach you",
            actions: [
              {
                title: "Update",
                onClick: ""
              }
            ],
            fields: [
              {
                id: "mobNumber",
                label: "Mobile Number",
                type: "number",
              },
            ],
          },
          {
            title: "By Email",
            description: "Update your recovery email address so we can help you get into your account",
            actions: [
              {
                title: "Change",
                onClick: ""
              }
            ],
            fields: [              {
              id: "email",
              label: "Email Address",
              type: "text",
            },],
          },
          {
            title: "Security Questions",
            description: "Update your security questions",
            actions: [
              {
                title: "Change",
                onClick: ""
              }
            ],
            fields: [
              {
                id: "recoveryQ1",
                label: "Question 1",
                type: "text",
              },
              {
                id: "recoveryA1",
                label: "Answer 1",
                type: "text",
              },
              {
                id: "recoveryQ2",
                label: "Question 2",
                type: "text",
              },
              {
                id: "recoveryA2",
                label: "Answer 2",
                type: "text",
              },
              {
                id: "recoveryQ3",
                label: "Question 3",
                type: "text",
              },
              {
                id: "recoveryA3",
                label: "Answer 3",
                type: "text",
              },
            ],
          },
        ],
      },
    ],
  },
  userProfile: {
    userDetailsForm: [
      {
        label: "First Name",
        key: "name",
      },
      {
        label: "Last Name",
        key: "sName",
      },
      {
        label: "Email",
        key: "email",
      },
      {
        label: "Date Of Birth",
        key: "dob",
      },
      {
        label: "Contact Number",
        key: "mob",
      },
    ],
  },
  menus: {
    mainMenu: [
      {
        label: "Upload New Record",
        icon: <CloudUpload />,
        component: <RecordUploadView />,
        path: "newrecord",
      },
      {
        label: "View All Records",
        icon: <ViewCompact />,
        component: <RecordViewer />,
        path: "viewrecords",
      },
      {
        label: "View Statistics",
        icon: <DataUsage />,
        component: <StatisticsViewer />,
        path: "statistics",
      },
    ],
    userMenu: [
      {
        label: "My Account",
        icon: <Person />,
        component: <UserProfile />,
        path: "userprofile",
      },
    ],
    miscMenu: [
      {
        label: "Security",
        icon: <Security />,
        component: <SecurityView />,
      },
    ],
  },
};

export const adminConfig = {
  appID: {
    displayName: "Money Tracker ADMIN portal",
    author: "James Crook",
  },
  menus: {
    mainMenu: [
      {
        label: "List Users",
        icon: <Group />,
        component: <StatisticsViewer />,
        path: "statistics",
      },
      {
        label: "Find User Records",
        icon: <FindInPage />,
        component: <StatisticsViewer />,
        path: "statistics",
      },
    ],
    miscMenu: [
      {
        label: "Platform Statistics",
        icon: <DataUsage />,
        component: <StatisticsViewer />,
        path: "statistics",
      },
    ],
  },
};
