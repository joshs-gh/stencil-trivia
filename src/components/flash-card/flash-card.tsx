import { Component, h, Prop, State } from '@stencil/core';
import Autolinker from 'autolinker';

@Component({
  tag: 'flash-card',
  styleUrl: 'flash-card.css',
  shadow: true,
})
export class FlashCard {
  @Prop() question: string;
  @Prop() answer: string;
  @State() frontSide: boolean = true;

  private cardText: HTMLElement;
  private flip = () => {
    this.frontSide = !this.frontSide;
    this.frontSide ? (this.cardText.innerHTML = 'Q: ' + Autolinker.link(this.question)) : (this.cardText.innerHTML = 'A: ' + Autolinker.link(this.answer));
  };

  render() {
    return (
      <div class="card" onClick={this.flip}>
        <span ref={e => (this.cardText = e as HTMLElement)}>{'Q: ' + Autolinker.link(this.question)}</span>
      </div>
    );
  }
}
