export function upsertPatiantController(patiant: any[], newpatiant: any) {
	const patiantindex = patiant.findIndex((el) => el.id === newpatiant.id);
	if (patiantindex === -1) {
		patiant.push(newpatiant);
	} else {
		patiant[patiantindex] = {
			...patiant[patiantindex],
			...newpatiant,
		};
	}
	return patiant;
}