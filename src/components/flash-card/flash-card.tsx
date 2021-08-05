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
  private linkedanswer: HTMLElement;

  componentWillLoad() {
    this.question = 'Q: ' + this.question;
  }

  componentDidLoad() {
    this.linkedanswer.innerHTML = 'A: ' + Autolinker.link(this.answer);
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
                <p ref={e => (this.linkedanswer = e as HTMLElement)}>{this.answer}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
