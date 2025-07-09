export function isTodayOrTomorrow(date: Date): boolean {
  const now = new Date();

  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const check = new Date(date.getFullYear(), date.getMonth(), date.getDate());

  return check.getTime() === today.getTime() || check.getTime() === tomorrow.getTime();
}