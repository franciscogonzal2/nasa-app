import React, {Component} from 'react'
const APIKEY = 'K0iQJIhN0SuX3y2Bxvb3yHlhhH9YjREpVYFmu9Tl'

export class SearchForm extends Component{
    state = {
     inputlatlong: '',
     results:'',
     error:false,
    }
    handleChange = (e) => {
        this.setState({inputlatlong: e.target.value})
    }
    hanleSubmit = (e) =>{
        e.preventDefault()
        const {inputlatlong} = this.state
        const res = inputlatlong.split("/");
        const lat =  res[0];
        const long = res[1];
        fetch(`https://api.nasa.gov/planetary/earth/imagery?lon=${long}&lat=${lat}&api_key=${APIKEY}`)
        .then(res => res.blob())
        .then(results => {
            const outside = URL.createObjectURL(results)
            console.log(outside)
            if(results.type === "image/png"){
            this.setState({
                results:outside
            })
        } else {
            this.setState({
                results:'no Info',
                error:true
            })
        }
        }
        )
    }
    newSearch = () =>{
     this.setState({
            results:'',
        })
    }
    renderResults(){
        const {results, error} = this.state
        return( 
            !error?
            <div>
            <div>
                <img style={{width:"40%" }} src={results} alt="lon and lat"/>
            </div>
            <button className="button is-info" onClick={this.newSearch}>
                New Search
            </button>
            </div>
            :
            <div>
            <div>
             We do not have register for this Location
            </div>
            <div>
            <button className="button is-info" onClick={this.newSearch}>
                New Search
            </button>
            </div>
            </div>
        )
    }

    render () {
        const {results} = this.state
        return (
            results ? 
            this.renderResults() 
            :
            <form onSubmit={this.hanleSubmit}>
            <div className="field has-addons">
            <div className="control">
              <input 
              className="input" 
              type="text" 
              placeholder="lon/lat"
              onChange={this.handleChange}
               />
            </div>
            <div className="control">
              <button className="button is-info">
                Search
              </button>
            </div>
          </div>
          </form>   
        )
    }
}
