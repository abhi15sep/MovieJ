import React from 'react';
import MovieList from '../components/MovieList';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
class Home extends React.Component{
    render(){
        const{match}=this.props;
        const lan_url=match.url;
        let movies="";
        console.log(lan_url);
        if(lan_url==="/" || lan_url==="/ko-KR"){
            movies=<MovieList lan="ko-KR"></MovieList>
        }else if(lan_url==="/en-US"){
            movies=<MovieList lan="en-US"></MovieList>
        }
        return (
            <div>
                <Header lan={lan_url==="/"||lan_url==="/ko-KR"?"ko-KR":"en-US"}></Header>
                <SearchBar lan={lan_url==="/"||lan_url==="/ko-KR"?"ko-KR":"en-US"}></SearchBar>
                {movies}
            </div>
        );
    }
};

export default Home;