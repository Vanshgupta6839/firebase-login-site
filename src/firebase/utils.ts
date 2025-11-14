// firebase/utils.ts
export function showMessage(message: string, divId: string): void {
  const messageDiv = document.getElementById(divId) as HTMLElement;

  if (!messageDiv) return;

  messageDiv.style.display = "block";
  messageDiv.innerHTML = message;
  messageDiv.style.opacity = "1";

  setTimeout(() => {
    messageDiv.style.opacity = "0";
  }, 5000);
}
