import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from 'angular2/router';
import {SurveyComponent} from './survey.component';

@Component({
    selector: 'cafe-app',
    templateUrl: 'templates/app.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [ROUTER_PROVIDERS]

})

@RouteConfig([
    {path: '/survey', name: 'Survey', component: SurveyComponent, useAsDefault: true}
])

export class AppComponent { }
