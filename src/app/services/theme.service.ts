import { Injectable } from '@angular/core';

export type Theme = 'light' | 'dark';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly key = 'theme';

  load(): Theme {
    const t = localStorage.getItem(this.key);
    return (t === 'dark' || t === 'light') ? t : 'light';
  }

  apply(theme: Theme): void {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(this.key, theme);
  }

  toggle(current: Theme): Theme {
    const next: Theme = current === 'dark' ? 'light' : 'dark';
    this.apply(next);
    return next;
  }
}
