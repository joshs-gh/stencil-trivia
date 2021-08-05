import { Component, h, State } from '@stencil/core';

@Component({
  tag: 'trivia-loader',
  styleUrl: 'trivia-loader.css',
  shadow: true,
})
export class TriviaLoader {
  @State() gsheet: any;

  async componentWillLoad() {
    await fetch('https://spreadsheets.google.com/feeds/cells/1uu8QEql61g8XKA2_U-ELpkhQNGNaYvqSvA5tsbBK3QQ/1/public/values?alt=json')
      .then(async res => await res.text())
      .then(async data => await (this.gsheet = JSON.parse(data)));
    this.gsheet = this.gsheet.feed.entry;
    console.log(this.gsheet);
  }

  render() {
    const cards = [];
    for (let i = 2; i < this.gsheet.length; i += 2) {
      cards.push(<flash-card question={this.gsheet[i].content.$t} answer={this.gsheet[i + 1].content.$t}></flash-card>);
    }
    return <div>{cards}</div>;
  }
}
