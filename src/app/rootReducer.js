import { combineReducers } from '@reduxjs/toolkit'
import {
  persistReducer,
} from "redux-persist";
import storage from "redux-persist/lib/storage"


// Reducers
import userActivitiesReducer from '~features/activity/user-activities-slice';
import authReducer from '~features/auth/auth-slice';
import budgetReducer from '~features/budget/budget-slice';
import contactReducer from '~features/contact/contact-slice';
import filesReducer from '~features/files/files-slice';

import layoutReducer from '~features/layout/layout-slice';
import notifierReducer from '~features/notification/notifier-slice';
import projectsReducer from '~features/projects/projects-slice';
import settingsReducer from '~features/settings/settings-slice';
import tasksReducer from '~features/tasks/tasks-slice';
import routerReducer from '~features/route/route-slice';
import projectMemberReducer from '~features/project-members/project-members-slice';

import teamReducer from '~features/team/team-slice';
import teamActivitiesReducer from '~features/team-activities/team-activities-slice';


const persistConfig = {
  key: "root",
  // localStorage에 저장합니다.
  storage,
  // auth, board, studio 3개의 reducer 중에 auth reducer만 localstorage에 저장합니다.
  whitelist: ["user", "auth"]
  // blacklist -> 그것만 제외합니다
};


export const rootReducer = combineReducers({
  userActivities : userActivitiesReducer,
  auth : authReducer,
  budget : budgetReducer,
  contacts : contactReducer,
  files : filesReducer,
  layout : layoutReducer,
  notifier : notifierReducer,
  projects :  projectsReducer,
  settings : settingsReducer,
  tasks : tasksReducer,
  team : teamReducer,
  teamActivities : teamActivitiesReducer,
  routes : routerReducer,
  projectMember : projectMemberReducer,
})


export default persistReducer(persistConfig, rootReducer);