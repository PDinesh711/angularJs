import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-mainframe',
  templateUrl: './mainframe.component.html',
  styleUrls: ['./mainframe.component.css']
})
export class MainframeComponent {

  BankAccountArray :Array<any>=[];

  AccountName!:string;
  AccountNumber!:number;
  IFSCCode!:string;
  AccountType!:string;
  BranchLocation!:string;

  // {
  //   "accountId": 3,
  //   "accountHolderName": "Dinesh",
  //   "accountNumber": 211519,
  //   "accountType": "saving",
  //   "ifscCode": "ubi7456",
  //   "branchLocation": "uthukottai"
  // },

  // url 
  
  baseUrl:string="https://localhost:7087/api/bankAccount";
  constructor(public http:HttpClient){
    this.getBankAccounts();
  }

  getBankAccounts(){
  this.http.get<any>(`${this.baseUrl}/getAll`).subscribe((data)=>{
    console.log(data);
    this.BankAccountArray=data;
  })
  }

save(){
  let postBody={
      "accountHolderName": this.AccountName,
      "accountNumber": this.AccountNumber,
      "accountType": this.AccountType,
      "ifscCode": this.IFSCCode,
      "branchLocation": this.BranchLocation
  }

  return this.http.post<any>(`${this.baseUrl}/save`,postBody,{responseType:'json'}).subscribe((data)=>{
    console.log(data);
    this.getBankAccounts();
    this.AccountName="";
    this.AccountNumber=0;
    this.AccountType="";
    this.IFSCCode="";
    this.BranchLocation="";
  })

}
edit(update:any){
  let putBody={
    "accountHolderName": this.AccountName,
    "accountNumber": this.AccountNumber,
    "accountType": this.AccountType,
    "ifscCode": this.IFSCCode,
    "branchLocation": this.BranchLocation
}

 return this.http.put<any>(`${this.baseUrl}/update/${update.accountId}`,putBody,{responseType:'json'}).subscribe((data)=>{
    console.log(data);
    this.getBankAccounts();
    this.AccountName="";
    this.AccountNumber=0;
    this.AccountType="";
    this.IFSCCode="";
    this.BranchLocation="";
  })

}
remove(clear:any){
return this.http.delete<any>(`${this.baseUrl}/delete/${clear.accountId}`,{responseType:'json'}).subscribe((data)=>{
  console.log(data);
  console.error();
  this.getBankAccounts();
})
}


}
