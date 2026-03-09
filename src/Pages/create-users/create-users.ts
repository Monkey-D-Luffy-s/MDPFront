import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

interface ApiResponse {
  isSuccess: boolean;
  data?: any;
  message?: string;
}

@Component({
  selector: 'app-create-users',
  standalone:true,
  imports: [FormsModule, CommonModule],
  templateUrl: './create-users.html',
  styles: ``,
})
export class CreateUsers {
users: any[] = [];
  roles: any[] = [];

  userId: string = '';
  roleId: string = '';
response:any;
  constructor(private http: HttpClient,private toastr: ToastrService) {}

  ngOnInit(): void {
    this.loadDropdownData();
  }

  loadDropdownData() {

    this.http.get<any>('https://localhost:7016/api/admin/users')
      .subscribe(res => {

        this.users = res.data?.users;
        this.roles = res.data?.roles;

      });
    
      console.log(this.users);
      console.log(this.roles);
  }

  save() {

    const payload = {
      Email: this.userId,
      Role: this.roleId
    };

    this.http.post<ApiResponse>('https://localhost:7016/api/admin/assingrole', payload)
      .subscribe(res => {
        console.log("Saved", res);
        if(res && res?.isSuccess) {
          this.toastr.success(res?.message );
        } else {
          this?.toastr.error(res?.message);
        }
      });

      console.log(this.response);
  }
}
