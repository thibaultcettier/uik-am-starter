import {Component, HostBinding, inject, Input} from '@angular/core';
import {MatSidenavModule} from "@angular/material/sidenav";
import {UikAmModule, UikLayoutBreakpointObserverService, UikSidenavService} from "@visiativ/uik-am";
import {MatIcon} from "@angular/material/icon";
import {MatBadgeModule} from '@angular/material/badge';
import {MatToolbar} from '@angular/material/toolbar';
import {MatIconButton} from '@angular/material/button';
import {toSignal} from '@angular/core/rxjs-interop';
import {CartService} from '../../services/cart.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-page-header',
  imports: [
    MatSidenavModule,
    UikAmModule,
    MatIcon,
    MatToolbar,
    MatBadgeModule,
    MatIconButton,
  ],
  templateUrl: './page-header.component.html'
})
export class PageHeaderComponent {
  @HostBinding('class') class = 'app-page-header';
  @Input() title = 'ZBL Industries';
  @Input() subtitle?: string;
  @Input() userName = 'Thibault Cettier';

  private readonly layoutBreakpointObserverService = inject(UikLayoutBreakpointObserverService);
  private readonly sidenavService = inject(UikSidenavService);
  private readonly cartService = inject(CartService);
  private readonly router = inject(Router);

  layoutMatchesSmallViewport = toSignal(this.layoutBreakpointObserverService.matchesSmallViewport$);
  cartCount = this.cartService.totalCount;

  toggleSidenav() {
    this.sidenavService.toggleSidenav();
  }

  navigateToCart() {
    this.router.navigate(['/basket']);
  }
}
