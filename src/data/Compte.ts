import { JsonObject, JsonProperty } from 'json2typescript';

@JsonObject('Compte')
export class Compte {
  @JsonProperty('nom', String)
  public nom: string = '';
  @JsonProperty('nom2', String)
  public nom2: string = '';
  @JsonProperty('nom3', String)
  public nom3: string = '';
  @JsonProperty('numero', Number)
  public numero: number = 0;
}