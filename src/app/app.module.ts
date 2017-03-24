import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { AppComponent }       from './app.component';
import { HttpModule }    from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { routing,
         appRoutingProviders } from './app.routing';
import {QuestionnaireComponent} from './questionnaire.component';
import {AboutComponent} from './about.component';
import {UserComponent} from './user.component';
import {LoginComponent} from './login.component';
// Until useAsDefault: true has returned
import {NotFoundComponent} from './notfound.component';
import { CategoryComponent } from './category.component';
import { CategoryAssayComponent } from './category-assay.component';
import { CategoryDrugComponent } from './category-drug.component';
import { QuestionComponent } from './question.component';
import { QuestionDrugComponent } from './question-drug.component';
import { QuestionAssayComponent } from './question-assay.component';
import { DefinitionPipe } from './definition.pipe';
import { UserService } from './user.service';
import { QuestionService } from './question.service';
import { DefinitionService } from './definition.service';
import { ChebiService } from './chebi.service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    routing,
  ],
  declarations: [
    QuestionComponent,
    QuestionAssayComponent,
    QuestionDrugComponent,
    CategoryComponent,
    CategoryDrugComponent,
    CategoryAssayComponent,
    QuestionnaireComponent,
    AboutComponent,
    UserComponent,
    LoginComponent,
    NotFoundComponent,
    AppComponent,
    DefinitionPipe,
  ],
  providers: [
    appRoutingProviders,
    UserService,
    QuestionService,
    DefinitionService,
    ChebiService,
  ],
  bootstrap: [ AppComponent ]
})

export class AppModule { }
