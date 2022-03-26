const btn = document.getElementById("button");
const value = document.getElementById("value");
btn.onclick = async function () {
    if (Notification) {
        await Notification.requestPermission();
        console.log(Notification.permission);
        checkBtnDisabled();
    }
};
const checkBtnDisabled = () => {
    if (Notification && Notification.permission !== 'denied') {
        btn.disabled = true;
    }
};
checkBtnDisabled();
function sendDesktopNotification(text) {
    new Notification('Уведомление из тестового задания', {
        body: `Пришло новое число через SharedWorker is WebSocket: ${text}`,
        tag: text
    });
}

const webSocketWorker = new SharedWorker('sw.js');
webSocketWorker.port.addEventListener('message', ({data}) => {
    sendDesktopNotification(data.value);
    value.innerHTML = `Обновлено ${new Date()} со значением ${data.value}`;
});
webSocketWorker.port.start();
window.addEventListener('beforeunload', () => {
    webSocketWorker.port.postMessage('beforeunload');
    webSocketWorker.port.close();
});
