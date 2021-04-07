import { JsonObject, JsonProperty } from "json2typescript";

@JsonObject("UserApollo")
export class UserApollo {
  @JsonProperty("userName", String)
  public UserName: string = '';
  @JsonProperty("numeroSession", Number)
  public NumeroSession: number = 0;
}
