

export const fixDate = ( realDate: string )=>{
  const fixedDate = new Date(realDate);
  fixedDate.setHours(fixedDate.getHours() + 9);
  const date_format = fixedDate.toISOString().slice(0,10);
  return  date_format
}