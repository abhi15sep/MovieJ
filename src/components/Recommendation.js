import React from 'react';
import * as services from '../services/posts'; 
import '../style/Recommendation.css';
class Recommendation extends React.Component{
    constructor(props){
        super(props);
        this.state={
            recommendations:[]
        }
    }
    componentDidMount(){
        this.getRecommendations();
    }
    getRecommendations=async()=>{
        const{id}=this.props;
        console.log("id: "+id);
        const list=await services.getRecommendations(id);
        this.setState({
            recommendations:list.data.results
        });
        console.log(this.state.recommendations);
    }
    render(){
        const{recommendations}=this.state;
        //const{history}=this.props;
        let rr=recommendations.slice(0,10);
        const data_list=rr.map((item)=>{
            return <div className="recommendation_wrapper" key={item.id} onClick={()=>{}}>
                        <a href={`/movie_detail/`+item.id}>
                            <img alt={item.title} src={"https://image.tmdb.org/t/p/w500"+item.poster_path}></img>
                            <p>{item.title}</p>
                        </a>
                   </div>
        })
        return(
            <div className="recommendation">
                <div className="menu">
                    <h3>Recommendations</h3>
                </div>
                <div className="recommendation_container">
                    {data_list}
                </div>
            </div>
        )
    }
}
export default Recommendation;