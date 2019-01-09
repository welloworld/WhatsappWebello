So Hey. The main reason for thie repo is that I did not find any bot that actually works because Whatsapp keeps changing things in order to lessen the web bots, so I thought, how hard can it be?
I took ideas and implemntations from [bruno222/whatsapp-web-bot](https://github.com/bruno222/whatsapp-web-bot) but the structure is far different.
I implemented only the basics, and now anyone that wants to go on with this bot can do it without starting from scratch.

Feel free to fork and create Pull Requests to my repo.

### The Code ###

NOTE: ** For running the code, copy the .js file content and paster it on the console. **

Main functions:

`sendMessage`:
 - Gets a message and a chat name and sends the message to the given chat.
 - The chat name must be in the latest chats (chats that in the cache*, call getAllLastChatNames() for check those chats).
 - Example: `sendMessage('group', 'Hey.. Whatup?')`.

`getLastestChatsLastMessages`:
 - Returns the last message for each chat in the getAllLastChatNames() collection.
 - Example: `getLastestChatsLastMessages()`

`getMessagesFromSpecificUser`:
 - Gets a chat-name and an array.
 - Moves thourgh chat-name message (messages that in the cache*) and return the messages.
 - Example: `let a = []; getMessagesFromSpecificUser('group', a);`

* = The site manages some cache, because it does not need any conversation from the past to do something. If you want to expand the collection - scroll up for more chats/message, and it will be added to the cache automatically.

Hope I helped someone.
welloworld.
wellosworld@gmail.com