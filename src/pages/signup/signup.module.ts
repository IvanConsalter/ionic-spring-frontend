import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SignupPage } from './signup';
import { ComponentsModule } from '../../components/components.module';
import { ErrorMessagesComponent } from '../../components/error-messages/error-messages';

@NgModule({
  declarations: [
    SignupPage,
  ],
  imports: [
    IonicPageModule.forChild(SignupPage),

    ComponentsModule
  ],
})
export class SignupPageModule {}
