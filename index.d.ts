declare module "json-2-csv-ts" {

    interface OPTION {
        expandArray:Boolean,
        download:Boolean,
        fileName?:string
    }

    export function json2csv(JSONData:any,options?:OPTION)

    export function DownloadFile(content:string):(fileName:string) => {}

}