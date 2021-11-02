import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './features/pages/homepage/homepage.component';
import { LayoutRightbarComponentsComponent } from './features/components/layout-rightbar-components/layout-rightbar-components.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from "@angular/material/toolbar";
import { LayoutHeaderComponent } from './features/components/layout-header/layout-header.component';
import { LayoutLeftbarComponent } from './features/components/layout-leftbar/layout-leftbar.component';
import { LayoutRightbarComponent } from './features/components/layout-rightbar/layout-rightbar.component';
import { MatSidenavModule } from "@angular/material/sidenav";
import { ExampleGetdesignsComponent } from './features/components/example-getdesigns/example-getdesigns.component';
import { LayoutTabComponent } from './features/components/layout-tab/layout-tab.component';
import { MatTabsModule } from "@angular/material/tabs";
import { MatIconModule } from '@angular/material/icon';
import { LayoutScreenComponent } from './features/components/layout-screen/layout-screen.component';
import { DividerComponent } from './features/components/divider/divider.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { DeleteComfirmComponent } from './features/components/delete-comfirm/delete-comfirm.component';
import { LayoutComponentSettingComponent } from './features/components/layout-component-setting/layout-component-setting.component';
import { MatChipsModule } from '@angular/material/chips';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {HttpbaseurlInterceptor} from "./core/interceptors/httpbaseurl.interceptor";
import { PreviewGridComponent } from './features/components/preview-grid/preview-grid.component';
import { GridsterModule } from 'angular-gridster2';
import { PreviewParentwidgetComponent } from './features/components/preview-parentwidget/preview-parentwidget.component';
import { PreviewTopbarComponent } from './features/components/preview-topbar/preview-topbar.component';
import {MatButtonModule} from "@angular/material/button";
import { WidgetLabelComponent } from './features/components/widget-label/widget-label.component';
import { WidgetGraphComponent } from './features/components/widget-graph/widget-graph.component';
import { PreviewUpdatedtextComponent } from './features/components/preview-updatedtext/preview-updatedtext.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {NgChartsModule} from "ng2-charts";
import { WidgetBarchartComponent } from './features/components/widget-barchart/widget-barchart.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    LayoutHeaderComponent,
    LayoutLeftbarComponent,
    LayoutRightbarComponent,
    ExampleGetdesignsComponent,
    LayoutTabComponent,
    LayoutScreenComponent,
    DividerComponent,
    DeleteComfirmComponent,
    LayoutRightbarComponentsComponent,
    LayoutComponentSettingComponent
  ],
  entryComponents: [
    DeleteComfirmComponent
    PreviewGridComponent,
    PreviewParentwidgetComponent,
    PreviewTopbarComponent,
    WidgetLabelComponent,
    WidgetGraphComponent,
    PreviewUpdatedtextComponent,
    WidgetBarchartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    GridsterModule,
    NgChartsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatTabsModule,
    MatInputModule,
    MatCheckboxModule,
    MatListModule,
    MatSelectModule,
    RouterModule,
    MatDialogModule,
    MatDividerModule,
    MatChipsModule
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpbaseurlInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
