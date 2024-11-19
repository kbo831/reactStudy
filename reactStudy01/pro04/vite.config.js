import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { resolve } from 'path'
import { fileURLToPath } from 'url';

// 현재 파일의 디렉토리 경로를 구하고, 'src'로 설정
const __filename = fileURLToPath(import.meta.url); // 현재 모듈 파일의 전체 경로를 구하여, fileURLToPth()로 파일 시스템 경로로 변환
const __dirname = resolve(__filename, '..');  // resolve()는 절대 경로를 만드는 함수이며, _filename이 현재 파일의 경로라고 할때 ..은 __filename에서 한 단계 상위 디렉토리(부모)를 반환

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      // '@'는 'src'를 가리키는 별칭으로 설정
      { find: '@', replacement: resolve(__dirname, 'src') },
      { find: '@pages', replacement: resolve(__dirname, 'src/pages') },
      { find: '@components', replacement: resolve(__dirname, 'src/components') },
    ]
  }
});
