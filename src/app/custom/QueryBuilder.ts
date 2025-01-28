// /* eslint-disable @typescript-eslint/no-empty-object-type */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { FilterQuery, Query } from "mongoose";


// class QueryBuilder<T> {
//     public modelQuery: Query<T[], any>  //come for mongoose
//     public query: Record<string, unknown> //come for express 

//     constructor(modelQuery: Query<T[], {}>, query: Record<string, unknown>) {
//         this.modelQuery = modelQuery;
//         this.query = query;
//     }


//     // search impliment 
//     search(searchableFields: string[]) {
//         const search = this?.query?.search;
//         if (search) {
//           const searchCondition = {
//             $or: searchableFields.map(
//               (field) =>
//                 ({
//                   [field]: { $regex: search, $options: 'i' },
//                 }) as FilterQuery<T>,
//             ),
//           };
    
//           this.modelQuery = this.modelQuery.find(searchCondition);
//         }
    
//         return this;
//       }

//     // filter 
//     filter() {
//         const cloneQueryObject = { ...this.query }
//         // remove from query 
//         const removeQueryFields = ['searchTerm', 'sort', 'limit', 'page', 'fields']
//         removeQueryFields.forEach(el => delete cloneQueryObject[el])
//         this.modelQuery = this.modelQuery.find(cloneQueryObject as FilterQuery<T>)

//         return this

//     }

//     // sort 
//     sort() {
//         const sort = this?.query?.sort || '-createdAt'
//         this.modelQuery = this.modelQuery.sort(sort as string)
//         return this
//     }

//     //paginateQuery 
//     pagination() {
//         const limit = Number(this.query.limit) || 10
//         // eslint-disable-next-line prefer-const
//         let page = Number(this.query.page) || 1
//         const skip = (page - 1) * limit
//         this.modelQuery = this.modelQuery.skip(skip).limit(limit)

//         return this
//     }

//     // fields 
//     fields (){
//         const fields =  (this?.query?.fields as string)?.split(',')?.join(' ') || '-__v'
//         this.modelQuery = this.modelQuery.select(fields)
//         return this 
//     }




// }


// export default QueryBuilder
import { FilterQuery, Query } from 'mongoose';

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;
  public page: number;
  public limit: number;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
    this.page = Number(query.page) || 1;
    this.limit = Number(query.limit) || 10;
  }

  search(searchableFields: string[]) {
    const search = this?.query?.search;
    if (search) {
      const searchCondition = {
        $or: searchableFields.map(
          (field) =>
            ({
              [field]: { $regex: search, $options: 'i' },
            }) as FilterQuery<T>,
        ),
      };

      this.modelQuery = this.modelQuery.find(searchCondition);
    }

    return this;
  }

  filter() {
    const queryObj = { ...this.query };

    const excludeFields = ['search', 'sort', 'limit', 'page', 'fields'];

    excludeFields.forEach((el) => delete queryObj[el]);

    this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>);

    return this;
  }

  sort() {
    const sort =
      (this?.query?.sort as string)?.split(',')?.join(' ') || '-createdAt';
    this.modelQuery = this.modelQuery.sort(sort as string);

    return this;
  }

  paginate() {
    const skip = (this.page - 1) * this.limit;

    this.modelQuery = this.modelQuery.skip(skip).limit(this.limit);

    return this;
  }

  fields() {
    const fields =
      (this?.query?.fields as string)?.split(',')?.join(' ') || '-__v';

    this.modelQuery = this.modelQuery.select(fields);
    return this;
  }

  getCountQuery() {
    const baseQuery = this.modelQuery.getQuery();
    return this.modelQuery.model.countDocuments(baseQuery);
  }

  getPaginationInfo() {
    return {
      page: this.page,
      limit: this.limit,
    };
  }
}

export default QueryBuilder;