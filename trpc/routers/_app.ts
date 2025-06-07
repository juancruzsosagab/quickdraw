import { z } from 'zod'
import { router, publicProcedure } from '@/trpc/trpc'
import type { TLStoreSnapshot } from 'tldraw'

let documentData: { snapshot: TLStoreSnapshot; lastModified: string } = {
  snapshot: {} as TLStoreSnapshot,
  lastModified: new Date().toISOString(),
}

export const appRouter = router({
  getDocument: publicProcedure.query(() => documentData),
  saveDocument: publicProcedure.input(
    z.object({ snapshot: z.any() })
  ).mutation(({ input }) => {
    documentData = {
      snapshot: input.snapshot,
      lastModified: new Date().toISOString(),
    }
    return documentData
  }),
})

export type AppRouter = typeof appRouter
