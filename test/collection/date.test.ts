import { parseDate } from "../../src/collection/date.ts";

describe("parseDate", () => {
  it("parses valid DD/MM/YYYY HH:mm:ss into Date", () => {
    const result = parseDate("14/07/2025 00:00:00");
    expect(result.getFullYear()).toBe(2025);
    expect(result.getMonth()).toBe(6);
    expect(result.getDate()).toBe(14);
    expect(result.getHours()).toBe(0);
    expect(result.getMinutes()).toBe(0);

  });

  it("returns Invalid Date for incorrect format", () => {
    const result = parseDate("07-14-2025 00:00:00");
    expect(Number.isNaN(result.getTime())).toBe(true);
  });

  it("returns Invalid Date for nonsense", () => {
    const result = parseDate("not a date");
    expect(Number.isNaN(result.getTime())).toBe(true);
  });

  it("returns Invalid Date for malformed but matched string", () => {
    const result = parseDate("99/99/9999 99:99:99");
    expect(Number.isNaN(result.getTime())).toBe(true);
  });

});
