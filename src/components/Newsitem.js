import React, { Component } from "react";

export class Newsitem extends Component {

  render() {
    let {title,desc,imageurl,newsurl,authour,time,sources}=this.props;
    return (
      <div>
        <div className="card" style={{width:'18rem',height:'500px'}}>
          <img src={imageurl} className="card-img-top" alt="..." style={{height:'200px'}}/>
          <div className="card-body"><h5>{title} <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
    {sources.slice(0,20)}
    
  </span></h5>
            <p className="card-text">
              {desc}
            </p>
            <p className="card-text"><small className="text-body-secondary">By {authour} on {new Date(time).toTimeString()}</small></p>
            <a href={newsurl} target="_blank" rel="noreferrer"className="btn-sm btn btn-primary">
              Read more
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Newsitem;
