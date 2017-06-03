import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'personal-details',
  template: `  
  <div class="row personal">
    <div class="col-3 first">
      <h5>Personal Information</h5>
    </div>
    <div class="col second">
      <h5>Alberto De Natale</h5>
      <span class="trait"><i class="fa fa-mobile" aria-hidden="true"></i>07742812686</span>
      <span class="trait"><i class="fa fa-skype" aria-hidden="true"></i>berto.dena@gmail.com</span>
      <span class="trait"><i class="fa fa-envelope-o" aria-hidden="true"></i>alberto.denatale</span>
      <span class="trait"><i class="fa fa-user" aria-hidden="true"></i>albertodenatale.com</span>
      <span class="foot"><span class="mars">Sex</span> male | <span class="mars">Date of birth</span> 5 of December 1986
      | <span class="mars">Nationality</span> Italian</span>
    </div>
  </div>`
})
export class PersonalDetailsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}