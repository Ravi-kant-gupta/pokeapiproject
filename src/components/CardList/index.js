import './index.css'

const CardList = props => {
  const {eachItem, selectCardBtn, isLoading} = props
  const {id, name, cardImage} = eachItem
  const selectCard = () => selectCardBtn(name)
  return (
    <>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <button type="button" className="btn-card" onClick={selectCard}>
          <li className="pokemon-card">
            <p className="numbering">{id}</p>
            <img src={cardImage} alt={name} className="card-image" />
            <p>{name}</p>
          </li>
        </button>
      )}
    </>
  )
}
export default CardList
