import {Component, HostBinding, inject, Input} from '@angular/core';
import {MatSidenavModule} from "@angular/material/sidenav";
import {UikAmModule, UikLayoutBreakpointObserverService, UikSidenavService} from "@visiativ/uik-am";
import {MatIcon} from "@angular/material/icon";
import {MatBadgeModule} from '@angular/material/badge';
import {MatToolbar} from '@angular/material/toolbar';
import {MatIconButton} from '@angular/material/button';
import {MatButtonModule} from '@angular/material/button';
import {toSignal} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-page-header',
  imports: [
    MatSidenavModule,
    UikAmModule,
    MatIcon,
    MatToolbar,
    MatBadgeModule,
    MatIconButton,
    MatButtonModule,
  ],
  templateUrl: './page-header.component.html'
})
export class PageHeaderComponent {
  @HostBinding('class') class = 'app-page-header';
  @Input() title = 'ZBL Industries';
  @Input() subtitle?: string;

  private _userName = 'Thibault Cettier';

  @Input()
  set userName(value: string) {
    this._userName = value ?? '';
  }

  get userName(): string {
    return this._userName;
  }

  get userInitials(): string {
    return this.computeInitials(this._userName);
  }

  private readonly layoutBreakpointObserverService = inject(UikLayoutBreakpointObserverService);
  private readonly sidenavService = inject(UikSidenavService);

  layoutMatchesSmallViewport = toSignal(this.layoutBreakpointObserverService.matchesSmallViewport$);

  private computeInitials(name: string): string {
    if (!name) {
      return '';
    }
    const parts = name.trim().split(/\s+/);
    const first = parts[0]?.[0] ?? '';
    const last = parts.length > 1 ? parts[parts.length - 1][0] ?? '' : '';
    return `${first}${last}`.toUpperCase();
  }

  toggleSidenav() {
    this.sidenavService.toggleSidenav();
  }
}
