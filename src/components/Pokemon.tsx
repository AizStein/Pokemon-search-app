import React from "react";

export interface PokemonProps {
  name: string;
  sprites: {
    front_default: string;
  };
  height: number;
  weight: number;
  types: Array<{ type: { name: string } }>;
  abilities: Array<{ ability: { name: string } }>;
}

const Pokemon: React.FC<PokemonProps> = ({
  name,
  sprites,
  height,
  weight,
  types,
  abilities,
}) => {
  return (
    <div className="container">
      <div className="result">
        {sprites && <img src={sprites.front_default} alt={name} />}
        <div className="details">
          <h2>{name[0].toUpperCase() + name.slice(1).toLowerCase()}</h2>
          <table>
            <tr>
              <th>Height</th>
              <td>{height / 10}m</td>
            </tr>
            <tr>
              <th>Weight</th>
              <td> {weight / 10}kg</td>
            </tr>
            <tr>
              <th>Types</th>
              <td>
                {types
                  .map(
                    (t) => t.type.name[0].toUpperCase() + t.type.name.slice(1)
                  )
                  .join(", ")}
              </td>
            </tr>
            <tr>
              <th>Abilities</th>
              <td>
                {abilities
                  .map(
                    (a) =>
                      a.ability.name[0].toUpperCase() + a.ability.name.slice(1)
                  )
                  .join(", ")}
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Pokemon;

// or
/* const Pokemon = (props: PokemonProps) => {
  const { name, sprites, height, weight } = props;
}
  */
