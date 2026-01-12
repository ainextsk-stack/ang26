import { AfterViewInit, Component, ElementRef, HostListener, Input, OnDestroy, ViewChild } from '@angular/core';

@Component({
  selector: 'app-canvas-hero',
  standalone: true,
  templateUrl: './canvas-hero.component.html',
  styleUrls: ['./canvas-hero.component.scss'],
})
export class CanvasHeroComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;

  @Input() maxParticles = 150;
  @Input() fps = 30;

  private ctx!: CanvasRenderingContext2D;
  private particles: Array<{ x:number; y:number; size:number; speedX:number; speedY:number; color:string; }> = [];
  private raf: number | null = null;
  private last = 0;
  private frame = 1000 / 30;

  mouse = { x: null as number | null, y: null as number | null, radius: 100 };

  ngAfterViewInit(): void {
    this.frame = 1000 / Math.max(1, this.fps);
    const c = this.canvasRef.nativeElement;
    const ctx = c.getContext('2d');
    if (!ctx) return;
    this.ctx = ctx;

    this.resize();
    this.seed();
    this.animate(0);
  }

  ngOnDestroy(): void {
    if (this.raf !== null) cancelAnimationFrame(this.raf);
    this.raf = null;
  }

  onMove(e: MouseEvent): void {
    const rect = this.canvasRef.nativeElement.getBoundingClientRect();
    this.mouse.x = e.clientX - rect.left;
    this.mouse.y = e.clientY - rect.top;
  }

  onLeave(): void {
    this.mouse.x = null;
    this.mouse.y = null;
  }

  @HostListener('window:resize')
  resize(): void {
    const c = this.canvasRef.nativeElement;
    const rect = c.getBoundingClientRect();
    c.width = Math.max(1, Math.floor(rect.width));
    c.height = Math.max(1, Math.floor(rect.height));
    this.seed();
  }

  private seed(): void {
    const c = this.canvasRef.nativeElement;
    const count = Math.min(this.maxParticles, (c.width * c.height) / 10000);
    this.particles = Array.from({ length: Math.floor(count) }, () => ({
      x: Math.random() * c.width,
      y: Math.random() * c.height,
      size: Math.random() * 2 + 1,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: (Math.random() - 0.5) * 0.5,
      color: `rgba(${Math.random() > 0.5 ? '103, 80, 164' : '67, 97, 238'}, ${Math.random() * 0.3 + 0.1})`,
    }));
  }

  private animate = (t: number): void => {
    if (t - this.last < this.frame) {
      this.raf = requestAnimationFrame(this.animate);
      return;
    }
    this.last = t;

    const c = this.canvasRef.nativeElement;
    const ctx = this.ctx;
    ctx.clearRect(0, 0, c.width, c.height);

    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];

      p.x += p.speedX;
      p.y += p.speedY;

      if (p.x < 0 || p.x > c.width) p.speedX *= -1;
      if (p.y < 0 || p.y > c.height) p.speedY *= -1;

      if (this.mouse.x !== null && this.mouse.y !== null) {
        const dx = this.mouse.x - p.x;
        const dy = this.mouse.y - p.y;
        const d = Math.sqrt(dx*dx + dy*dy);
        if (d < this.mouse.radius) {
          const a = Math.atan2(dy, dx);
          const f = (this.mouse.radius - d) / this.mouse.radius;
          p.x -= Math.cos(a) * f * 3;
          p.y -= Math.sin(a) * f * 3;
        }
      }

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.fill();

      for (let j = i + 1; j < this.particles.length; j++) {
        const q = this.particles[j];
        const dx = p.x - q.x;
        const dy = p.y - q.y;
        const d = Math.sqrt(dx*dx + dy*dy);
        if (d < 90) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(103, 80, 164, ${0.18 * (1 - d / 90)})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.stroke();
        }
      }
    }

    this.raf = requestAnimationFrame(this.animate);
  };
}
