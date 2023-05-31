import {provideRouter, withComponentInputBinding} from "@angular/router";
import {bootstrapApplication} from "@angular/platform-browser";
import {AppComponent} from "./app/app.component";
import {routes} from './routes';

bootstrapApplication(AppComponent, {
    providers: [provideRouter(routes,withComponentInputBinding()),
    ],
}).catch((err) => console.error(err));
