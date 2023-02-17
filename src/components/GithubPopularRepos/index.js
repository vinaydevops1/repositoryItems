import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'
import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const apiStatusResponse = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

// Write your code here
class GithubPopularRepos extends Component {
  state = {
    languagesList: [],
    id: languageFiltersData[0].id,
    apiStatus: apiStatusResponse.initial,
  }

  componentDidMount() {
    this.getPopularLanguages()
  }

  getPopularLanguages = async () => {
    this.setState({
      apiStatus: apiStatusResponse.loading,
    })
    const {id} = this.state
    const response = await fetch(
      `https://apis.ccbp.in/popular-repos?language=${id}`,
    )
    if (response.ok) {
      const data = await response.json()
      const convertedData = data.popular_repos.map(eachItem => ({
        avatarUrl: eachItem.avatar_url,
        forksCount: eachItem.forks_count,
        issuesCount: eachItem.issues_count,
        name: eachItem.name,
        id: eachItem.id,
        starsCount: eachItem.stars_count,
      }))
      this.setState({
        languagesList: convertedData,
        apiStatus: apiStatusResponse.success,
      })
    } else if (response.status === 400) {
      return this.setState({
        apiStatus: apiStatusResponse.failure,
      })
    }
    return 1
  }

  renderResponseFailure = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="fai;ure view"
        className="failure-img"
      />
      <h1 className="failure-text">Something Went Wrong</h1>
    </div>
  )

  renderLoading = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} widht={80} />
    </div>
  )

  onClickLanguage = id => {
    this.setState(
      {
        id,
      },
      this.getPopularLanguages,
    )
  }

  render() {
    const {apiStatus, id, languagesList} = this.state
    console.log(apiStatus)
    return (
      <div className="main-container">
        <h1 className="heading">Popular</h1>
        <ul className="languages-list">
          {languageFiltersData.map(eachLanguage => (
            <LanguageFilterItem
              key={eachLanguage.id}
              eachLanguage={eachLanguage}
              onClickLanguage={this.onClickLanguage}
              isActive={eachLanguage.id === id}
            />
          ))}
        </ul>
        {apiStatus === apiStatusResponse.success && (
          <ul className="repository-item-container">
            {languagesList.map(eachItem => (
              <RepositoryItem eachItem={eachItem} key={eachItem.id} />
            ))}
          </ul>
        )}
        {apiStatus === apiStatusResponse.failure &&
          this.renderResponseFailure()}
        {apiStatus === apiStatusResponse.loading && this.renderLoading()}
      </div>
    )
  }
}

export default GithubPopularRepos
