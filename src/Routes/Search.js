import React from './node_modules/react';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import Movie from '../components/Movie';
import Button from './node_modules/@material-ui/core/Button';  
import * as services from '../services/posts'; 
class Search extends React.Component{
    state={
        total_pages:0,
        page:0,
        results:[],
    }
    shouldComponentUpdate(nextprops,nextState){
        return true;
    }
    componentDidMount(){
        const{location}=this.props;
        const query=new URLSearchParams(location.search);
        this.getSearchResults(query.get('p'),query.get('language'));
    }
    getSearchResults=async(key,lan)=>{
        const search=await services.getSearch(key,lan);
        this.setState({
            total_pages:search.data.total_pages,
            page:search.data.page,
            results:search.data.results
        })
        //console.log(this.state.results);
        console.log(search);
    }
    render(){
        const{location}=this.props;
        const{results,page}=this.state;
        const query=new URLSearchParams(location.search);
        const lan=query.get('language');
        console.log("location: "+query);
        const result_list=results.map((movie)=>{
            return <Movie id={movie.id} key={movie.id} title={movie.title} release_date={movie.release_date} 
                    poster={movie.poster_path} overview={movie.overview} view={"poster"} 
                    lan={"/"+lan} avg_rate={movie.vote_average}></Movie>

        })
        return(
            <div>
                <Header lan={lan==="ko-KR"?"ko-KR":"en-US"}></Header>
                <SearchBar lan={lan==="ko-KR"?"ko-KR":"en-US"}></SearchBar>
                <div className="search_results_container" style={{padding:"10px"}}> 
                    <h2>
                        Search > Results
                    </h2>
                    {result_list}
                    <div className="btns">
                    <Button variant="contained" color="primary" onClick={this.handlePrev}>{lan!=="ko-KR"?'Previous':'이전'}</Button>
                    <span><b>{page}</b></span>
                    <Button variant="contained" color="primary" onClick={this.handleNext}>{lan!=="ko-KR"?'Previous':'다음'}</Button>
            </div>
                </div>
            </div>
        )
    }
}
export default Search;