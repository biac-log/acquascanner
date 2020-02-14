import { JsonObject, JsonProperty } from "json2typescript";

@JsonObject("Permission")
export class Permission {
    @JsonProperty("Id", String)
    public Id: string = '';
    @JsonProperty("Nom", String)
    public Nom: string = '';
    @JsonProperty("Description", String)
    public Description: string = '';
    @JsonProperty("ApplicationId", String)
    public ApplicationId: string = '';
}
