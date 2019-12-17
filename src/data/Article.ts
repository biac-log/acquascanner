import { JsonObject, JsonProperty } from 'json2typescript';

@JsonObject('Article')
export class Article {
  @JsonProperty('Code', String)
  public Code: string = '';
  @JsonProperty('CodeEAN', String)
  public CodeEAN: string = '';
  @JsonProperty('Libelle', String)
  public Libelle: string = '';
  public Quantite: number = 0;
  @JsonProperty('ReferenceFournisseur', String)
  public ReferenceFournisseur : string = '';
}
