import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { FormsModule } from '@angular/forms';

// Material UI
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatTabsModule } from "@angular/material/tabs";
import { MatDividerModule } from "@angular/material/divider";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { MatChipsModule } from "@angular/material/chips";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatInputModule } from "@angular/material/input";
import { MatDialogModule } from "@angular/material/dialog";
import { MatListModule } from '@angular/material/list';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatGridListModule } from '@angular/material/grid-list';

// Other externally imported Libraries
import { GridsterModule } from 'angular-gridster2'

// Self-made Util classes (REST, interceptors etc)
import { HttpbaseurlInterceptor } from "./core/interceptors/httpbaseurl.interceptor";

// Self-made pages
import { AppComponent } from './app.component';
import { HomepageComponent } from './features/pages/homepage/homepage.component';

// Self-made components
import { DeleteComfirmComponent } from "./features/components/delete-comfirm/delete-comfirm.component";
import { LayoutHeaderComponent } from './features/components/layout-header/layout-header.component';
import { LayoutLeftbarComponent } from './features/components/layout-leftbar/layout-leftbar.component';
import { LayoutRightbarComponent } from './features/components/layout-rightbar/layout-rightbar.component';
import { LayoutRightbarComponentsComponent } from "./features/components/layout-rightbar-components/layout-rightbar-components.component";
import { LayoutTabComponent } from "./features/components/layout-tab/layout-tab.component";
import { LayoutComponentSettingComponent } from "./features/components/layout-component-setting/layout-component-setting.component";
import { LayoutScreenComponent } from "./features/components/layout-screen/layout-screen.component";
import { ExampleGetdesignsComponent } from './features/components/example-getdesigns/example-getdesigns.component';
import { PreviewGridComponent } from './features/components/preview-grid/preview-grid.component';
import { PreviewParentwidgetComponent } from './features/components/preview-parentwidget/preview-parentwidget.component';
import { PreviewTopbarComponent } from './features/components/preview-topbar/preview-topbar.component';
import { PreviewUpdatedtextComponent } from './features/components/preview-updatedtext/preview-updatedtext.component';
import { SearchFormComponent } from './features/components/search-form/search-form.component';
import { ComponentThumbnailComponent } from './features/components/component-thumbnail/component-thumbnail.component';

// Lit Components
import './features/litelements/vd-label/vd-label.component'
import './features/litelements/vd-graph/vd-graph.component';
import './features/litelements/vd-barchart/vd-barchart.component';



/* -------------------------------------------------------------- */

// @ts-ignore
@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    LayoutHeaderComponent,
    LayoutLeftbarComponent,
    LayoutRightbarComponent,
    ExampleGetdesignsComponent,
    SearchFormComponent,
    ComponentThumbnailComponent,
    PreviewGridComponent,
    PreviewParentwidgetComponent,
    PreviewTopbarComponent,
    PreviewUpdatedtextComponent,
    LayoutTabComponent,
    LayoutRightbarComponentsComponent,
    LayoutComponentSettingComponent,
    LayoutScreenComponent,
    DeleteComfirmComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    GridsterModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    MatDividerModule,
    MatFormFieldModule,
    MatSelectModule,
    MatChipsModule,
    MatCheckboxModule,
    MatInputModule,
    MatDialogModule,
    FormsModule,
    DragDropModule,
    MatGridListModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpbaseurlInterceptor, multi: true },
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})

export class AppModule { }
