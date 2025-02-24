import { Component, OnInit } from '@angular/core';
declare var Skype : any;

@Component({
    selector: 'personal-details',
    template: `  
  <div class="row personal">
    <div class="col-10 col-lg-8 second order-lg-3">
      <h5>Alberto De Natale</h5>
    </div>
    <div class="col-2 col-lg-1 second order-lg-3">
      <darkmodetoggle></darkmodetoggle>
    </div>
    <div class="d-none d-lg-block col-6 col-lg-3 first order-lg-0">
      <h5>Personal Information</h5>
    </div>
    <div class="col-12 col-lg-9 offset-lg-3 order-lg-3 col second jupiter">
      <span class="trait"><i class="fa fa-skype" aria-hidden="true"></i><a href="javascript://" (click)="openSkype()">alberto.denatale</a></span>
      <span class="trait"><i class="fa fa-envelope-o" aria-hidden="true"></i><a href="mailto:alberto.denatale@outlook.com">alberto.denatale&#64;outlook.com</a></span>
      <span class="trait"><i class="fa fa-linkedin" aria-hidden="true"></i><a target="_blank" href="https://www.linkedin.com/in/alberto-de-natale/">LinkedIn</a></span>
      <span class="trait"><i class="fa fa-github" aria-hidden="true"></i><a target="_blank" href="https://github.com/albertodenatale/my-angular-website">GitHub</a></span>
      <span class="trait"><i class="fa fa-stack-overflow" aria-hidden="true"></i><a target="_blank" href="https://stackexchange.com/users/3578609/alberto">Stack Overflow</a></span>
      <span class="trait"><i class="fa fa-windows" aria-hidden="true"></i><a target="_blank" href="https://docs.microsoft.com/en-us/users/albertodenatale/">Microsoft Learn</a></span>
      <div id="SkypeButton_Call_alberto.denatale_1" style="display:none"></div>
    </div>
  </div>`,
    standalone: false
})
export class PersonalDetailsComponent {

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
      var link = skypeElement.getElementsByTagName('a');
      link[0].click();
      //skypeElement.parentNode.removeChild(skypeElement);
    }
  }

}
