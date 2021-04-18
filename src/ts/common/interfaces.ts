// Interfaces used throughout model and view



export interface Scale
{
  variable? : string
  type? : string
  min : string
  max : string
  title : string
}


export interface Statistics
{
  count : number
  min : [string, number]
  max : [string, number]
  range : number
  sum : number
  mean : number
  median : number
}


export interface Comparison
{
  label? : string
  difference : number
  percentage : number
}


export interface StatisticsComparisons
{
  index : [number, number],
  value : number,
  min : Comparison
  max : Comparison
  sum : Comparison
  mean : Comparison
  median : Comparison
}


export enum Sorting
{
  DOWNWARDS = -1,
  NONE = 0,
  UPWARDS = 1
}