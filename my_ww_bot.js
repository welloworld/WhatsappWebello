
const CHAT_TOKEN = '_3j7s9';
const MESSAGE_TOKEN = 'Tkt2p';
const GROUP_TOKEN = '_1WBXd';

const eventFire = (el, etype) => {
	var evt = document.createEvent("MouseEvents");
	evt.initMouseEvent(etype, true, true, window,0, 0, 0, 0, 0, false, false, false, false, 0, null);
	el.dispatchEvent(evt);
}

function getChats() {
	return document.getElementsByClassName(CHAT_TOKEN);
}

function getCurrChatMessages() {
	return document.getElementsByClassName(MESSAGE_TOKEN);
}

function currChatIsGroup() { //TODO: possible problem can be that connected label and/or the last seen scenario.
	let groupDetails = document.getElementsByClassName(GROUP_TOKEN)[0];
	return (groupDetails.children.length == 2 && groupDetails.children[1].textContent != "לחץ/י כאן לפרטי איש הקשר");
}

function getAllLastChatNames () {
	let messagesCurr = [];
	for (let c of getChats()) {
		nameOfChat = c.children[0].children[0].textContent;
		messagesCurr.push(nameOfChat);
	}
	return messagesCurr;
}

function getLastestChatsLastMessages() {
	let messagesCurr = [];
	for (let c of getChats()) {
		let curr = {};
		message = c.children[1].children[0];
		[nameOfChat, timeOfMessage] = [...c.children[0].children].map((v) => v.textContent);
		isGroupMessage = [...message.children[0].children].filter((e) => e.tagName === "SPAN").length > 1;
		if (isGroupMessage) {
			specificUser = message.children[0].children[0].textContent
			curr.specificUser = specificUser.slice(0, specificUser.length-1);
			message = message.children[0].children[1].textContent;
		} else {
			message = c.children[1].children[0].textContent;
		}
		curr.time = timeOfMessage;
		curr.name = nameOfChat;
		curr.message = message;

		messagesCurr.push(curr);
	}
	return messagesCurr;
}

function getChatByUsername(chatName) {
	let chats = getChats();
	for (let chat of chats) {
		if (chat.children[0].children[0].textContent == chatName) {
			return chat.parentElement.parentElement.parentElement;
		}
	}
	return false;
}

function sendMessage(message, chatName) {
	chat = getChatByUsername(chatName);
	if (!chat) {
		console.log('NOT EXISTS!');
		return;
	}
	eventFire(chat.firstChild.firstChild, 'mousedown');

	setTimeout(() => {
		messageBox = document.querySelectorAll("[contenteditable='true']")[0];
		messageBox.innerText = message;

		event = document.createEvent("UIEvents");
		event.initUIEvent("input", true, true, window, 1);
		messageBox.dispatchEvent(event);

		eventFire(document.querySelector('span[data-icon="send"]'), 'click');
	}, 1000); //waiting for the chat to be clicked
}

function getContentFromMessage(message){
	if (message.children.length ==  1) { //quoted text
		return message.children[0].children[0].textContent;
	}
	else {
		quote = message.children[0].children[0].children[1].children[1].children[0];
		quotedUser = quote.children[0].textContent;
		quotedMes = quote.children[1].textContent;
		real = message.children[1].children[0].textContent;
		return { 'message': real, 'quoted user': quotedUser, 'quoted message': quotedMes };
	}

}

function getMessagesFromSpecificUser(chatName, messagesCurr) {
	chat = getChatByUsername(chatName);
	if (!chat) {
		console.log('NOT EXISTS!');
		return;
	}
	eventFire(chat.firstChild.firstChild, 'mousedown');
	setTimeout(() => {
		messages = getCurrChatMessages();
		let isGroup = currChatIsGroup();
		for (let message of messages) {
			try {
				let contentIndex = 0, hourIndex = 1;
				if (message.children.length == 2) { //It either private conversation or my messages or user's messages in row.
					sender = message.parentElement.classList.contains('message-in') ? chatName : 'ME';
					if (messagesCurr.length > 0 && sender != 'ME' && messagesCurr[messagesCurr.length-1].sender != 'ME' && isGroup) {
						sender = messagesCurr[messagesCurr.length-1].sender;
					}

				} else {
					contentIndex++;
					hourIndex++;
					sender = message.children[0].children[0].textContent;
				}

				content =  getContentFromMessage(message.children[contentIndex]);
				hourOfMessage = message.children[hourIndex].children[0].children[1].textContent;

				messagesCurr.push({'content': content, 'hourOfMessage': hourOfMessage, 'sender': sender});
			} catch(e) {
				console.log(e.message);
				console.log(message);
			}
		}
	}, 100);

}
