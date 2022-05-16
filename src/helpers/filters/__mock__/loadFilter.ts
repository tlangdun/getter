import { EmptyFilters } from "../../../store/models/filterModels";
import { GetterUser } from "../../../store/models/userModel";

let filter = {...EmptyFilters}
export async function loadFilters(user:GetterUser) { 
    filter.skills = [{value:"git", label:"Git", checked:false}]
    filter.programmingLanguages =  [{value:"java", label:"Java", checked:false}]
    filter.jobRoles = [{value:"student", label:"Student", checked:false}]
    filter.countries = [{value:"switzerland", label:"Switzerland", checked:false}]
    filter.spokenLanguages = [{value:"german", label:"German", checked:false}]
    return filter
}