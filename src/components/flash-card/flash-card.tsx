import { Component, h, Prop } from '@stencil/core';
import Autolinker from 'autolinker';

@Component({
  tag: 'flash-card',
  styleUrl: 'flash-card.css',
  shadow: true,
})
export class FlashCard {
  @Prop({ mutable: true }) question: string;
  @Prop({ mutable: true }) answer: string;

  componentWillLoad() {
    this.answer = 'A: ' + this.answer; // Autolinker.link(this.answer);
    this.question = 'Q: ' + this.question;
  }

  render() {
    return (
      // https://codepen.io/nicolaspavlotsky/pen/wqGgLO
      <div class="cols">
        <div class="col">
          <div class="container">
            <div class="front">
              <div class="inner">
                <span>{this.question}</span>
              </div>
            </div>
            <div class="back">
              <div class="inner">
                <p>{this.answer}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
