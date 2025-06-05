import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import path from 'path';
import dts from 'vite-plugin-dts';

const ReactCompilerConfig = {
  /* ... */
};

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_');
  console.log(env);

  return {
    define: {
      'process.env': {},
      global: 'window',
    },
    build: {
      lib: {
        // 실제 라이브러리 진입점 파일 경로로 수정하세요.
        entry: path.resolve(__dirname, 'src/index.tsx'),
        // 번들링 시 전역(Global)으로 노출될 이름
        name: 'TriphosMessenger',
        // 출력 파일명 템플릿 (format별로 변경)
        fileName: (format) => `index.${format === 'es' ? 'js' : 'umd.cjs'}`,
        // 필요한 포맷 선택(예: es, cjs, umd)
        formats: ['es', 'cjs', 'umd'],
      },
      rollupOptions: {
        external: ['react', 'react-dom', 'react/jsx-runtime'],
        output: {
          globals: {
            react: 'React',
            'react-dom': 'ReactDOM',
            'react/jsx-runtime': 'React',
          },
        },
      },
      cssCodeSplit: false,
      sourcemap: true,
      emptyOutDir: true,
    },
    plugins: [
      dts({
        insertTypesEntry: true,
        include: ['src/**/*'],
        exclude: ['src/**/*.test.*', 'src/**/*.stories.*'],
      }),
      svgr({
        svgrOptions: {},
      }),
      react({
        babel: {
          plugins: [['babel-plugin-react-compiler', ReactCompilerConfig]],
        },
      }),
      tsconfigPaths(),
      ViteImageOptimizer({
        test: /\.(jpe?g|png|gif|tiff|webp|svg|avif)$/i,
        exclude: undefined,
        include: undefined,
        includePublic: true,
        logStats: true,
        ansiColors: true,
        svg: {
          multipass: true,
          plugins: [
            {
              name: 'preset-default',
              params: {
                overrides: {
                  cleanupNumericValues: false,
                  removeViewBox: false, // https://github.com/svg/svgo/issues/1128
                },
                // cleanupIDs: {
                //   minify: false,
                //   remove: false,
                // },
                // convertPathData: false,
              },
            },
            'sortAttrs',
            {
              name: 'addAttributesToSVGElement',
              params: {
                attributes: [{ xmlns: 'http://www.w3.org/2000/svg' }],
              },
            },
          ],
        },
        png: {
          // https://sharp.pixelplumbing.com/api-output#png
          quality: 100,
        },
        jpeg: {
          // https://sharp.pixelplumbing.com/api-output#jpeg
          quality: 100,
        },
        jpg: {
          // https://sharp.pixelplumbing.com/api-output#jpeg
          quality: 100,
        },
        tiff: {
          // https://sharp.pixelplumbing.com/api-output#tiff
          quality: 100,
        },
        // gif does not support lossless compression
        // https://sharp.pixelplumbing.com/api-output#gif
        gif: {},
        webp: {
          // https://sharp.pixelplumbing.com/api-output#webp
          lossless: false,
        },
        avif: {
          // https://sharp.pixelplumbing.com/api-output#avif
          lossless: true,
        },
        cache: false,
        cacheLocation: undefined,
      }),
    ],
    assetsInclude: ['**/*.ttf', '**/*.woff', '**/*.woff2', '**/*.eot', '**/*.otf'],
  };
});
