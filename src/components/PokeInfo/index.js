import './index.css'

const PokeInfo = props => {
  const {each} = props
  const {id, name, weight, pokeAbility, pokeStats} = each

  return (
    <>
      {!each ? (
        ''
      ) : (
        <div className="bg-of-pokeinfo">
          <>
            <h1 className="poke-heading">{name.toUpperCase()}</h1>
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`}
              alt={name}
              className="img"
            />
            <div className="abilities">
              {pokeAbility.map(poke => (
                <>
                  <div className="group">
                    <h2>{poke.ability.name}</h2>
                  </div>
                </>
              ))}
            </div>
            <div className="base-stat">
              {pokeStats.map(poke => (
                <>
                  <h3>
                    {poke.stat.name}:{poke.base_stat}
                  </h3>
                </>
              ))}
            </div>
            <p className="weight">{`Weight: ${weight}`}</p>
          </>
        </div>
      )}
    </>
  )
}
export default PokeInfo
