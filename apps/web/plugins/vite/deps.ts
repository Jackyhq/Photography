import type { Plugin, UserConfig } from 'vite'

export interface DependencyChunkGroup {
  name: string
  dependencies: readonly string[]
}

export function resolveDependencyChunkName(id: string, groups: readonly DependencyChunkGroup[]): string | null {
  const matchedGroup = groups.find((group) =>
    group.dependencies.some((dependency) => {
      const pattern = `/node_modules/${dependency}/`
      const dependencyIndex = id.indexOf(pattern)
      if (dependencyIndex === -1 || id.includes(`${pattern}node_modules/`)) return false

      const prefix = id.slice(0, dependencyIndex)
      const previousNodeModulesIndex = prefix.lastIndexOf('/node_modules/')
      if (previousNodeModulesIndex === -1) return true

      // pnpm's content-addressed path legitimately contains two node_modules
      // segments. Other earlier package segments indicate a nested dependency.
      const previousPackage = prefix.slice(previousNodeModulesIndex + '/node_modules/'.length).split('/')[0]
      return previousPackage === '.pnpm'
    }),
  )

  return matchedGroup ? `vendor/${matchedGroup.name}` : null
}

export function createDependencyChunksPlugin(groups: readonly DependencyChunkGroup[]): Plugin {
  return {
    name: 'dependency-chunks',
    config(config: UserConfig) {
      config.build = config.build || {}
      config.build.rollupOptions = config.build.rollupOptions || {}
      config.build.rollupOptions.output = config.build.rollupOptions.output || {}

      const { output } = config.build.rollupOptions
      const outputConfig = Array.isArray(output) ? output[0] : output
      outputConfig.assetFileNames = 'assets/[name].[hash:6][extname]'
      outputConfig.chunkFileNames = (chunkInfo) => {
        return chunkInfo.name.startsWith('vendor/') ? '[name]-[hash].js' : 'assets/[name]-[hash].js'
      }

      outputConfig.manualChunks = (id: string, { getModuleInfo }) => {
        const moduleInfo = getModuleInfo(id)
        if (moduleInfo?.dynamicImporters?.length && moduleInfo?.importers?.length) {
          return null
        }

        return resolveDependencyChunkName(id, groups)
      }
    },
  }
}
