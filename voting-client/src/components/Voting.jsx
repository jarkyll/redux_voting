import React from 'react';

export default React.createClass({
  getPair: function() {
    return this.props.pair || [];
  },
  render: function() {
    return <div className="voting">
      {this.getPair().map(entry =>
        <button key={entry}>
          <h2>{entry}</h2>
        </button>
      )}
    </div>;
  }
});
/* this has a property called pair where it contains
 the name of each of the entries */
