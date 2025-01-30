/* generated file by scripts/generateRoutes.ts -- do not edit */
/* authored by tooooo1 */

/* tslint:disable */
/* eslint-disable */

type BaseRoutePath = '/idsearch' | '/banreason' | '/' | '/login' | '/lectureinfo' | '/historytest' | '/search' | '/pwsearch' | '/myposting' | '/resetpassword' | '/signup' | '/notice/detail' | '/exit' | '/emailsignup' | '/502' | '/404' | '/myinfo' | '/notice' | '/*';
export type RoutePath = BaseRoutePath | `${BaseRoutePath}?${string}`;
export type RoutePathWithQuery<T extends string> = `${BaseRoutePath}?${T}`;
