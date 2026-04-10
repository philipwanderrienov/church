import { Routes } from '@angular/router';
import { authGuard, guestOnlyGuard } from './services/auth.guard';
import { LoginPageComponent } from './pages/login-page.component';
import { DashboardPageComponent } from './pages/dashboard-page.component';
import { CongregationsPageComponent } from './pages/congregations-page.component';
import { FinancePageComponent } from './pages/finance-page.component';
import { OrganizationPageComponent } from './pages/organization-page.component';
import { PrayerRequestsPageComponent } from './pages/prayer-requests-page.component';
import { StatisticsPageComponent } from './pages/statistics-page.component';
import { AccountCreatePageComponent } from './pages/account-create-page.component';
import { NotFoundPageComponent } from './pages/not-found-page.component';

export const appRoutes: Routes = [
  {
    path: 'login',
    component: LoginPageComponent,
    canActivate: [guestOnlyGuard],
  },
  {
    path: '',
    canActivate: [authGuard],
    children: [
      { path: '', pathMatch: 'full', component: DashboardPageComponent },
      { path: 'congregations', component: CongregationsPageComponent },
      { path: 'finance', component: FinancePageComponent },
      { path: 'organization', component: OrganizationPageComponent },
      { path: 'prayer-requests', component: PrayerRequestsPageComponent },
      { path: 'statistics', component: StatisticsPageComponent },
      { path: 'account-create', component: AccountCreatePageComponent },
      { path: 'not-found', component: NotFoundPageComponent },
      { path: '**', redirectTo: 'not-found' },
    ],
  },
  { path: '**', redirectTo: 'not-found' },
];