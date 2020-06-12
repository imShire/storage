import ts from 'rollup-plugin-typescript2'
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import { terser } from "rollup-plugin-terser";

const formats = ['umd', 'esm']
const output = formats.map((format) => ({
    file: `dist/ixu-storage.${format}.min.js`,
    format,
    name: 'ixuStorage',
}))

export default {
    input: 'src/index.ts',
    output,
    plugins: [
        babel({
            exclude: 'node_modules/**'
        }),
        resolve(),
        commonjs(),
        ts(),
        terser()
    ],
}
