import { JsonObject, JsonProperty } from "json2typescript";

@JsonObject("Permission")
export class Permission {
    @JsonProperty("id", String)
    public Id: string = '';
    @JsonProperty("nom", String)
    public Nom: string = '';
    @JsonProperty("description", String)
    public Description: string = '';
    @JsonProperty("applicationId", String)
    public ApplicationId: string = '';
}
