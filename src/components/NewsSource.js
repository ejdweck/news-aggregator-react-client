import React, { Component } from 'react';
import { Grid, Row, Col, Button, Panel, Image } from 'react-bootstrap';
import './NewsSource.css'

class NewsSource extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      fox: [],
      cnn: [],
      nytimes: [],
      wsj: [],
    };
  }

  componentDidMount() {
    // call news api
    const urlData = {
      country: 'us',
      apiKey: 'c477fa4aa1474688a99cb5392449a6fd',
      sources: 'fox-news, cnn, the-new-york-times, the-wall-street-journal'
    }
    const headers = {
      Accept: 'application/json',
    }
    fetch(`https://newsapi.org/v2/top-headlines?sources=${encodeURIComponent(urlData.sources)}&apiKey=${encodeURIComponent(urlData.apiKey)}`, {
      method: "GET",
      headers: headers,   
    })
      .then((response) => response.json())
      // set state with data
      .then((responseJson) => {
        let i;
        let foxArticles = [];
        let cnnArticles = [];
        let nytimesArticles = [];
        let wsjArticles = [];
        console.log(JSON.stringify(responseJson))
        for (i = 0; i < responseJson.articles.length; i++) {
          if (responseJson.articles[i].source.id === 'fox-news') {
            console.log(responseJson.articles[i].source.id);
            foxArticles.push(responseJson.articles[i]);
          } else if (responseJson.articles[i].source.id === 'cnn') {
            console.log(responseJson.articles[i].source.id);
            cnnArticles.push(responseJson.articles[i]);
          } else if (responseJson.articles[i].source.id === 'the-new-york-times') {
            console.log(responseJson.articles[i].source.id);
            nytimesArticles.push(responseJson.articles[i]);
          } else if (responseJson.articles[i].source.id === 'the-wall-street-journal') {
            console.log(responseJson.articles[i].source.id);
            wsjArticles.push(responseJson.articles[i]);
          }
        }
        this.setState({
          fox: foxArticles,
          cnn: cnnArticles,
          nytimes: nytimesArticles,
          wsj: wsjArticles,
        })
      }); 
  }

  render() {
    const cnnArticles = this.state.cnn.map((article) => 
      <Panel className="newsStory" bsStyle="primary" key={article.url}>
        <Panel.Heading>
          <Panel.Title componentClass="h3">{article.title}</Panel.Title>
        </Panel.Heading>
        <Row>
          <Image className="images" src={article.urlToImage} rounded />
          <Panel.Body>{article.description}</Panel.Body>
        </Row>
      </Panel>
    );
    const foxArticles = this.state.fox.map((article) =>
      <Panel className="newsStory" bsStyle="danger" key={article.url}>
        <Panel.Heading>
          <Panel.Title componentClass="h3">{article.title}</Panel.Title>
        </Panel.Heading>
        <Row>
          <Image className="images" src={article.urlToImage} rounded />
          <Panel.Body>{article.description}</Panel.Body>
        </Row>
      </Panel>
    );
    const nytimesArticles = this.state.nytimes.map((article) =>
      <Panel className="newsStory" bsStyle="info" key={article.url}>
        <Panel.Heading>
          <Panel.Title componentClass="h3">{article.title}</Panel.Title>
        </Panel.Heading>
        <Row>
          <Image className="images" src={article.urlToImage} rounded />
          <Panel.Body>{article.description}</Panel.Body>
        </Row>
      </Panel>
    );
    const wsjArticles = this.state.wsj.map((article) =>
      <Panel className="newsStory" bsStyle="warning" key={article.url}>
        <Panel.Heading>
          <Panel.Title componentClass="h3">{article.title}</Panel.Title>
        </Panel.Heading>
        <Row>
          <Image className="images" src={article.urlToImage} rounded />
          <Panel.Body>{article.description}</Panel.Body>
        </Row>
      </Panel>
    );
    return (
      <div >
        <Grid className="container">
          <Col md={3}>
            {cnnArticles}
          </Col>
          <Col md={3}>
            {foxArticles}
          </Col>
          <Col md={3}>
            {nytimesArticles}
          </Col>
          <Col md={3}>
            {wsjArticles}
          </Col>
        </Grid>
      </div>
    );
  }
}

export default NewsSource;
