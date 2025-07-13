export function parseDate(dateStr: string): Date {
  const match = /^(\d{2})\/(\d{2})\/(\d{4}) (\d{2}):(\d{2}):(\d{2})$/.exec(
    dateStr,
  );
  if (!match) return new Date(NaN);

  const [, dd, mm, yyyy, hh, min, ss] = match.map(Number);

  const parsed = new Date(yyyy, mm - 1, dd, hh, min, ss);

  // Validate the components
  if (
    parsed.getFullYear() !== yyyy ||
    parsed.getMonth() !== mm - 1 ||
    parsed.getDate() !== dd ||
    parsed.getHours() !== hh ||
    parsed.getMinutes() !== min ||
    parsed.getSeconds() !== ss
  ) {
    return new Date(NaN);
  }

  return parsed;
}
