import { Component, h, Prop, State } from '@stencil/core';

@Component({
  tag: 'trivia-loader',
  styleUrl: 'trivia-loader.css',
  shadow: true,
})
export class TriviaLoader {
  @Prop() gsheeturl: string; // published GSheet w/ ?alt=json like https://spreadsheets.google.com/feeds/cells/1uu8QEql61g8XKA2_U-ELpkhQNGNaYvqSvA5tsbBK3QQ/1/public/values?alt=json
  @State() gsheet: any;

  // https://bost.ocks.org/mike/shuffle/
  private shuffle(array) {
    var m = array.length,
      t,
      i;
    while (m) {
      i = Math.floor(Math.random() * m--);
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }
    return array;
  }

  async componentWillLoad() {
    await fetch(this.gsheeturl)
      .then(async res => await res.text())
      .then(async data => await (this.gsheet = JSON.parse(data)));
    this.gsheet = this.gsheet.feed.entry;
  }

  render() {
    const cards = [];
    for (let i = 2; i < this.gsheet.length; i += 2) {
      cards.push(<flash-card question={this.gsheet[i].content.$t} answer={this.gsheet[i + 1].content.$t}></flash-card>);
    }
    return <div>{this.shuffle(cards)}</div>;
  }
}
