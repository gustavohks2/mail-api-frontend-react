import React, {Component} from 'react';
import spinner from '../img/spinner.gif';

export default class Spinner extends Component {

   constructor() {
      super();
      this.state = {
         didLoad: false
      }
   }

   onLoad() {
      this.setState({
         didLoad: true
      });
   }

   render() {
      const showIfIsLoaded = this.state.didLoad ? {} : { display: "none" };
      return (
         <img style={showIfIsLoaded} src={spinner} className="spinner" alt="Spinner indicating loading of content" onLoad={this.onLoad.bind(this)}/>
      );
   }
}