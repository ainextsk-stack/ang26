import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ToastService {
  show(message: string): void {
    const n = document.createElement('div');
    n.className = 'notification';
    n.setAttribute('role', 'status');
    n.textContent = message;
    document.body.appendChild(n);

    requestAnimationFrame(() => n.classList.add('show'));

    setTimeout(() => {
      n.classList.remove('show');
      setTimeout(() => n.remove(), 250);
    }, 2600);
  }
}
