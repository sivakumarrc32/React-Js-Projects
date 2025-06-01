import React from 'react'
import PropTypes from "prop-types"
const userData =[
  {
    name :"Chifuyu Matsuno",
    place : "China", 
    description :"Full Stack Developer",
     skills :["UI/UX","Front-End Development","React JS","Bootstrap 5","Node JS"], online : false, 
     profile :"image/User-1.jpg"
  },
  {
    name :"Rakcha",
    place : "India", 
    description :"Web Developer",
     skills :["UI/UX","Front-End Development","React JS","Bootstrap 5","Tailwind CSS","HTML"], 
     online : false, 
     profile :"image/User-2.jpg"
  },
  {
    name :"Sivakumar",
    place : "USA", 
    description :"React JS Developer",
     skills :["Front-End Development","React JS","Bootstrap 5","Tailwind CSS","JavaScript"], 
     online : true, 
     profile :"image/User-3.jpg"
  }
]

function User(props){

    return(
        <>
            <div className="container-card">
              <span className={props.online ? "status online" : "status offline"}>{props.online ? "ONLINE" : "OFFLINE"}</span>
              <img src={props.profile} alt="" className='photo img'/>
              <h3 className="name">{props.name}</h3>
              <h3 className="place">{props.place}</h3>
              <p className="role">{props.description}  </p>
              <div className="contact">
                <button className='button msg'>Message</button>

                <button className='button follow'>Following</button>
              </div>
              <div className="skillss">
                <h5 className="skills">Skills</h5>
                <ul className="skill-set">
                  {props.skills.map((skill,index) => (
                    <li key={index}>{skill}</li>
                  ))}
                </ul>
              </div>
            </div>
        </>
    )
}


function UserCard() {
  return (
    <>
        {/* <User name="Chifuyu Matsuno" place="China" description="Full Stack Developer" skills={["UI/UX","Front-End Development","React JS","Bootstrap 5","Node JS"]} online={false} profile="image/User-1.jpg" /> */}
        {
          userData.map((data,index) => (
            <User key={index} 
            name ={data.name}
            place={data.place}
            description={data.description}
            online ={data.online}
            profile={data.profile}
            skills={data.skills}
            />
          ))
        }
    </>
  )
}

User.propTypes ={
  name : PropTypes.string.isRequired,
  place: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  skills: PropTypes.arrayOf(PropTypes.string).isRequired,
  online : PropTypes.bool.isRequired,
  profile: PropTypes.string.isRequired,
  

}

export default UserCard
