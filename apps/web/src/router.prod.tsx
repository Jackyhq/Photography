import { createAppRouter } from './router-core'

const globTree = import.meta.glob(['./pages/**/*.tsx', '!./pages/[(]debug[)]/**/*.tsx'])

export const router = createAppRouter(globTree)
