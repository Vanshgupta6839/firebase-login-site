// firebase/utils.ts
export function showMessage(message, divId) {
    const messageDiv = document.getElementById(divId);
    if (!messageDiv)
        return;
    messageDiv.style.display = "block";
    messageDiv.innerHTML = message;
    messageDiv.style.opacity = "1";
    setTimeout(() => {
        messageDiv.style.opacity = "0";
    }, 5000);
}
