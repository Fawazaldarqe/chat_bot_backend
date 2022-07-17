export function upsertMangerController(manger: any[], newmanger: any) {
	const Mangerindex = manger.findIndex((el) => el.id === newmanger.id);
	if (Mangerindex === -1) {
		manger.push(newmanger);
	} else {
		manger[Mangerindex] = {
			...manger[Mangerindex],
			...newmanger,
		};
	}
	return manger;
}