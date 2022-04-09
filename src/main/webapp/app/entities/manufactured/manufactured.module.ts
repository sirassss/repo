import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { ManufacturedComponent } from './list/manufactured.component';
import { ManufacturedDetailComponent } from './detail/manufactured-detail.component';
import { ManufacturedUpdateComponent } from './update/manufactured-update.component';
import { ManufacturedDeleteDialogComponent } from './delete/manufactured-delete-dialog.component';
import { ManufacturedRoutingModule } from './route/manufactured-routing.module';

@NgModule({
  imports: [SharedModule, ManufacturedRoutingModule],
  declarations: [ManufacturedComponent, ManufacturedDetailComponent, ManufacturedUpdateComponent, ManufacturedDeleteDialogComponent],
  entryComponents: [ManufacturedDeleteDialogComponent],
})
export class ManufacturedModule {}
