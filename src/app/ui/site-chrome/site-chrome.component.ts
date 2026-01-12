import { CommonModule } from '@angular/common';
import { Component, HostListener, Input, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ThemeService, Theme } from '../../services/theme.service';
import { SkinService, Skin } from '../../services/skin.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-site-chrome',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './site-chrome.component.html',
  styleUrls: ['./site-chrome.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SiteChromeComponent {
  @Input() useRouterLinks = false;
  @Input() showVisPanel = true;
  @Input() phoneE164 = '+74951234567';
  @Input() phoneLabel = '+7 (495) 123-45-67';

  theme: Theme;
  skin: Skin;

  menuOpen = false;
  visPanelOpen = false;
  isScrolled = false;
  scrollProgress = 0;
  showBackToTop = false;

  constructor(
    private themeSvc: ThemeService,
    private skinSvc: SkinService,
    private toast: ToastService
  ) {
    this.theme = this.themeSvc.load();
    this.skin = this.skinSvc.load();

    this.themeSvc.apply(this.theme);
    this.skinSvc.apply(this.skin);
  }

  get showFloatingVisCall(): boolean {
    return !this.menuOpen && (!this.showVisPanel || !this.visPanelOpen);
  }

  toggleTheme(): void {
    this.theme = this.themeSvc.toggle(this.theme);
  }

  setSkin(skin: Skin): void {
    this.skin = skin;
    this.skinSvc.apply(skin);
    this.toast.show(`VIS: ${String(skin).toUpperCase()}`);
  }

  onCall(): void {
    this.toast.show(`Позвонить: ${this.phoneLabel}`);
  }

goTo(fragment: string) {
  if (fragment) {
    const element = document.getElementById(fragment);
    if (element) {
      // Скроллим к элементу + отступ (если header фиксированный, напр. 80px)
      const offset = 0; // или 80, если есть sticky header
      const y = element.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    } else {
      // Если якорь #home не найден — просто наверх страницы
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  } else {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
  scrollTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  openMenu(): void {
    this.menuOpen = true;
    this.visPanelOpen = false;
    document.body.style.overflow = 'hidden';
  }

  closeMenu(): void {
    this.menuOpen = false;
    document.body.style.overflow = '';
  }

  toggleMenu(): void {
    this.menuOpen ? this.closeMenu() : this.openMenu();
  }

  toggleVisPanel(): void {
    if (!this.showVisPanel) return;
    this.visPanelOpen = !this.visPanelOpen;
  }

goHome(event: Event) {
  event.preventDefault();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}


  @HostListener('window:scroll')
  onScroll(): void {
    this.isScrolled = window.scrollY > 10;
    this.showBackToTop = window.scrollY > 600;

    const doc = document.documentElement;
    const max = (doc.scrollHeight - doc.clientHeight) || 1;
    this.scrollProgress = Math.min(1, Math.max(0, window.scrollY / max));
  }

  @HostListener('document:keydown.escape')
  onEsc(): void {
    if (this.menuOpen) this.closeMenu();
    if (this.visPanelOpen) this.visPanelOpen = false;
  }
}
