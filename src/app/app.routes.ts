import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { TopNavLayoutComponent } from './components/top-nav-layout/top-nav-layout.component';
import { HomeContentComponent } from './components/home-content/home-content.component';
import { LearnMoreComponent } from './components/learn-more/learn-more.component';
import { AboutComponent } from './components/about/about.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { RequestDemoComponent } from './components/request-demo/request-demo.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    // {
    //     path: 'home',
    //     component: HomeComponent,
    // },
    {
        path:'home',
        component: TopNavLayoutComponent,
        children: [
            {
                path: '',
                component: HomeContentComponent
            }
        ]
    },
    {
        path:'learn-more',
        component: TopNavLayoutComponent,
        children: [
            {
                path: '',
                component: LearnMoreComponent
            }
        ]
    }, 
    {
        path:'about',
        component: TopNavLayoutComponent,
        children: [
            {
                path: '',
                component: AboutComponent
            }
        ]
    }, 
    {
        path:'contact-us',
        component: TopNavLayoutComponent,
        children: [
            {
                path: '',
                component: ContactUsComponent
            }
        ]
    }, 
    {
        path:'request-demo',
        component: TopNavLayoutComponent,
        children: [
            {
                path: '',
                component: RequestDemoComponent
            }
        ]
    }
];
