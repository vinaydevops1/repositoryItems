// Write your code here
import './index.css'

const LanguageFilterItem = props => {
  const {eachLanguage, isActive, onClickLanguage} = props
  const {id, language} = eachLanguage
  const addColor = isActive ? 'add-color' : null
  const onClickLanguageButton = () => {
    onClickLanguage(id)
  }
  return (
    <li className="list-content">
      <button
        type="button"
        onClick={onClickLanguageButton}
        className={`language-button ${addColor}`}
      >
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
