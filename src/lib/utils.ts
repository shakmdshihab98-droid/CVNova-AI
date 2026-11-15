export const cn = (...c: (string | undefined | false)[]) => c.filter(Boolean).join(" ");
