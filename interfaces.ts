import { ParsedUrlQuery } from "querystring";

export interface Person {
  _id: string,
  name: string,
  slug: Slug,
  allergy: Allergy[],
  diet: Diet, 
  comment: string
}

export interface Slug {
  current: string
}

export interface Allergy {
  _id: string,
  name: string,
  _key: string
}

export interface Diet {
  _id: string,
  name: string
}

export interface Params extends ParsedUrlQuery {
  slug: string,
}