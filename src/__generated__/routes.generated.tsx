/* generated file by scripts/generateRoutes.ts -- do not edit */
/* authored by tooooo1 */

/* tslint:disable */
/* eslint-disable */
import { createBrowserRouter, type NavigateOptions } from 'react-router';
import { RoutePath } from './routes.types';

import Layout from '../components/Etc/Layout';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
      path: '/idsearch' as RoutePath,
      lazy: async () => {
        const { default: Component } = await import('../pages/IdSearch');

        return { Component };
      }
    },
{
      path: '/banreason' as RoutePath,
      lazy: async () => {
        const { default: Component } = await import('../pages/BanReason');

        return { Component };
      }
    },
{
      path: '/' as RoutePath,
      lazy: async () => {
        const { default: Component } = await import('../pages/Main');

        return { Component };
      }
    },
{
      path: '/login' as RoutePath,
      lazy: async () => {
        const { default: Component } = await import('../pages/Login');

        return { Component };
      }
    },
{
      path: '/lectureinfo' as RoutePath,
      lazy: async () => {
        const { default: Component } = await import('../pages/LectureInfo');

        return { Component };
      }
    },
{
      path: '/historytest' as RoutePath,
      lazy: async () => {
        const { default: Component } = await import('../pages/HistoryTest');

        return { Component };
      }
    },
{
      path: '/search' as RoutePath,
      lazy: async () => {
        const { default: Component } = await import('../pages/Search');

        return { Component };
      }
    },
{
      path: '/pwsearch' as RoutePath,
      lazy: async () => {
        const { default: Component } = await import('../pages/PwSearch');

        return { Component };
      }
    },
{
      path: '/myposting' as RoutePath,
      lazy: async () => {
        const { default: Component } = await import('../pages/MyPosting');

        return { Component };
      }
    },
{
      path: '/resetpassword' as RoutePath,
      lazy: async () => {
        const { default: Component } = await import('../pages/ResetPassword');

        return { Component };
      }
    },
{
      path: '/signup' as RoutePath,
      lazy: async () => {
        const { default: Component } = await import('../pages/SignUp');

        return { Component };
      }
    },
{
      path: '/notice/detail' as RoutePath,
      lazy: async () => {
        const { default: Component } = await import('../pages/NoticeDetail');

        return { Component };
      }
    },
{
      path: '/exit' as RoutePath,
      lazy: async () => {
        const { default: Component } = await import('../pages/Exit');

        return { Component };
      }
    },
{
      path: '/emailsignup' as RoutePath,
      lazy: async () => {
        const { default: Component } = await import('../pages/EmailSignUp');

        return { Component };
      }
    },
{
      path: '/502' as RoutePath,
      lazy: async () => {
        const { default: Component } = await import('../pages/BadGateway');

        return { Component };
      }
    },
{
      path: '/404' as RoutePath,
      lazy: async () => {
        const { default: Component } = await import('../pages/NotFound');

        return { Component };
      }
    },
{
      path: '/myinfo' as RoutePath,
      lazy: async () => {
        const { default: Component } = await import('../pages/MyInfo');

        return { Component };
      }
    },
{
      path: '/notice' as RoutePath,
      lazy: async () => {
        const { default: Component } = await import('../pages/Notice');

        return { Component };
      }
    },
{
      path: '/*' as RoutePath,
      lazy: async () => {
        const { default: Component } = await import('../pages/NotFound');

        return { Component };
      }
    }
    ]
  }
]);

declare module 'react-router' {
  export function useNavigate(): (path: RoutePath, options?: NavigateOptions) => void;
}