import type { Action, ThunkAction } from "@reduxjs/toolkit";
import { combineSlices, configureStore } from "@reduxjs/toolkit";
import { postsApiSlice } from "./features/posts/postsApiSlice";
import { usersApiSlice } from "./features/users/usersSlice";
import { searchApiSlice } from "./features/search/searchApiSlice";
import { communitiesApiSlice } from "./features/communities/communitiesApiSlice";
import { imageApiSlice } from "./features/image/imageApiSlice";
import { notificationsApiSlice } from "./features/notifications/notificationsSlice";

// `combineSlices` automatically combines the reducers using
// their `reducerPath`s, therefore we no longer need to call `combineReducers`.
const rootReducer = combineSlices(
  postsApiSlice,
  usersApiSlice,
  searchApiSlice,
  communitiesApiSlice,
  imageApiSlice,
  notificationsApiSlice
);
// Infer the `RootState` type from the root reducer
export type RootState = ReturnType<typeof rootReducer>;

// `makeStore` encapsulates the store configuration to allow
// creating unique store instances, which is particularly important for
// server-side rendering (SSR) scenarios. In SSR, separate store instances
// are needed for each request to prevent cross-request state pollution.
export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware().concat(
        postsApiSlice.middleware,
        usersApiSlice.middleware,
        searchApiSlice.middleware,
        communitiesApiSlice.middleware,
        imageApiSlice.middleware,
        notificationsApiSlice.middleware
      );
    },
  });
};

// Infer the return type of `makeStore`
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `AppDispatch` type from the store itself
export type AppDispatch = AppStore["dispatch"];
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>;
