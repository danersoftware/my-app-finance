import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BillComponent } from './components/bill/bill.component';
import { DetailsComponent } from './components/details/details.component';
import { TestComponent } from './components/test/test.component';
import { TestPaginationComponent } from './components/test-pagination/test-pagination.component';
import { UploadComponent } from './components/upload/upload.component';

const routes: Routes = [
  { path: '', component: BillComponent },
  { path: 'details', component: DetailsComponent },
  { path: 'test', component: TestComponent },
  { path: 'test2', component: TestPaginationComponent },
  { path: 'upload', component: UploadComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
