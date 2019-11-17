import React from 'react';
import Header from '../components/Header';
//import Loading from '../components/Loading';
import default_movie from '../img/default_movie.png';
import '../style/People.css';
import user from '../img/user.svg'
import * as services from '../services/posts';
class People extends React.Component{
    constructor(props){
        super(props);
        this.state={
            m_credits:[],
            actor_img:user
        };
    }
    componentDidMount(){
        const{match}=this.props;
        this.getMovieCredit(match.params.name);
        this.getImg(match.params.name);
    }
    getMovieCredit=async(id,lan)=>{
        const info=await services.movie_credit(id,lan);
        this.setState({
            m_credits:info.data.cast,
        });
    }
    getImg=async(id)=>{
        const imgs=await services.get_actor_img(id);
        this.setState({
            actor_img:"https://image.tmdb.org/t/p/w500"+imgs.data.profiles[0].file_path
        })
    }
    render(){
        const{m_credits,actor_img}=this.state;
        console.log(m_credits);
        const item_list=m_credits.map((item)=>(
            <div className="m_item" key={item.id} id={item.id}>
                <img src={item.poster_path!==null?"https://image.tmdb.org/t/p/w500"+item.poster_path:default_movie} alt={item.title}/>
                <div>
                    <p>{item.title}</p>
                    <p>{item.character!==""?item.character:"None"}</p>
                </div>
            </div>
        ))
        console.log(actor_img);
        return(
            <div>
                <Header></Header>
                <div className="m_container">
                    <aside className="m_aside">
                        <div>
                            <img src={actor_img} alt="actor"></img>
                        </div>
                    </aside>
                    <section className="m_div">
                        <div>
                            <h1>Name</h1>
                            <div className="actor_info">
                                <p>
                                    An American and Canadian actor, producer and semi-retired professional wrestler, signed with WWE. Johnson is half-Black and half-Samoan. His father, Rocky Johnson, is a Black Canadian, from Nova Scotia, and part of the first Black tag team champions in WWE history back when it was known as the WWF along with Tony Atlas. His mother is Samoan and the daughter of Peter Maivia, who was also a pro wrestler. Maivia's wife, Lia Maivia, was one of wrestling's few female promoters, taking over Polynesian Pacific Pro Wrestling after her husband's death in 1982, until 1988. Through his mother, he is considered a non-blood relative of the Anoa'i wrestling family. On March 29, 2008, The Rock inducted his father and his grandfather into the WWE Hall of Fame. As of 2014, Johnson has a home in Southwest Ranches, Florida as well as Los Angeles, California. He also owns a farm in Virginia. In 2009, Johnson gained citizenship in Canada in honor of his father's background. Though Johnson was previously registered as a Republican, he voted for Barack Obama in the 2008 and 2012 United States presidential elections and is now an independent voter. He stated he did not vote in the 2016 U.S. election. In recognition of his service to the Samoan people, and because he is a descendant of Samoan chiefs, Johnson had the noble title of Seiuli bestowed upon him by Malietoa Tanumafili II during his visit there in July 2004. He received a partial Samoan pe'a tattoo on his left side in 2003,and, in 2017, had the small "Brahma bull" tattoo on his right arm covered with a larger half-sleeve tattoo of a bull's skull. Johnson married Dany Garcia on May 3, 1997. Their only child together, a daughter named Simone, was born in August 2001. On June 1, 2007, they announced they were splitting up amicably. Johnson then began dating Lauren Hashian, daughter of Boston drummer Sib Hashian. They first met in 2006 while Johnson was filming The Game Plan. Their first child together, a daughter, was born in December 2015. Their second child, another daughter, was born in April 2018. Johnson attended the 2000 Democratic National Convention as part of WWE's non-partisan "Smackdown Your Vote" campaign, which aimed to influence young people to vote. He also had a speaking role at the 2000 Republican National Convention that same year. In 2006, Johnson founded the Dwayne Johnson Rock Foundation, a charity working with at-risk and terminally ill children. On October 2, 2007, he and his ex-wife donated $1 million to the University of Miami to support the renovation of its football facilities; it was noted as the largest donation ever given to the university's athletics department by former students. The University of Miami renamed the Hurricanes' locker room in Johnson's honor. In 2015, Johnson donated $1,500 to a GoFundMe to pay for an abandoned dog's surgery. In 2017, he donated $25,000 to Hurricane Harvey relief efforts. In 2018, Johnson donated a gym to a military base in Oahu, Hawaii. After the 2018 Hawaii floods, he worked with Malama Kauai, a nonprofit organization, to help repair damages caused by the floods.
                                </p>
                            </div>
                        </div>
                        <h2>Credits</h2>
                        <div className="m_wrapper"> 
                            {item_list}
                        </div>
                    </section>
                </div>
            </div>
        )
    }
}
export default People; 