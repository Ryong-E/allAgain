export interface CreateItem{
  id ?: number;
  userId ?: number;
  title ?: String;
  content ?: String;
  thumbnail ?: File[];
  startDate ?: Date;
  endDate ?: Date;
  innerUsers ?: number;
  status ?: String;
  
}

export interface GetList{

}

export interface GetItem{

}

export interface UpdateItem{

}

export interface DeleteItem{

}
