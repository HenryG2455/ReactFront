import React, { Component } from 'react';

class Search extends Component {
  state = {
    query: '',
    result: [],
    page: 1
  };

  getInfo = async () => {
    fetch(
      'http://localhost:4001/search?name=' +
        this.state.query +
        '&page=' +
        this.state.page,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          throw Error(res.statusText);
        }
      })
      .then(json => {
        this.setState({
          result: json.result
        });
      });
  };

  handlePageUp = () => {
    this.setState({
      page: this.state.page + 1
    });
    this.handleInputChange();
  };

  handlePageDown = () => {
    if (this.state.page !== 1) {
      this.setState({
        page: this.state.page - 1
      });
      this.handleInputChange();
    } else {
      this.handleInputChange();
    }
  };

  handleInputChange = () => {
    this.setState(
      {
        query: this.search.value
      },
      () => {
        if (this.state.query && this.state.query.length > 0) {
          this.getInfo();
          console.log('CHANGED INPUT');
        } else if (!this.state.query) {
        }
      }
    );
  };

  render() {
    const theresult = this.state.result;

    return (
      <form>
        <input
          placeholder="Search for..."
          ref={input => (this.search = input)}
          onChange={this.handleInputChange}
        />
        <button type="button" onClick={this.handlePageDown}>
          Prev
        </button>
        <button type="button" onClick={this.handlePageUp}>
          Next
        </button>
        <div>
          {theresult.map(model => (
            <div key={model.id}>
              <li>
                {model.name} &nbsp; ID:{model.id}
              </li>
            </div>
          ))}
        </div>
      </form>
    );
  }
}

export default Search;
