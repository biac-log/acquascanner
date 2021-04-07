import { JsonObject, JsonProperty } from 'json2typescript';

@JsonObject('Article')
export class Article {
  @JsonProperty('code', String)
  public Code: string = '';
  @JsonProperty('codeEAN', String)
  public CodeEAN: string = '';
  @JsonProperty('libelle', String)
  public Libelle: string = '';
  public Quantite: number = 0;
  @JsonProperty('referenceFournisseur', String)
  public ReferenceFournisseur: string = '';
  @JsonProperty('numeroFournisseur', Number)
  public NumeroFournisseur: number = 0;
  @JsonProperty('blocageVentes', Number)
  public BlocageVentes: number = 0;
}
