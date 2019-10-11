import { JsonObject, JsonProperty } from "json2typescript";

@JsonObject("Document")
export class Article {
    @JsonProperty("Code", String)
    public Code: string = '';
    @JsonProperty("CodeEAN", String)
    public CodeEAN: string = '';
    @JsonProperty("Libelle", String)
    public Libelle: string = '';
    public Quantite: number = 0;
  }
