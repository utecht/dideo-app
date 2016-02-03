import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from 'angular2/router';
import {HTTP_PROVIDERS} from 'angular2/http';
import {QuestionnaireComponent} from './questionnaire.component';
import {AboutComponent} from './about.component';
import {UserComponent} from './user.component';
import {LoginComponent} from './login.component';
import {UserService} from './user.service';


@Component({
    selector: 'cafe-app',
    templateUrl: 'templates/app.html',
    styleUrls: ['css/app.css'],
    directives: [ROUTER_DIRECTIVES],
    providers: [ROUTER_PROVIDERS, HTTP_PROVIDERS, UserService]

})

@RouteConfig([
    {path: '/about', name: 'About', component: AboutComponent, useAsDefault: true},
    {path: '/user', name: 'User', component: UserComponent},
    {path: '/login', name: 'Login', component: LoginComponent},
    {path: '/questionnaire', name: 'Questionnaire', component: QuestionnaireComponent}
])

export class AppComponent { }
