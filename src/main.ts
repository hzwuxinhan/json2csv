interface OPTION {
    expandArray:Boolean,
    download:Boolean,
    fileName?:string
}

const JSONToCSVConvertor = (JSONData) => (expandArray:Boolean):string => {

    const checkType = DATA => {
        let type: string = 'other'
        if (typeof DATA == "object") type = 'object'
        if (Array.isArray(DATA)) type = 'array'
        return type
    }

    const firstRow = type => DATA => Father => {
        if (type !== 'object') return
        for (let one in DATA) {
            if (Father) {
                Headers.push(`${Father}.${one}`)
            }else {
                Headers.push(one)
            }
            let newType = checkType(DATA[one])
            firstRow(newType)(DATA[one])(Father?`${Father}.${one}`:one)
        }
    }

    const revert = type => DATA => Father => Tep => {
        if (type == 'object') {
            for( let one in DATA) {
                let newType = checkType(DATA[one])
                revert(newType)(DATA[one])(Father?`${Father}.${one}`:one)(Tep)
            }
        }
        if(type == 'other') {
            const repData = typeof DATA == 'string'?DATA.replace(/,/g,"，"):DATA
            const titleTmp = Headers.indexOf(Father)
            
            if(res[Tep]) {
                const currentTmp = res[Tep].split(",").length
                for (let i =0 ;i < (titleTmp - currentTmp);i++) {
                    res[Tep] = `${res[Tep]},`
                }
                res[Tep] = `${res[Tep]},${repData}`
            }else {
                let tmp = ""
                for (let i =0 ;i < titleTmp;i++) {
                    tmp = `${tmp},`
                }
                res[Tep] = `${tmp}${repData}`
            }
        }
        if(type == 'array') {
            if(!expandArray) {
                revert('other')(DATA.toString())(Father)(Tep)
                return
            }
            let newTep = 0
            DATA.forEach(element => {
                newTep++
                let newType = checkType(element)
                revert(newType)(element)(Father)(newTep)
            })
        }
    }

    let Headers = []
    let res = []

    const thisType = checkType(JSONData)
    if (thisType == 'other') {
        throw Error("该数据类型不支持导出csv")
    }

    firstRow(thisType)(JSONData)(null)
    res.push(Headers.toString())
    revert(thisType)(JSONData)(null)(1)

    let CSV = ``
    res.forEach(ele => {
        CSV += `${ele}\r\n`
    })
    return CSV
}

const DownloadFile = content => fileName => {
    var aTag = document.createElement('a')
    aTag.download = fileName
    aTag.href = `data:text/csv;charset=utf-8,\ufeff${content}`
    aTag.click()
    document.removeChild(aTag)
    return 'download success'
}

const main = (JSONData,options?:OPTION) => {
    const newOption = Object.assign({
        expandArray:true,
        download:false,
        fileName:'default.csv'
    },options)

    if(!newOption.download)
        return JSONToCSVConvertor(JSONData)(newOption.expandArray)
    DownloadFile(JSONToCSVConvertor(JSONData)(newOption.expandArray))(newOption.fileName)
}

export {
    main as json2csv,
    DownloadFile
}