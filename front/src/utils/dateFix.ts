

export const fixDate = ( date: string )=>{
  return new Date(new Date(date).toString().split('GMT')[0]+' UTC').toISOString().slice(0,10)
}