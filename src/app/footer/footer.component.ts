import { Component } from '@angular/core';
import FooterJson from '../../../src/assets/Json/footer.json';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
footerData=FooterJson;
}
