export function upsertDoctorController(doctor: any[], newdoctor: any) {
	const doctorindex = doctor.findIndex((el) => el.id === newdoctor.id);
	if (doctorindex === -1) {
		doctor.push(newdoctor);
	} else {
		doctor[doctorindex] = {
			...doctor[doctorindex],
			...newdoctor,
		};
	}
	return doctor;
}