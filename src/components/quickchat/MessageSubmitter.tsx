export default function MessageSubmitter({ chatid, userid, chatmsg }: { chatid: string, userid: any, chatmsg: any }) {
    console.log(chatid, userid);
    console.log(chatmsg);
    const messageInput = document.getElementById('messageinput') as HTMLInputElement;
    messageInput.value = '';
}