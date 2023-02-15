import { formatDate } from "@angular/common";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn:'root'
  })
export class Global {
    loginId: string="";
      time:'h/mm a';
     day = 'dd/MM/yyyy';
     locale = 'en-US';
     timezone='+0800'
     today = (date:Date)=> {
     return formatDate(date,this.day,this.locale,this.timezone) === formatDate(new Date(),this.day,this.locale,this.timezone)
     }
}