import { Component, h, Prop, State } from '@stencil/core';

@Component({
  tag: 'trivia-loader',
  styleUrl: 'trivia-loader.css',
  shadow: true,
})
export class TriviaLoader {
  @Prop() gsheeturl: string;
  @State() gsheet: any;

  async componentWillLoad() {
    await fetch(this.gsheeturl)
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
