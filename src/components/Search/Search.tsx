import React, { Component } from 'react'
import './Search.css';
import axios from 'axios';
import Spinner from '../Spinner/Spinner';
class Search extends Component {
  state = {
    gists: [],
    userName: '',
    loading: false,
    errorMessage: '',
  }

  formSubmitHandler = () => {
    this.setState({ loading: true })
    const searchUrl = `https://api.github.com/users/${this.state.userName}/gists`;
    const results = axios.get(searchUrl)
      .then(res => {
        let data = res.data
        this.setState({
          gists: data,
          loading: false,
        })
      })
      .catch(err => {
        this.setState({ errorMessage: "No Gists Found" })
      });

    return results

  }
  




  onInputChangeHandler = (event: any) => {
    const userName = event.target.value;
    this.setState({
      userName: userName
    })
  }

  convertFileType = (type: any) => {
    let tag = null;
    for (let key in type) {
      const fileType = key.split('.').pop();
      switch (fileType) {
        case 'txt':
          return tag = <span className="badge badge-pill badge-primary">{key}</span>;
        case 'cs':
          return tag = <span className="badge badge-pill badge-secondary">{key}</span>;
        case 'md':
          return tag = <span className="badge badge-pill badge-info">{key}</span>;
        case 'py':
          return tag = <span className="badge badge-pill badge-warning">{key}</span>;
        default:
          return null
      }
    }
    return tag
  }

  render() {

    let renderList = this.state.loading ? <Spinner /> : this.state.gists.map((item: any) => {
      return (
        <div className="d-flex panel panel-default" key={item.id}>
          <img className="image" alt='#' src={item.owner.avatar_url} />
          <div className="panel-content">
            <div className="panel-header">Username: {item.owner.login}</div>
            <div className="panel-tags"> Tag: {this.convertFileType(item.files)}</div>
            <div className="panel-description">Forks:
            {
              // show results from endpoint https://api.github.com/gists/:id/forks }
            }
            </div>
            
          </div>
        </div>
      )
    });


    return (
      <div className="container">
        <div className="form-container form-group">
          <input
            className="form-control"
            placeholder='Search Github User'
            onChange={this.onInputChangeHandler}
          />
          <button onClick={this.formSubmitHandler} className="btn btn-primary" type='submit'>Search</button>
        </div>
        <div className="form-result">
          {
            this.state.gists.length > 0 ?
              <section>
                {renderList}
              </section> : this.state.errorMessage
          }
        </div>

      </div>
    )
  }
}

export default Search
