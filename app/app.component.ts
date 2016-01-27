import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from 'angular2/router';
import {SurveyComponent} from './survey.component';
import {AboutComponent} from './about.component';
import {UserComponent} from './user.component';
import {UserService} from './user.service';


@Component({
    selector: 'cafe-app',
    templateUrl: 'templates/app.html',
    styleUrls: ['css/app.component.css'],
    directives: [ROUTER_DIRECTIVES],
    providers: [ROUTER_PROVIDERS, UserService]

})

@RouteConfig([
    {path: '/about', name: 'About', component: AboutComponent, useAsDefault: true},
    {path: '/user', name: 'User', component: UserComponent},
    {path: '/survey', name: 'Survey', component: SurveyComponent}
])

export class AppComponent { }
