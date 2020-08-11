import { JsonObject, JsonProperty } from 'json2typescript';

@JsonObject('Compte')
export class Compte {
  @JsonProperty('Nom', String)
  public nom: string = '';
  @JsonProperty('Nom2', String)
  public nom2: string = '';
  @JsonProperty('Nom3', String)
  public nom3: string = '';
  @JsonProperty('Numero', Number)
  public numero: number = 0;
}