import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-comfirm',
  templateUrl: './delete-comfirm.component.html',
  styleUrls: ['./delete-comfirm.component.scss']
})
export class DeleteComfirmComponent implements OnInit {


  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void { }



}
