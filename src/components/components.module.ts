import { NgModule } from '@angular/core';
import { ErrorMessagesComponent } from './error-messages/error-messages';
import { CommonModule } from '@angular/common';

@NgModule({
	declarations: [ErrorMessagesComponent],
	imports: [CommonModule],
	exports: [ErrorMessagesComponent],
  entryComponents: [ErrorMessagesComponent]
})
export class ComponentsModule {}
