import { Injectable } from '@angular/core';

export type Skin =
  | 'm3' | 'oled' | 'cyber' | 'glass' | 'forest' | 'crimson'
  | 'sand' | 'ice' | 'mono' | 'amber' | 'ocean' | 'violet';

@Injectable({ providedIn: 'root' })
export class SkinService {
  private readonly key = 'skin';
  private readonly skins: Skin[] = [
    'm3','oled','cyber','glass','forest','crimson',
    'sand','ice','mono','amber','ocean','violet'
  ];

  load(): Skin {
    const s = localStorage.getItem(this.key) as Skin | null;
    return (s && this.skins.includes(s)) ? s : 'm3';
  }

  apply(skin: Skin): void {
    document.documentElement.setAttribute('data-skin', skin);
    localStorage.setItem(this.key, skin);
  }

  next(current: Skin): Skin {
    const i = this.skins.indexOf(current);
    const next = this.skins[(i + 1) % this.skins.length];
    this.apply(next);
    return next;
  }
}
