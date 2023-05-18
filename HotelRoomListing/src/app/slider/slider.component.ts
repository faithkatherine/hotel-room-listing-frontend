import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent {

  @Input() contentData: any[] = [];
  @Input() routerLink!:string;

  constructor() { }


  encodeUrl(url:string) : string{
    return url.replace(/ /g, "%20");
}

sliderConfig = {
  "slidesToShow": 6,
  "slidesToScroll": 6,
  arrows: true,
  dots: false,
  infinite: false,
  centerMode: false,
  responsive: [
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 6,
        slidesToScroll: 6
      }
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 4,
        slidesToScroll:4
      }
    },
    {
      breakpoint: 576,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3
      }
    },
    {
      breakpoint: 320,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2
      }
    }
  ]

};

}
