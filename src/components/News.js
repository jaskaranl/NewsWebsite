import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


export default class News extends Component {
    static defaultProps = {
        country: 'in',
        pageSize: 8,
        category: 'general'
    }
    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }
    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    constructor(props) {
        super(props);

        this.state = {
            articles: [],
            loading: true,
            page: 1,
            totalResults: 0,

        }
        document.title = `${this.capitalizeFirstLetter(this.props.category)}-NewsMonkey`

    }
    updateNews = async () => {
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=aaefd60d690a46b686d067ae9ee8f047&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({
            loading: true,
        })
        let data = await fetch(url);
        let parsedData = await data.json();

        this.setState({

            articles: parsedData.articles,
            loading: false,
        })


    }

    async componentDidMount() {
        this.updateNews();
    }
    handleNextClick = async () => {
        if (this.state.page > Math.ceil(this.state.totalResults / this.props.pageSize)) {
            // console.log(this.state.page + 1);
        }
        else {
            // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=aaefd60d690a46b686d067ae9ee8f047&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
            // this.setState({
            //     loading: true,
            // })
            // let data = await fetch(url);
            // let parsedData = await data.json();

            // //console.log(parsedData);
            // this.setState({
            //     page: this.state.page + 1,
            //     articles: parsedData.articles,
            //     loading: false,

            // })
            this.setState({
                page: this.state.page + 1,
            })
        }
        //console.log(this.state.totalResults);
        this.updateNews();

        //console.log(this.state.page);

    }
    handlePrevClick = async () => {
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=aaefd60d690a46b686d067ae9ee8f047&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        // this.setState({
        //     loading: true,
        // })
        // let data = await fetch(url);
        // let parsedData = await data.json();

        // this.setState({
        //     page: this.state.page - 1,
        //     articles: parsedData.articles,
        //     loading: false,
        // })
        this.setState({
            page: this.state.page - 1,
        })
        this.updateNews();
        //console.log("previ");
    }
    fetchMoreData = async () => {
        this.setState({ page: this.state.page + 1 })
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=aaefd60d690a46b686d067ae9ee8f047&page=${this.state.page}&pageSize=${this.props.pageSize}`;

        let data = await fetch(url);
        let parsedData = await data.json();

        this.setState({

            articles: this.state.articles.concat(parsedData.articles),

        })

    }
    render() {
        return (
            <div className='container my-3'>
                <h2 className='text-center'>NewsMonkey-top headlines on {this.capitalizeFirstLetter(this.props.category)} </h2>
                {this.state.loading && <Spinner />}
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<Spinner />}
                >
                    <div className="container">

                        <div className='row'>
                            {this.state.articles.map((element) => {


                                return <div className='col-md-3' key={element.url}>
                                    <NewsItem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 80) : ""} imageurl={element.urlToImage} newsurl={element.url} author={element.author} date={element.publishedAt} />
                                </div>
                            })}
                        </div>
                    </div>
                </InfiniteScroll>

            </div>
        )
    }
}
