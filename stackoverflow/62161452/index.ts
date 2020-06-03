import { DynamicImport } from './DynamicImport';

export function main() {
  return DynamicImport({
    id: 'MyPage',
    loader: () => import('./MyPageWrapper'),
  });
}
