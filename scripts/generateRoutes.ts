import fs from 'fs';
import path from 'path';

const PAGES_DIR = path.join(process.cwd(), 'src/pages');

const fileNameToPath = (fileName: string) => {
  if (fileName === 'Main.tsx') return '/';

  const specialCases: Record<string, string> = {
    'NotFound.tsx': '/404',
    'BadGateway.tsx': '/502',
    'NoticeDetail.tsx': '/notice/detail',
  };

  if (fileName in specialCases) {
    return specialCases[fileName];
  }

  return fileName
    .replace(/\.(tsx|jsx)$/, '')
    .replace(/([A-Z])/g, (_match, letter, offset) => {
      return offset === 0 ? letter.toLowerCase() : letter.toLowerCase();
    })
    .toLowerCase()
    .replace(/\[(.+)\]/, ':$1');
};

const generateRoutes = () => {
  const routes: { path: string; component: string }[] = [];

  const scanDir = (dir: string) => {
    fs.readdirSync(dir).forEach((file) => {
      const filePath = path.join(dir, file);

      if (fs.statSync(filePath).isDirectory()) {
        scanDir(filePath);

        return;
      }

      if (!file.match(/\.(tsx|jsx)$/)) return;

      const relativePath = path.relative(PAGES_DIR, filePath);
      const routePath = fileNameToPath(relativePath);

      routes.push({
        path: routePath.startsWith('/') ? routePath : `/${routePath}`,
        component: relativePath.replace(/\.tsx$/, ''),
      });
    });
  };

  scanDir(PAGES_DIR);

  routes.push({
    path: '/*',
    component: 'NotFound',
  });

  const GENERATED_DIR = path.join(process.cwd(), 'src/__generated__');

  if (fs.existsSync(GENERATED_DIR)) {
    fs.rmSync(GENERATED_DIR, { recursive: true });
  }
  fs.mkdirSync(GENERATED_DIR, { recursive: true });

  const typesContent = `/* generated file by scripts/generateRoutes.ts -- do not edit */
/* authored by tooooo1 */

/* tslint:disable */
/* eslint-disable */

type BaseRoutePath = ${routes.map((route) => `'${route.path}'`).join(' | ')};
export type RoutePath = BaseRoutePath | \`\${BaseRoutePath}?\${string}\`;
export type RoutePathWithQuery<T extends string> = \`\${BaseRoutePath}?\${T}\`;
`;

  const routesContent = `/* generated file by scripts/generateRoutes.ts -- do not edit */
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
      ${routes
        .map(
          (route) => `{
      path: '${route.path}' as RoutePath,
      lazy: async () => {
        const { default: Component } = await import('../pages/${route.component}');

        return { Component };
      }
    }`,
        )
        .join(',\n')}
    ]
  }
]);

declare module 'react-router' {
  export function useNavigate(): (path: RoutePath, options?: NavigateOptions) => void;
}
`;

  fs.writeFileSync(path.join(GENERATED_DIR, 'routes.types.ts'), typesContent);
  fs.writeFileSync(path.join(GENERATED_DIR, 'routes.generated.tsx'), routesContent.trim());

  console.log('\n🚀 Routes generated successfully!\n');
  console.log('📍 Available routes:');
  routes.forEach((route) => {
    console.log(`  ${route.path.padEnd(20)} 🔗`);
  });
  console.log('\n✨ Route generation completed!\n');
};

generateRoutes();
