/** Validasi param ?next= — hanya path internal relatif, cegah open-redirect. */
export function safeNext(next: string | null | undefined, fallback = "/") {
  return next && next.startsWith("/") && !next.startsWith("//") ? next : fallback;
}
