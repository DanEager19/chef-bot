import { Application } from "express";
import { Reservations, Attendance } from './controller'; 

export const Routes = (app: Application) => {
    const reservations = new Reservations();
    const attendance = new Attendance();

    app.route('/reserve')
        .get(reservations.showAllReservations)
        .post(reservations.reserve)

    app.route('/return')
        .post(reservations.return);
    
    app.route('/items')
        .get(reservations.listAllItems)
        .post(reservations.addItem)
        .put(reservations.updateItem)
        .delete(reservations.removeItem);

        
    app.route('/attend')
        .post(attendance.attendMeeting);
    
    app.route('/history')
        .get(attendance.listAttendees)
        .post(attendance.listAttendance);

    app.route('/register')
        .post(attendance.register);

    app.route('/info')
        .post(attendance.attendanceInfo);
}