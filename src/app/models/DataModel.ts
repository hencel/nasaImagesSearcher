export interface DataModel {
    collection: {
        items: [],
        links: []
    }
}

export interface ImageItem {
    preview?: string, 
    fullImage?: string, 
    title?: string
}

export interface ButtonsArray {
    href?: string, 
    prompt?: string, 
    rel?: string
}