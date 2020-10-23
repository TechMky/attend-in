import { format } from "date-fns";
import { ABSENT, DATE_FORMAT, LEFT, PRESENT } from "../assets/constants";
import { StoredAttendance } from "../types/StoredAttendance";

export function getAttendanceFromStorage(dateKey: string = format(new Date(), DATE_FORMAT)): StoredAttendance[] {
    return JSON.parse(localStorage.getItem(dateKey) || '[]')
}

export function getTodaysDateString(): string {
    return format(new Date(), DATE_FORMAT)
}

export function getAttendanceStatusText(attdStatus: number) {
    switch (attdStatus) {
        case PRESENT:

            return 'Present' // define constants afterwards

        case ABSENT:

            return 'Absent' // define constants afterwards
        case LEFT:

            return 'Left' // define constants afterwards

        default:
            return ''
    }
}