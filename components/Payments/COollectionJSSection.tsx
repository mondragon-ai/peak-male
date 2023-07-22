import React from 'react';

export default class CollectJSSection extends React.Component {
  // Created the 3 divs for the CollectJS iframes
  render() {
    return (
      <React.Fragment>
        <div id="ccnumber" style={{marginBottom: "0.5rem"}} />
        <div id="ccexp" style={{marginBottom: "0.5rem"}}  />
        <div id="cvv" style={{marginBottom: "0.5rem"}}  />
      </React.Fragment>
    );
  }
}
