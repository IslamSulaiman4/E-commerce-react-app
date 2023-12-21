import { FaRegStar, FaStar } from 'react-icons/fa';

export const avgRating=(avgRating)=>{ 
     const ratings = [];
        avgRating=Math.round(avgRating);
        for(let i=1;i<=avgRating;i++){
          ratings.push( <p><FaStar /></p>);
        }
        for(let i=1;i<=5-avgRating;i++){
          ratings.push(<p><FaRegStar /></p>)
      }

    return(
         <div className='d-flex justify-content-center'>{ratings}</div> )
    }

   export const ratings=(rating)=>{
      const ratings = [];
      rating=Math.round(rating);
      for(let i=1;i<=rating ;i++){
        ratings.push( <FaStar />);
      }
      for(let i=1;i<=5-rating;i++){
        ratings.push(<FaRegStar />)
    }
  return <div className='pb-2 d-flex justify-content-first'>{ratings}</div> ;
  }
