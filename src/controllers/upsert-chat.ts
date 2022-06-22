export function upsertChatController(chats: any[], newChat: any) {
	const chatIndex = chats.findIndex((el) => el.id === newChat.id);
	if (chatIndex === -1) {
		chats.push(newChat);
	} else {
		chats[chatIndex] = {
			...chats[chatIndex],
			...newChat,
		};
	}
	return chats;
}
