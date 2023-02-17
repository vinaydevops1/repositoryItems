// Write your code here
import './index.css'

const RepositoryItem = props => {
  const {eachItem} = props
  const {avatarUrl, name, forksCount, issuesCount, starsCount} = eachItem
  return (
    <li className="list-of-content">
      <img src={avatarUrl} alt={name} className="avatar-size" />
      <h1 className="name">{name}</h1>
      <div className="count-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
          className="stars-img"
        />
        <p> {starsCount} stars</p>
      </div>
      <div className="count-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
          className="stars-img"
        />
        <p> {forksCount} forks</p>
      </div>
      <div className="count-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
          className="stars-img"
        />
        <p> {issuesCount} issues</p>
      </div>
    </li>
  )
}

export default RepositoryItem
