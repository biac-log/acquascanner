import { JsonObject, JsonProperty } from 'json2typescript';

@JsonObject('PrintArticle')
export class PrintArticle {
  @JsonProperty('CodeEAN', String)
  public CodeEAN: string = '';
  @JsonProperty('Quantite', Number)
  public Quantite: number = 0;
  @JsonProperty('PrinterName', String)
  public PrinterName: string = '';
}
