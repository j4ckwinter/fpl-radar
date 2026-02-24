export function parseSelectedByPercent(value: string): number | null {
  const n = Number.parseFloat(value);
  return Number.isNaN(n) ? null : n;
}

export function parseDeadlineTime(iso: string): Date {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) throw new Error(`Invalid deadline_time: ${iso}`);
  return d;
}
