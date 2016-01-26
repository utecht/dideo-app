import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from 'angular2/router';
import {SurveyComponent} from './survey.component';
import {AboutComponent} from './about.component';

@Component({
    selector: 'cafe-app',
    templateUrl: 'templates/app.html',
    styleUrls: ['css/app.component.css'],
    directives: [ROUTER_DIRECTIVES],
    providers: [ROUTER_PROVIDERS]

})

@RouteConfig([
    {path: '/about', name: 'About', component: AboutComponent, useAsDefault: true},
    {path: '/survey', name: 'Survey', component: SurveyComponent}
])

export class AppComponent { }
