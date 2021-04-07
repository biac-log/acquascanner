import { JsonObject, JsonProperty } from 'json2typescript';

@JsonObject('PrintArticle')
export class PrintArticle {
  @JsonProperty('codeEAN', String)
  public CodeEAN: string = '';
  @JsonProperty('quantite', Number)
  public Quantite: number = 0;
  @JsonProperty('printerName', String)
  public PrinterName: string = '';
}
