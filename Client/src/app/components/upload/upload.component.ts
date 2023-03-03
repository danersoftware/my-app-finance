import { Component, Input } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { ToastrService } from 'ngx-toastr';
const URL = 'http://localhost:8080/api/upload';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css'],
})
export class UploadComponent {
  public uploader: FileUploader = new FileUploader({
    url: URL,
    parametersBeforeFiles: true,
    itemAlias: 'image',
    additionalParameter: {
      billNumber: localStorage.getItem('billNumber'),
    },
  });
  constructor(private toastr: ToastrService) {}
  ngOnInit() {
    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };
    this.uploader.onCompleteItem = (item: any, status: any) => {
      console.log('Uploaded File Details:', item);
      this.toastr.success('File successfully uploaded!');
    };
  }
}
