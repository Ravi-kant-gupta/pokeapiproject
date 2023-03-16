import {Component} from 'react'
import CardList from '../CardList'
import PokeInfo from '../PokeInfo'
import './index.css'

class Main extends Component {
  state = {
    pokeList: [],
    Next: '',
    Previous: '',
    showCard: [],
    url: 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20',
    isLoading: true,
  }

  componentDidMount() {
    this.getPokemApi()
  }

  getPokemApi = async () => {
    const {url} = this.state
    const response = await fetch(url)
    const data = await response.json()
    const {next, previous, results} = data
    await this.setState({Next: next, Previous: previous, isLoading: false})
    results.map(async each => {
      const res = await fetch(each.url)
      const item = await res.json()
      const {id, name, weight} = item
      const pokeItem = {
        name,
        id,
        weight,
        cardImage: item.sprites.front_default,
        pokeInfoImage: item.sprites.other.dream_world.front_default,
        pokeAbility: item.abilities,
        pokeStats: item.stats,
      }
      await this.setState(prev => ({pokeList: [...prev.pokeList, pokeItem]}))
    })
  }

  onNext = async () => {
    const {Next} = this.state
    this.setState({url: Next, pokeList: [], isLoading: true})
    this.getPokemApi()
  }

  onPrevious = () => {
    const {Previous} = this.state
    this.setState({url: Previous, pokeList: [], isLoading: true})
    this.getPokemApi()
  }

  onSelectCard = name => {
    const {pokeList} = this.state
    const filterCard = pokeList.filter(each => each.name === name)
    this.setState({showCard: filterCard})
  }

  render() {
    const {pokeList, showCard, Previous, Next, isLoading} = this.state
    pokeList.sort((a, b) => (a.id > b.id ? 1 : -1))
    console.log(isLoading)

    return (
      <>
        <div className="bg-container">
          <div>
            <div className="cards-container">
              <ul className="card-list">
                {pokeList.map(eachItem => (
                  <CardList
                    eachItem={eachItem}
                    selectCardBtn={this.onSelectCard}
                    isLoading={isLoading}
                  />
                ))}
              </ul>
            </div>
            <div className="btn-group">
              {Previous === null ? (
                ''
              ) : (
                <button type="button" onClick={this.onPrevious}>
                  {' '}
                  previous
                </button>
              )}
              {Next === null ? (
                ''
              ) : (
                <button type="button" onClick={this.onNext}>
                  {' '}
                  next
                </button>
              )}
            </div>
          </div>
          <div className="right-content">
            {showCard.map(each => (
              <PokeInfo each={each} />
            ))}
          </div>
        </div>
      </>
    )
  }
}
export default Main
