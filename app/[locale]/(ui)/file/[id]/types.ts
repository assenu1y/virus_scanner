type AnalyzeResult = {
    data: Data,
    meta: Meta,
}

type Data = {
    id: string,
    type: string,
    links: Links,
    attributes: Attributes
}

type Links = {
    self: string,
    item: string
}

type Attributes = {
    status: string,
    stats: Stats,
    results: AntivirusVendors,
    date: string,
}

type Stats = {
    malicious: number,
    suspicious: number,
    undetected: number,
    harmless: number,
    timeout: number,
    'confirmed-timeout': number,
    failure: number,
    'type-unsupported': number,
}

type AntivirusVendors = {
    [key: string]: AntivirusVendor
}

type AntivirusVendor = {
    method: string,
    engine_name: string,
    engine_version: string,
    engine_update: string,
    category: string,
    result: null
}

type Meta = {
    file_info: FileInfo
}

type FileInfo = {
    sha256: string,
    sha1: string,
    md5: string,
    size: number,
}
