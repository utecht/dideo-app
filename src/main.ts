import './polyfills.ts';
import 'rxjs/Rx';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { AppModule } from './app/';

platformBrowserDynamic().bootstrapModule(AppModule);
