export enum ReminderDay {
    Today = "today",
    Tomorrow = "tomorrow",
    None = "none"
}

export function isTodayOrTomorrow(date: Date): boolean {
    return getReminderDayLabel(date) === "today" || getReminderDayLabel(date) === "tomorrow";
}

export function getReminderDayLabel(date: Date): ReminderDay {
    const now = new Date();

    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const check = new Date(date.getFullYear(), date.getMonth(), date.getDate());

    if (check.getTime() === today.getTime()) return ReminderDay.Today;
    if (check.getTime() === tomorrow.getTime()) return ReminderDay.Tomorrow;

    return ReminderDay.None;
}

