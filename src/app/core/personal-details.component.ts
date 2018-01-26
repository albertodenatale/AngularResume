import { Component, OnInit } from '@angular/core';
declare var Skype : any 

@Component({
  selector: 'personal-details',
  template: `  
  <div class="row personal">
    <div class="col-12 col-lg-6 second push-lg-3">
      <h5>Alberto De Natale</h5>
    </div>
    <div class="hidden-md-down col-6 col-lg-6 first pull-lg-6">
      <h5>Personal Information</h5>
    </div>
    <div class="col-12 col-lg-9 push-lg-3 col second jupiter">
      <span class="trait"><i class="fa fa-skype" aria-hidden="true"></i><a href="javascript://" (click)="openSkype()">alberto.denatale</a></span>
      <span class="trait"><i class="fa fa-envelope-o" aria-hidden="true"></i><a href="mailto:berto.dena@gmail.com">berto.dena@gmail.com</a></span>
      <span class="trait"><i class="fa fa-linkedin" aria-hidden="true"></i><a target="_blank" href="https://www.linkedin.com/in/alberto-de-natale-1b990082/">www.linkedin.com/in/alberto-de-natale</a></span>
      <span class="trait"><i class="fa fa-github" aria-hidden="true"></i><a target="_blank" href="https://github.com/albertodenatale/my-angular-website">https://github.com/albertodenatale</a></span>
      <span class="trait saturn"><span class="mars">Sex</span> male | <span class="mars">Date of birth</span> 5 of December 1986
      | <span class="mars">Nationality</span> Italian | <span class="mars">Resident In</span> Poole, UK</span>
      <div id="SkypeButton_Call_alberto.denatale_1" style="display:none"></div>
    </div>
  </div>`
})
export class PersonalDetailsComponent {

  constructor() { }

  ngAfterViewInit() {
    // var skypeScript = `
    //   <div id="SkypeButton_Call_alberto.denatale_1">
    //   </script>
    //   </div>
    // `
    // const fragment = document.createRange().createContextualFragment(skypeScript);
    // var saturns = document.getElementsByClassName("saturn");
    // var jupiters = document.getElementsByClassName("jupiter");

    // if(jupiters.length && saturns.length){
    //   jupiters[0].insertBefore(fragment, saturns[0]);
    // }
    Skype.ui({
      "name": "call",
      "element": "SkypeButton_Call_alberto.denatale_1",
      "participants": ["alberto.denatale"]
      });
  }

  openSkype(){
    
    var skypeElement = document.getElementById("SkypeButton_Call_alberto.denatale_1");
    if(skypeElement){
      debugger;
      var link = skypeElement.getElementsByTagName('a');
      link[0].click();
      //skypeElement.parentNode.removeChild(skypeElement);
    }
  }

}
