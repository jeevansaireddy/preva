import { ConditionalExpr } from '@angular/compiler';
import { Component, OnInit,Input } from '@angular/core';
import {SharedService} from 'src/app/shared.service';

@Component({
  selector: 'app-add-edit-dep',
  templateUrl: './add-edit-dep.component.html',
  styleUrls: ['./add-edit-dep.component.css']
})
export class AddEditDepComponent implements OnInit {
 
 
  constructor(private service:SharedService) {}

  @Input() dep:any; 
  DepartmentId:any=0;
  DepartmentName:string="";
  a:any;
  b:any;
  c: any;
  d:any;
  DepartmentSec:any;
  ngOnInit(): void {
    this.DepartmentId=this.dep.DepartmentId;
    this.DepartmentName=this.dep.DepartmentName;
    this.a = this.dep.a;
    this.b = this.dep.b;
    this.c = this.dep.c;
    this.d = this.dep.d;
    this.DepartmentSec = this.dep.DepartmentSec;
    
  }

  addDepartment(){
    var val = {
                DepartmentId:this.DepartmentId,
                DepartmentName:this.DepartmentName,
                a: (this.a!=undefined)?this.a:false,
                b: (this.b!=undefined)?this.a:false,
                c: (this.c!=undefined)?this.c:false,
                d: (this.d!=undefined)?this.d:false,
                DepartmentSec:this.DepartmentSec
              };
              
              JSON.stringify(val);
    this.service.addDepartment(val).subscribe(res=>{
      alert(res.toString());
    });

  }

  updateDepartment(){
    var val = {DepartmentId:this.DepartmentId,
      DepartmentName:this.DepartmentName};
    this.service.updateDepartment(val).subscribe(res=>{
    alert(res.toString());
    });
  }

}