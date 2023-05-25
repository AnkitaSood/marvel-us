import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card-container">
      <div class="card">
        <img src="http://via.placeholder.com/640x360" alt="Image 1">
        <h3>Card 1</h3>
        <p>Description 1</p>
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        .card-container {
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
        }

        .card {
          width: 300px;
          padding: 20px;
          border: 1px solid aliceblue;
          margin-bottom: 20px;
        }

        .card img {
          width: 100%;
          height: auto;
          margin-bottom: 10px;
        }

        .card h3 {
          font-size: 18px;
          margin-bottom: 10px;
        }

        .card p {
          font-size: 14px;
        }

      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardComponent {

}
