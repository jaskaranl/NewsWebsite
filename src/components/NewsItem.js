import React, { Component } from 'react'

export class NewsItem extends Component {

    render() {
        let { description, title, imageurl, newsurl, author, date } = this.props;
        return (
            <div className="my-3"><
                div className="card" >
                <img src={!imageurl ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCEMbFWnCg1Z7GxYgkvk60mlDCP_5Pni53Kg&usqp=CAU" : imageurl} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{title}...</h5>
                    <p className="card-text">{description}...</p>
                    <p className="card-text"><small className="text-muted">By {!author ? "unknown " : author} on {new Date(date).toGMTString()} </small></p>
                    <a href={newsurl} target="_blank" className="btn btn-sm btn-dark">Read More</a>
                </div>
            </div >
            </div >
        )
    }
}

export default NewsItem 