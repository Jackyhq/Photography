import { Spring } from '@afilmory/utils'
import { Provider } from 'jotai'
import { domAnimation, LazyMotion, MotionConfig } from 'motion/react'
import type { FC, PropsWithChildren } from 'react'

import { jotaiStore } from '~/lib/jotai'

import { AppUpdateProvider } from './app-update-provider'
import { ContextMenuProvider } from './context-menu-provider'
import { DeferredToaster } from './deferred-toaster'
import { EventProvider } from './event-provider'
import { I18nProvider } from './i18n-provider'
import { PhotoTextUpdatesProvider } from './photo-text-updates-provider'
import { StableRouterProvider } from './stable-router-provider'

export const RootProviders: FC<PropsWithChildren> = ({ children }) => (
  <LazyMotion features={domAnimation} strict key="framer">
    <MotionConfig reducedMotion="user" transition={Spring.presets.smooth}>
      <Provider store={jotaiStore}>
        <EventProvider />
        <StableRouterProvider />

        <ContextMenuProvider />
        <I18nProvider>
          <PhotoTextUpdatesProvider>
            <AppUpdateProvider>{children}</AppUpdateProvider>
          </PhotoTextUpdatesProvider>
        </I18nProvider>
      </Provider>
    </MotionConfig>
    <DeferredToaster />
  </LazyMotion>
)
