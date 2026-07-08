export type ActionResult<T = unknown> = {
  ok: boolean
  data?: T
  error?: string
}
